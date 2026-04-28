const messagesEl = document.getElementById("messages");
const welcomeEl = document.getElementById("welcome");
const form = document.getElementById("input-form");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");

let ws = null;
let currentAssistantEl = null;
let currentContentEl = null;
let rawAssistantText = "";
let isStreaming = false;

// ─── Markdown setup ───

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

// ─── WebSocket ───

function connect() {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  ws = new WebSocket(`${protocol}//${location.host}/ws`);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleMessage(data);
  };

  ws.onclose = () => {
    setTimeout(connect, 2000);
  };

  ws.onerror = () => {
    ws.close();
  };
}

function handleMessage(data) {
  switch (data.type) {
    case "event":
      handleEvent(data);
      break;
    case "text":
      appendAssistantText(data.content);
      break;
  }
}

function handleEvent(data) {
  if (data.type === "event") {
    switch (data.event || data.type) {
      case "response_start":
        startAssistantMessage();
        break;
      case "response_end":
        finishAssistantMessage();
        break;
      case "tool_start":
        showSearchIndicator(data.args?.query || data.tool);
        break;
      case "tool_end":
        markSearchDone();
        break;
    }
  }

  if (data.type === "response_start") {
    startAssistantMessage();
  } else if (data.type === "response_end") {
    finishAssistantMessage();
  } else if (data.type === "tool_start") {
    showSearchIndicator(data.args?.query || data.tool);
  } else if (data.type === "tool_end") {
    markSearchDone();
  }
}

// ─── Message rendering ───

function addUserMessage(text) {
  welcomeEl.classList.add("hidden");

  const msgEl = document.createElement("div");
  msgEl.className = "message message-user";
  msgEl.innerHTML = `
    <div class="message-label">You</div>
    <div class="message-content">${escapeHtml(text)}</div>
  `;
  messagesEl.appendChild(msgEl);
  scrollToBottom();
}

function startAssistantMessage() {
  isStreaming = true;
  rawAssistantText = "";

  const msgEl = document.createElement("div");
  msgEl.className = "message message-assistant";
  msgEl.innerHTML = `
    <div class="message-label">Agent</div>
    <div class="message-content">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>
  `;
  messagesEl.appendChild(msgEl);
  currentAssistantEl = msgEl;
  currentContentEl = msgEl.querySelector(".message-content");
  scrollToBottom();
}

function appendAssistantText(chunk) {
  if (!currentContentEl) return;

  rawAssistantText += chunk;

  const rendered = marked.parse(rawAssistantText);
  const searchIndicators = currentContentEl.querySelectorAll(".search-indicator");
  let indicatorsHtml = "";
  searchIndicators.forEach((el) => {
    indicatorsHtml += el.outerHTML;
  });

  currentContentEl.innerHTML = indicatorsHtml + rendered;

  currentContentEl.querySelectorAll("pre code").forEach((block) => {
    if (!block.dataset.highlighted) {
      hljs.highlightElement(block);
      block.dataset.highlighted = "true";
    }
  });

  scrollToBottom();
}

function finishAssistantMessage() {
  isStreaming = false;
  if (currentContentEl && rawAssistantText === "") {
    const typing = currentContentEl.querySelector(".typing-indicator");
    if (typing) typing.remove();
  }
  currentAssistantEl = null;
  currentContentEl = null;
  sendBtn.disabled = false;
  input.disabled = false;
  input.focus();
}

function showSearchIndicator(query) {
  if (!currentContentEl) return;

  const typing = currentContentEl.querySelector(".typing-indicator");
  if (typing) typing.remove();

  const indicator = document.createElement("div");
  indicator.className = "search-indicator";
  indicator.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <span>Searching: ${escapeHtml(query)}</span>
  `;
  currentContentEl.appendChild(indicator);
  scrollToBottom();
}

function markSearchDone() {
  if (!currentContentEl) return;
  const indicators = currentContentEl.querySelectorAll(
    ".search-indicator:not(.done)"
  );
  indicators.forEach((el) => {
    el.classList.add("done");
    const svg = el.querySelector("svg");
    if (svg) {
      svg.outerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    }
    const span = el.querySelector("span");
    if (span) span.textContent = span.textContent.replace("Searching:", "Searched:");
  });
}

// ─── Input handling ───

function sendMessage() {
  const text = input.value.trim();
  if (!text || !ws || ws.readyState !== WebSocket.OPEN) return;

  addUserMessage(text);
  ws.send(JSON.stringify({ message: text }));

  input.value = "";
  input.style.height = "auto";
  sendBtn.disabled = true;
  input.disabled = true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

input.addEventListener("input", () => {
  sendBtn.disabled = input.value.trim() === "" || isStreaming;
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 160) + "px";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) sendMessage();
  }
});

clearBtn.addEventListener("click", () => {
  messagesEl.innerHTML = "";
  welcomeEl.classList.remove("hidden");
  rawAssistantText = "";
  currentAssistantEl = null;
  currentContentEl = null;

  if (ws) ws.close();
  connect();
});

// ─── Helpers ───

function scrollToBottom() {
  const chat = document.getElementById("chat");
  chat.scrollTop = chat.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ─── Init ───

connect();
