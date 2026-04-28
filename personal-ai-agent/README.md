# Personal AI Agent

A personal AI agent powered by OpenAI with web search capability, served through a modern web UI.

## Features

- Chat with GPT-4o through a clean web interface
- Real-time streaming responses via WebSockets
- Web search — the agent automatically searches the web when it needs current information
- Markdown rendering with syntax-highlighted code blocks
- Conversation history maintained per session

## Setup

1. **Clone and install dependencies:**

```bash
cd personal-ai-agent
pip install -r requirements.txt
```

2. **Configure your OpenAI API key:**

```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

3. **Run the server:**

```bash
python main.py
```

4. **Open the UI:** Navigate to [http://localhost:8000](http://localhost:8000)

## Architecture

- **Backend:** FastAPI with WebSocket support for real-time streaming
- **AI:** OpenAI GPT-4o with function/tool calling
- **Web Search:** DuckDuckGo (free, no API key required)
- **Frontend:** Single-page HTML/CSS/JS chat interface
