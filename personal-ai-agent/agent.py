import json
from openai import AsyncOpenAI
from tools.web_search import TOOL_DEFINITION, web_search

SYSTEM_PROMPT = (
    "You are a helpful personal AI assistant. You can search the web for current "
    "information when needed. Be concise, accurate, and friendly. When you use web "
    "search results, synthesize the information naturally — don't just list raw results. "
    "Use markdown formatting for readability."
)

TOOLS = [TOOL_DEFINITION]

TOOL_HANDLERS = {
    "web_search": lambda args: web_search(args["query"]),
}


async def run_agent(client: AsyncOpenAI, messages: list, send_text, send_event):
    """
    Run the agent loop: call OpenAI, handle tool calls, and stream the final
    response back via the provided callback functions.

    send_text(str)  — called with each text chunk for streaming
    send_event(dict) — called with structured events (e.g. tool use notifications)
    """
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

    while True:
        stream = await client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=TOOLS,
            stream=True,
        )

        collected_text = ""
        tool_calls_by_index: dict[int, dict] = {}

        async for chunk in stream:
            delta = chunk.choices[0].delta if chunk.choices else None
            if delta is None:
                continue

            # Stream text content back immediately
            if delta.content:
                collected_text += delta.content
                await send_text(delta.content)

            # Accumulate tool call fragments
            if delta.tool_calls:
                for tc in delta.tool_calls:
                    idx = tc.index
                    if idx not in tool_calls_by_index:
                        tool_calls_by_index[idx] = {
                            "id": "",
                            "function": {"name": "", "arguments": ""},
                        }
                    entry = tool_calls_by_index[idx]
                    if tc.id:
                        entry["id"] = tc.id
                    if tc.function:
                        if tc.function.name:
                            entry["function"]["name"] += tc.function.name
                        if tc.function.arguments:
                            entry["function"]["arguments"] += tc.function.arguments

        finish_reason = chunk.choices[0].finish_reason if chunk.choices else None

        if finish_reason == "tool_calls" and tool_calls_by_index:
            # Append the assistant's message with tool calls
            assistant_msg = {"role": "assistant", "content": collected_text or None, "tool_calls": []}
            for idx in sorted(tool_calls_by_index):
                tc = tool_calls_by_index[idx]
                assistant_msg["tool_calls"].append({
                    "id": tc["id"],
                    "type": "function",
                    "function": {
                        "name": tc["function"]["name"],
                        "arguments": tc["function"]["arguments"],
                    },
                })
            messages.append(assistant_msg)

            # Execute each tool call
            for tc_msg in assistant_msg["tool_calls"]:
                fn_name = tc_msg["function"]["name"]
                fn_args = json.loads(tc_msg["function"]["arguments"])

                await send_event({
                    "type": "tool_start",
                    "tool": fn_name,
                    "args": fn_args,
                })

                handler = TOOL_HANDLERS.get(fn_name)
                if handler:
                    result = handler(fn_args)
                else:
                    result = f"Unknown tool: {fn_name}"

                await send_event({
                    "type": "tool_end",
                    "tool": fn_name,
                })

                messages.append({
                    "role": "tool",
                    "tool_call_id": tc_msg["id"],
                    "content": result,
                })

            # Loop back to get the model's response incorporating tool results
            continue

        # No more tool calls — we're done
        break

    return collected_text
