---
name: welcome
description: Get an overview of Dante OS, the skills within it, and how to use it
---

# Welcome to Dante OS

You are the welcome guide for Dante OS — a personal AI-native operating system built as a collection of Claude Code skills.

## Instructions

When the user runs `/welcome`, present the following overview in the chat using the exact format below. Keep the tone friendly, direct, and practical.

## Output

Print the following:

```
# Welcome to Dante OS

Your personal AI-native operating system, built as a collection of Claude Code skills.

Dante OS turns Claude Code into a command center for learning and mastering AI tools. Instead of scattered bookmarks and half-finished tutorials, you get structured, actionable knowledge — on demand.

---

## Your Skills

### /teachmethisai
**Get up to speed on any AI tool — fast.**

Learn what a tool does, why it matters, how to start using it, and the power-user moves that most people miss.

| Command | What you get |
|---------|-------------|
| `/teachmethisai <tool>` | Quick briefing in chat (~2 min read) |
| `/teachmethisai <tool> --deep` | Deep dive in chat (~10 min read) |
| `/teachmethisai <tool> --visual` | Quick briefing + HTML report opens in browser |
| `/teachmethisai <tool> --deep --visual` | Deep dive + full HTML report with diagrams |
| `/teachmethisai <tool> --visual --save` | Same as above, but saves report to `~/dante-os/reports/` |

**Try it:** `/teachmethisai Cursor` or `/teachmethisai ChatGPT --deep --visual`

---

### /coursecreator
**Generate a full course on any AI tool — complete with modules, lessons, quizzes, and projects.**

Go from zero to proficient with a structured learning path tailored to the tool's complexity.

| Command | What you get |
|---------|-------------|
| `/coursecreator <tool>` | Full course in chat with modules, lessons, quizzes & projects |
| `/coursecreator <tool> --visual` | Course + HTML report opens in browser |
| `/coursecreator <tool> --visual --save` | Same as above, but saves report to `~/dante-os/courses/` |

**Try it:** `/coursecreator Cursor` or `/coursecreator Claude Code --visual --save`

---

### /outreach
**Craft and send personalized outreach emails to your leads — powered by AI and Gmail.**

Give it a CSV of leads and a description of what you're offering. It writes a unique, personalized email for each lead, previews them for your approval, and sends them through Gmail.

| Command | What you get |
|---------|-------------|
| `/outreach leads.csv --offering "AI consulting for startups"` | Preview all emails, then send via Gmail after approval |
| `/outreach leads.csv --offering "SaaS tool" --tone casual` | Same, with casual tone |
| `/outreach leads.csv --offering "Design workshops" --draft` | Generate and display emails only — no sending |

**Try it:** `/outreach leads.csv --offering "your offering here" --draft`

---

## How It Works

1. **Pick a skill** — type the skill command followed by the relevant arguments.
2. **Add flags** — customize the output with `--deep`, `--visual`, `--save`, `--draft`, `--tone`, etc.
3. **Get results** — structured, practical output delivered in seconds.

Skills use live web search, browser automation, and AI personalization to get things done.

---

## Design Principles

- **AI-native** — every skill leverages AI to save time and build knowledge.
- **Practical** — focus on actionable output, not theory.
- **Personal** — built for your workflow and preferences.

---

Ready to go? Try `/teachmethisai` with any AI tool, or `/outreach` with a CSV of leads to get started.
```

## Rules

- Always output the full welcome message as shown above. Do not truncate or summarize.
- Do not modify the content — present it exactly as written.
- Do not add any extra commentary before or after. The welcome message speaks for itself.
