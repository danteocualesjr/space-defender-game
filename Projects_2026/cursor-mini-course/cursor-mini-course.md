# Cursor Mini-Course: From Zero to Productive

A practical guide for anyone who wants to understand what Cursor is, how it works, and how to use it effectively.

---

## Course Overview


| Module | Topic                                | Time Estimate |
| ------ | ------------------------------------ | ------------- |
| 1      | What Is Cursor?                      | 5 min         |
| 2      | The Two Desktop Windows              | 10 min        |
| 3      | The Four Agent Modes                 | 10 min        |
| 4      | AI Features That Work While You Type | 5 min         |
| 5      | Giving Cursor Context                | 10 min        |
| 6      | Cloud Agents and Parallel Work       | 10 min        |
| 7      | Cursor Beyond the Desktop            | 10 min        |
| 8      | Practical Workflows and Tips         | 10 min        |
|        | **Total**                            | **~70 min**   |


---

## Module 1: What Is Cursor?

### The One-Sentence Answer

Cursor is an AI code editor and coding agent built on top of VS Code.

### What That Actually Means

Cursor takes the editor you probably already know (VS Code) and deeply integrates AI into every part of the coding experience. It is not a plugin or an extension. It is a standalone application that happens to share VS Code's foundation — same keyboard shortcuts, same settings format, same extension ecosystem.

The AI in Cursor is not just autocomplete. It is a full **agent** that can:

- Read and understand your entire codebase
- Edit multiple files at once
- Run terminal commands
- Open a browser and interact with web pages
- Search the web for documentation
- Ask you clarifying questions mid-task
- Spawn sub-agents to explore code in parallel

### Installation

