from duckduckgo_search import DDGS

TOOL_DEFINITION = {
    "type": "function",
    "function": {
        "name": "web_search",
        "description": (
            "Search the web for current information. Use this when the user asks about "
            "recent events, real-time data, or anything you're unsure about or that may "
            "have changed after your training cutoff."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query to look up on the web.",
                }
            },
            "required": ["query"],
        },
    },
}


def web_search(query: str, max_results: int = 5) -> str:
    """Run a DuckDuckGo search and return formatted results."""
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=max_results))
    except Exception as exc:
        return f"Search failed: {exc}"

    if not results:
        return "No results found."

    formatted = []
    for r in results:
        title = r.get("title", "")
        body = r.get("body", "")
        href = r.get("href", "")
        formatted.append(f"**{title}**\n{body}\nSource: {href}")

    return "\n\n---\n\n".join(formatted)
