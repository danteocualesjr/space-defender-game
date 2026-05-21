import json
import logging
import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from openai import AsyncOpenAI, DefaultAsyncHttpxClient
import httpx

from agent import run_agent

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Personal AI Agent")

client = AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    timeout=httpx.Timeout(60.0, connect=15.0),
)

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/")
async def index():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    conversation: list[dict] = []

    try:
        while True:
            data = await ws.receive_text()
            payload = json.loads(data)
            user_message = payload.get("message", "").strip()

            if not user_message:
                continue

            conversation.append({"role": "user", "content": user_message})

            async def send_text(chunk: str):
                await ws.send_text(json.dumps({"type": "text", "content": chunk}))

            async def send_event(event: dict):
                await ws.send_text(json.dumps({"type": "event", **event}))

            await send_event({"type": "response_start"})

            try:
                assistant_reply = await run_agent(client, conversation, send_text, send_event)
                conversation.append({"role": "assistant", "content": assistant_reply})
            except Exception as exc:
                logger.exception("Agent error")
                await send_text(f"\n\n**Error:** {exc}")

            await send_event({"type": "response_end"})

    except WebSocketDisconnect:
        pass


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