1. Go to [cursor.com/download](https://cursor.com/download)
2. Download the installer for your OS:
  - **macOS**: `.dmg` file (supports Apple Silicon and Intel, requires macOS 12+)
  - **Windows**: `.exe` installer (requires Windows 10+)
  - **Linux**: Available via `apt`, `dnf`, or as a portable AppImage
3. Create a free account at [cursor.com](https://cursor.com)

### Coming From VS Code?

You can import your extensions, themes, settings, and keybindings in one click:

1. Open Cursor Settings (`Cmd+Shift+J` on Mac, `Ctrl+Shift+J` on Windows/Linux)
2. Go to **General > Account**
3. Click **Import** under VS Code Import

Cursor uses the Open VSX extension registry. Most popular VS Code extensions are available. You can run both Cursor and VS Code side by side — they are separate applications.

### Key Takeaway

Cursor = VS Code + a deeply integrated AI agent that can read, write, run, and reason about your code.

---

## Module 2: The Two Desktop Windows

Cursor has two distinct desktop window types. Understanding the difference is important because they serve different purposes.

### Window 1: The Editor Window

This is the classic IDE experience. If you have used VS Code, this will look immediately familiar.

**Components:**


| Area                                  | What It Does                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------------- |
| **File Explorer** (left sidebar)      | Browse and navigate your project files                                       |
| **Code Editor** (center)              | Write and edit code with full syntax highlighting, multi-cursor, split panes |
| **Terminal** (bottom panel)           | Integrated terminal where you (and the agent) run commands                   |
| **Agent Panel** (right side, `Cmd+I`) | Chat with the AI agent — give instructions, review changes                   |
| **Extensions** (`Cmd+Shift+X`)        | Browse and install extensions from Open VSX                                  |
| **Command Palette** (`Cmd+Shift+P`)   | Run any command by name                                                      |


**When to use the Editor Window:**

- You are actively writing code and want to see your files
- You want flexible split panes to view multiple files at once
- You need the full VS Code extension ecosystem
- You are working on a single project and want deep focus

**How to open it:** This is the default when you open a project. You can also switch to it from anywhere via `Cmd+Shift+P` > "Open Editor Window".

### Window 2: The Agents Window

This is Cursor's agent-first interface, introduced with Cursor 3 (April 2, 2026). It looks and feels different from the Editor Window.

**Key features unique to the Agents Window:**


| Feature             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| **Multi-workspace** | Work with agents across all your projects from one place     |
| **Parallel agents** | Run many agents simultaneously (both local and cloud)        |
| **Diffs view**      | Review and commit changes, manage PRs without leaving Cursor |
| **Cloud handoff**   | Move agents between cloud and local seamlessly               |


The Agents Window still supports file search (`Cmd+P`) and full-text search (`Cmd+Shift+F`), but it does not have the full VS Code editor layout with split panes and extensions.

**When to use the Agents Window:**

- You want to run and manage many agents working in parallel
- You are using agents to write most of your code and want to operate at a higher level of abstraction
- You want to manage work across multiple repositories from one place
- You want to kick off cloud agents and monitor their progress

**How to open it:** `Cmd+Shift+P` > "Open Agents Window".

### Using Both Together

You can have both windows open at the same time. A common workflow:

1. Use the **Agents Window** to kick off multiple agents working on different tasks
2. Switch to the **Editor Window** when you want to manually review, tweak, or debug specific code
3. Move freely between them as your work style demands

### Key Takeaway

The **Editor Window** is for hands-on coding. The **Agents Window** is for managing AI agents at scale. Use whichever fits your current task, or use both.

---

## Module 3: The Four Agent Modes

The AI agent panel (`Cmd+I`) has four distinct modes. Each mode changes how the agent behaves. You switch between them with `Shift+Tab` or the mode picker dropdown.

### Mode 1: Agent Mode (Default)

**What it does:** The agent takes your instruction and executes it autonomously — reading files, editing code, running terminal commands, and iterating until the task is done.

**Example prompts:**

- "Add a dark mode toggle to the settings page"
- "Write unit tests for the auth module"
- "Refactor the database layer to use connection pooling"

**Tools the agent can use:**


| Tool               | What It Does                                                   |
| ------------------ | -------------------------------------------------------------- |
| Semantic Search    | Searches your codebase by meaning, not just keywords           |
| File Search        | Finds files by name, reads directories, greps for patterns     |
| Read Files         | Reads file content, including images for vision-capable models |
| Edit Files         | Creates, modifies, and deletes files                           |
| Run Shell Commands | Executes terminal commands                                     |
| Browser            | Navigates web pages, clicks, types, takes screenshots          |
| Web Search         | Searches the internet for documentation or solutions           |
| Image Generation   | Creates images from text descriptions                          |
| Ask Questions      | Asks you for clarification mid-task                            |
| Subagents          | Spawns specialized sub-agents for parallel exploration         |


There is no limit on the number of tool calls per task.

**Checkpoints:** The agent automatically creates snapshots of your codebase before significant changes. You can click any checkpoint in the chat timeline to preview or restore files to that state.

**Queued messages:** You can type follow-up messages while the agent is working. They queue up and execute in order when the agent finishes its current task.

### Mode 2: Ask Mode

**What it does:** A read-only mode. The agent answers questions and explores your code but cannot make any edits or run commands that change things.

**Example prompts:**

- "How does the authentication flow work in this codebase?"
- "What does the `processPayment` function do?"
- "Where are the API routes defined?"

**When to use it:** When you want to understand code without risking any changes. Great for onboarding onto a new codebase or exploring unfamiliar code.

### Mode 3: Plan Mode

**What it does:** The agent researches your codebase, may ask clarifying questions, and produces a detailed plan — but does not write any code until you approve it.

**The workflow:**

1. Switch to Plan mode
2. Describe what you want to build
3. The agent explores your code and generates a plan (opens as a virtual file you can read and edit)
4. Review the plan, make adjustments
5. Click **Build** to have the agent execute the plan

**When to use it:**

- Complex features with multiple valid approaches
- Tasks that touch many files or systems
- Architectural decisions where you want to think before coding
- Unclear requirements where you need to explore scope first

Plans can be saved to your workspace and shared with your team via git.

### Mode 4: Debug Mode

**What it does:** Instead of writing code immediately, the agent investigates bugs systematically — generating hypotheses, adding log statements, using runtime information to pinpoint the issue, and only then applying a targeted fix.

**Example prompts:**

- "The login page shows a blank screen after submitting the form"
- "This API endpoint returns 500 intermittently"
- Paste an error message or stack trace directly

**When to use it:** When something is broken and you do not know why. Use Agent mode when you already know what to build; use Debug mode when you need to find out what is wrong first.

### Quick Reference


| Mode      | Can Edit?            | Best For                                            |
| --------- | -------------------- | --------------------------------------------------- |
| **Agent** | Yes                  | Building features, refactoring, fixing known issues |
| **Ask**   | No                   | Understanding code, exploring architecture          |
| **Plan**  | Yes (after approval) | Complex tasks where you want to review the approach |
| **Debug** | Yes                  | Investigating bugs with runtime evidence            |


### Key Takeaway

Start with **Agent** for most tasks. Switch to **Plan** when the task is complex and you want to think first. Use **Ask** to explore without risk. Use **Debug** when something is broken and you need to diagnose it.

---

## Module 4: AI Features That Work While You Type

Beyond the agent panel, Cursor has AI woven into the editor itself. These features work passively as you code.

### Tab Completion

Cursor's autocomplete predicts what you are about to type and shows suggestions as grayed-out text ahead of your cursor.

**How to use it:**


| Action                    | Shortcut                                                 |
| ------------------------- | -------------------------------------------------------- |
| Accept full suggestion    | `Tab`                                                    |
| Accept one word at a time | `Cmd+Right Arrow` (Mac) / `Ctrl+Right Arrow` (Win/Linux) |
| Reject suggestion         | `Escape` or just keep typing                             |


**What makes it special:**

- **Multi-line edits:** Tab can suggest changes across multiple lines at once, including adding missing imports.
- **Jump-in-file:** After accepting a suggestion, press `Tab` again — it predicts your next editing location and jumps there automatically.
- **Cross-file suggestions:** When changes in one file require updates in another, a "portal window" appears at the bottom of the editor showing the suggested edit in the other file.

Tab completion learns from your recent edits, surrounding code, and linter errors. You can snooze or disable it by clicking the Tab indicator in the bottom-right corner of the editor.

### Inline Edit (Cmd+K)

A lightweight prompt bar for quick, targeted changes without opening the agent panel.

**How to use it:**

1. Select the code you want to change (or place your cursor where you want new code)
2. Press `Cmd+K` (Mac) / `Ctrl+K` (Win/Linux)
3. Type your instruction (e.g., "convert this to async/await")
4. Press `Return` — the edit is applied in place
5. Type follow-up instructions and press `Return` again to refine

**Quick question mode:** After pressing `Cmd+K`, press `Opt+Return` (Mac) / `Alt+Return` (Win/Linux) to ask a question about the selected code instead of editing it.

**Escalating to Agent:** If the change is too complex for inline edit (multi-file, architectural), press `Cmd+L` to open the Agent panel with your selection as context.

### When to Use What


| Scenario                            | Tool                  |
| ----------------------------------- | --------------------- |
| You know what to type next          | Tab completion        |
| Quick edit to a few lines           | Inline Edit (`Cmd+K`) |
| Multi-file changes or complex tasks | Agent panel (`Cmd+I`) |


### Key Takeaway

Tab and Inline Edit handle the small, fast stuff so you stay in flow. The Agent panel handles the big stuff. Together they cover the full spectrum from "finish this line" to "build this feature."

---

## Module 5: Giving Cursor Context

The quality of the agent's output depends heavily on the context you give it. Cursor offers several ways to provide context, from quick @-mentions to persistent project rules.

### @-Mentions (Immediate Context)

Type `@` in the agent chat input to attach specific context to your prompt.


| @-mention          | What It Attaches                                |
| ------------------ | ----------------------------------------------- |
| `@filename.ts`     | A specific file                                 |
| `@src/components/` | An entire folder                                |
| `@getUserById`     | A specific function, class, or variable         |
| `@docs`            | Lets the agent search documentation             |
| `@web`             | Lets the agent search the web                   |
| `@codebase`        | Searches across your entire project             |
| `@past chats`      | References context from a previous conversation |


You can use multiple @-mentions in a single prompt. If you are unsure which files matter, you can skip @-mentions entirely — the agent will find relevant files through its own search tools.

### Rules (Persistent Context)

Rules give the agent standing instructions about your project — coding style, conventions, patterns, tech stack — so you do not have to repeat yourself in every prompt.

**Rule types:**


| Type                        | When It Applies                                            |
| --------------------------- | ---------------------------------------------------------- |
| **Always Apply**            | Included in every conversation                             |
| **Apply Intelligently**     | Agent decides when it is relevant (requires a description) |
| **Apply to Specific Files** | Only for files matching a glob pattern (e.g., `*.tsx`)     |
| **Apply Manually**          | Only when you @-mention the rule                           |


**Where rules live:**


| Location                                   | Scope                    | Shared via               |
| ------------------------------------------ | ------------------------ | ------------------------ |
| `.cursor/rules/`                           | Project                  | Git (version-controlled) |
| Cursor Settings > Rules                    | User (all projects)      | Not shared               |
| Cursor Dashboard                           | Team                     | Synced automatically     |
| `AGENTS.md` or `CLAUDE.md` at project root | Project (always applied) | Git                      |


**Precedence:** Team Rules > Project Rules > User Rules.

**Important:** Rules apply to the Agent panel modes. They do not affect Tab completion or Inline Edit.

### Codebase Indexing

Cursor automatically indexes your codebase into searchable vectors using a custom embedding model. This powers the agent's semantic search — it can find relevant code by meaning, not just exact text matches.

- Indexing starts when you open a workspace
- Search becomes available at 80% completion
- Auto-syncs every 5 minutes, processing only changed files
- File paths are encrypted; code content is never stored in plaintext on Cursor servers

### MCP (Model Context Protocol)

MCP lets you connect Cursor to external tools and data sources — databases, APIs, services like GitHub, Notion, Figma, Slack, Supabase, Stripe, and more.

**What MCP servers can provide:**


| Capability    | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| **Tools**     | Functions the agent can call (e.g., query a database, create a Notion page) |
| **Resources** | Structured data the agent can read                                          |
| **Prompts**   | Templated workflows                                                         |


**How to add MCP servers:**

- **One-click:** Browse the [Cursor Marketplace](https://cursor.com/marketplace) or [cursor.directory](https://cursor.directory/) and click "Add to Cursor"
- **Manual:** Create `.cursor/mcp.json` (project-specific, committed to git) or `~/.cursor/mcp.json` (global, personal)

Once configured, the agent automatically discovers MCP tools and uses them when relevant. You can toggle individual tools on/off from the tools list at the top of the agent panel.

### Key Takeaway

Use @-mentions for immediate, one-off context. Use Rules for persistent project conventions. Use MCP to connect the agent to external tools and services. The agent can also find context on its own through codebase search and web search.

---

## Module 6: Cloud Agents and Parallel Work

So far everything has been about agents running locally on your machine. Cloud Agents take this further by running on isolated virtual machines in the cloud.

### Local Agents vs Cloud Agents


|                            | Local Agent                 | Cloud Agent                                                 |
| -------------------------- | --------------------------- | ----------------------------------------------------------- |
| **Where it runs**          | Your machine                | An isolated VM in the cloud                                 |
| **Requires your machine?** | Yes                         | No — works while your laptop is closed                      |
| **Parallel agents**        | One at a time (per panel)   | As many as you want                                         |
| **Tools**                  | Full local tool access      | Full tool access + computer use (mouse/keyboard in a VM)    |
| **Output**                 | Changes in your local files | Creates a branch, pushes changes, opens a PR                |
| **Dev server testing**     | You start the server        | Agent starts the server, opens a browser, clicks through UI |


### Starting a Cloud Agent

From the Cursor desktop app:

1. Open the agent panel (`Cmd+I`)
2. In the model/mode dropdown, select **Cloud**
3. Type your prompt and press Return

The cloud agent clones your repo, works on a separate branch, and pushes its changes when done — typically opening a PR for you to review.

### What Cloud Agents Can Do

- **Computer use:** Each agent gets its own VM with a full desktop. It can start dev servers, open browsers, click through UI flows, take screenshots, and verify that its changes actually work.
- **Fix CI automatically:** If a cloud agent opens a PR and CI fails, it will automatically attempt to fix the failures. (Disable per-PR with `@cursor autofix off`.)
- **Use MCP tools:** Cloud agents can connect to the same external tools and services as local agents.
- **Create demos:** Agents produce screenshots, videos, and logs to demonstrate their work, which can be embedded in PR descriptions.

### Handing Off Between Local and Cloud

You can move a conversation between local and cloud at any time:

- **Local to Cloud:** Prepend `&` to any message in the chat, or use the Cloud dropdown. The agent continues working in the cloud while you do other things.
- **Cloud to Local:** From the Agents Window or Cursor Web, pull a cloud agent's work back to your local machine to iterate hands-on.

### Key Takeaway

Cloud Agents let you parallelize your work. Kick off multiple agents on different tasks, close your laptop, and come back to PRs ready for review. Use local agents for interactive, hands-on work. Use cloud agents for tasks that can run independently.

---

## Module 7: Cursor Beyond the Desktop

Cursor is not limited to the desktop application. There are several other surfaces where you can interact with the agent.

### Cursor CLI (Terminal Agent)

A standalone terminal interface — no GUI needed.

**Install:**

```bash
# macOS / Linux / WSL
curl https://cursor.com/install -fsS | bash

# Windows PowerShell
irm 'https://cursor.com/install?win32=true' | iex
```

After installation, the command is `agent`.

**Modes:**


| Mode            | Command                            | Description                                                     |
| --------------- | ---------------------------------- | --------------------------------------------------------------- |
| Interactive     | `agent`                            | Full conversational agent in your terminal                      |
| With a prompt   | `agent "add tests for auth"`       | Start a session with an initial prompt                          |
| Non-interactive | `agent -p "fix the linter errors"` | Runs to completion, prints output, exits (great for scripts/CI) |
| Cloud handoff   | `agent -c "deploy the feature"`    | Pushes the task to a cloud agent                                |


**Session management:**

- `agent ls` — list past sessions
- `agent resume` — resume the most recent session
- `agent --resume="chat-id"` — resume a specific session

The CLI reads your `.cursor/rules`, `AGENTS.md`, and `mcp.json` configuration, so your project context carries over from the desktop app.

### Cursor Web (cursor.com/agents)

A web interface for managing cloud agents from any device — desktop, tablet, or phone.

**What you can do:**

- Start new cloud agent tasks
- Monitor running agents and view their progress
- Review agent output, screenshots, and videos
- Configure MCP servers for cloud agents

**Mobile:** You can install it as a Progressive Web App (PWA). On iOS, open in Safari > Share > "Add to Home Screen". On Android, open in Chrome > Menu > "Install App".

### Cursor Dashboard (cursor.com/dashboard)

A web dashboard for account and administrative tasks:

- View and manage shared transcripts
- Configure cloud agent settings (secrets, environment variables)
- Manage team settings, integrations, and billing
- Monitor usage

### External Triggers

You can kick off cloud agents from tools your team already uses:


| Trigger    | How                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| **Slack**  | Mention `@cursor` with a prompt. Cursor auto-selects the repo. The agent posts status updates and PR links.  |
| **GitHub** | Comment `@cursor` on a PR or issue. The agent reads the context and starts working.                          |
| **Linear** | Assign an issue to "Cursor" or mention `@Cursor` in comments. The agent analyzes the issue and creates a PR. |
| **API**    | Programmatic access to start and manage cloud agents.                                                        |


### Automations

Automations run cloud agents on a schedule or in response to events — without any manual trigger.

**Trigger types:**


| Category      | Examples                                          |
| ------------- | ------------------------------------------------- |
| **Scheduled** | Every hour, daily, custom cron                    |
| **GitHub**    | PR opened, PR pushed, CI completed, label changed |
| **Slack**     | New message in a channel                          |
| **Linear**    | Issue created, status changed, end of cycle       |
| **PagerDuty** | Incident triggered, acknowledged, resolved        |
| **Webhook**   | Custom HTTP endpoint                              |


**Example automations:**

- Auto-review every PR that gets opened
- Run a weekly dependency update and open a PR
- When a PagerDuty incident fires, have an agent investigate the logs and suggest a fix

Set up automations at [cursor.com/automations](https://cursor.com/automations) or start from a template in the Cursor Marketplace.

### Cursor in Other IDEs

Cursor's agent is not limited to the Cursor application:

- **JetBrains IDEs** (IntelliJ, PyCharm, WebStorm, etc.): Via the Agent Client Protocol (ACP), Cursor's agent works inside JetBrains' AI Chat panel.
- **Xcode**: Via MCP integration (Xcode 26.3+), the agent can build, test, and preview Xcode projects.

### Key Takeaway

Cursor meets you where you are — desktop app, terminal, web browser, phone, Slack, GitHub, Linear, or even inside other IDEs. Choose the surface that fits your workflow.

---

## Module 8: Practical Workflows and Tips

Now that you know the features, here are concrete workflows and tips for getting the most out of Cursor.

### Workflow 1: Starting a New Feature

1. **Plan first.** Switch to Plan mode (`Shift+Tab`). Describe the feature. Let the agent research your codebase and produce a plan.
2. **Review the plan.** Read through it, edit if needed. Make sure it accounts for edge cases and matches your architecture.
3. **Build.** Click Build. The agent executes the plan step by step. Review checkpoints as it goes.
4. **Test.** Ask the agent to write tests, or switch to your terminal and run them yourself.

### Workflow 2: Fixing a Bug

1. **Debug first.** Switch to Debug mode. Paste the error message or describe the symptom.
2. **Let the agent investigate.** It will generate hypotheses, add logs, and narrow down the root cause.
3. **Review the fix.** Once the agent identifies the issue, it applies a targeted fix. Review the diff before accepting.

### Workflow 3: Parallel Agent Swarm

1. Open the **Agents Window.**
2. Kick off multiple cloud agents on different tasks:
  - Agent 1: "Add input validation to all API endpoints"
  - Agent 2: "Write missing unit tests for the payment module"
  - Agent 3: "Update the README with the new API endpoints"
3. Close your laptop. Go for a walk.
4. Come back to PRs ready for review.

### Workflow 4: Understanding a New Codebase

1. Switch to **Ask mode.**
2. Start with broad questions: "What is the overall architecture of this project?"
3. Drill down: "How does the authentication flow work?" / "Where are database queries made?"
4. Use @-mentions to focus: "@src/api/ — explain the routing structure"

### Workflow 5: Setting Up Project Rules

Create a file at `.cursor/rules/project.md`:

```markdown
---
description: Core project conventions
alwaysApply: true
---

- This is a Next.js 14 app with TypeScript and Tailwind CSS
- Use the App Router, not Pages Router
- All API routes go in src/app/api/
- Use Zod for input validation
- Write tests with Vitest
- Prefer server components unless client interactivity is needed
```

Once saved, the agent follows these conventions in every conversation — no need to repeat them.

### Tips and Best Practices

**1. Be specific in your prompts.**

- Weak: "Fix the bug"
- Strong: "The login form on /auth/login submits but shows a blank page. The network tab shows a 401 response from /api/auth. Fix the authentication check."

**2. Use @-mentions to reduce ambiguity.**

- Instead of "update the config file," say "@next.config.js — add the `images.remotePatterns` setting for our CDN domain."

**3. Queue follow-up messages.**
While the agent is working, type your next instruction. It queues up and runs automatically when the current task finishes. This keeps the agent busy and you productive.

**4. Use checkpoints as safety nets.**
The agent creates checkpoints before major changes. If something goes wrong, click a checkpoint in the timeline to roll back. Do not be afraid to let the agent try ambitious changes.

**5. Start with Plan mode for complex tasks.**
It is tempting to jump straight into Agent mode, but for anything that touches multiple files or requires architectural decisions, Plan mode saves time by catching misunderstandings early.

**6. Set up Rules early.**
Five minutes writing a rules file saves hours of correcting the agent later. Include your tech stack, conventions, file structure patterns, and testing preferences.

**7. Use the CLI for quick tasks.**
For a quick fix or question, `agent "what does this function do?"` in your terminal is faster than opening the full desktop app.

### Key Takeaway

The best Cursor workflow combines planning, context, and the right mode for the job. Set up rules once, plan before building, use checkpoints as safety nets, and let cloud agents handle parallel work.

---

## Appendix: Keyboard Shortcuts Quick Reference


| Shortcut (Mac)    | Shortcut (Win/Linux) | Action                                   |
| ----------------- | -------------------- | ---------------------------------------- |
| `Cmd+I`           | `Ctrl+I`             | Open/focus the Agent panel               |
| `Shift+Tab`       | `Shift+Tab`          | Cycle between Agent/Ask/Plan/Debug modes |
| `Cmd+K`           | `Ctrl+K`             | Inline Edit                              |
| `Cmd+L`           | `Ctrl+L`             | Send selection to Agent panel            |
| `Tab`             | `Tab`                | Accept autocomplete suggestion           |
| `Cmd+Right Arrow` | `Ctrl+Right Arrow`   | Accept suggestion word-by-word           |
| `Escape`          | `Escape`             | Dismiss suggestion                       |
| `Cmd+Shift+P`     | `Ctrl+Shift+P`       | Command Palette                          |
| `Cmd+Shift+J`     | `Ctrl+Shift+J`       | Cursor Settings                          |
| `Cmd+P`           | `Ctrl+P`             | Quick Open (file search)                 |
| `Cmd+Shift+F`     | `Ctrl+Shift+F`       | Search across files                      |
| `Cmd+Shift+X`     | `Ctrl+Shift+X`       | Extensions panel                         |


---

## Appendix: Models

Cursor supports models from multiple providers. You can switch models at any time using the dropdown in the agent panel.

**Routing options:**

- **Auto:** Cursor selects models balancing intelligence, cost, and reliability. Best for everyday use.
- **Premium:** Cursor selects the most capable models. Best for complex tasks.
- **Manual:** Pick a specific model yourself.

**Max Mode:** Extends the context window to the model's maximum capacity. Uses token-based pricing. Cloud agents always run in Max Mode.

---

## Appendix: Privacy and Security

- **Privacy Mode** ensures your code is never stored by model providers and never used for training. Cursor enforces Zero Data Retention agreements with all providers (OpenAI, Anthropic, Google, xAI).
- Enable Privacy Mode via Cursor Settings > General.
- **Teams:** Privacy Mode is enabled by default; admins can enforce it org-wide.
- **Cloud Agents:** Each agent runs in an isolated VM. Secrets are encrypted at rest with KMS.
- **Enterprise:** SOC 2 Type II compliance, audit logs, customer-managed encryption keys (CMEK).

---

## What's Next?

1. **Install Cursor** at [cursor.com/download](https://cursor.com/download)
2. **Import your VS Code settings** if you are migrating
3. **Open a project** and try Agent mode — ask it to do something small first
4. **Set up a rules file** at `.cursor/rules/` with your project conventions
5. **Explore MCP** in the Cursor Marketplace to connect your tools
6. **Try a cloud agent** for a task you would normally delegate to a teammate

---

*This mini-course is based on Cursor's official documentation as of April 2026.*