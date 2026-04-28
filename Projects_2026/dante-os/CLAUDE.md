# Dante OS

A personal AI-native operating system built as a collection of Claude Code skills.

## Project Structure

```
dante-os/
├── CLAUDE.md              # This file
└── .claude/
    └── skills/
        ├── welcome/       # OS welcome guide & overview
        │   └── SKILL.md
        ├── teachmethisai/ # AI tool learning assistant
        │   └── SKILL.md
        ├── coursecreator/ # AI tool course generator
        │   └── SKILL.md
        └── outreach/      # Email outreach automation agent
            └── SKILL.md
```

## Skills

| Skill | Description | Usage |
|-------|-------------|-------|
| `/welcome` | Get an overview of Dante OS and all available skills | Just run `/welcome` |
| `/teachmethisai` | Get a practical briefing on any AI tool | See examples below |
| `/coursecreator` | Generate a full course on any AI tool with modules, lessons, quizzes & projects | See examples below |
| `/outreach` | Craft and send personalized outreach emails to leads via Gmail | See examples below |

### `/teachmethisai`

| Command | What you get |
|---------|-------------|
| `/teachmethisai Cursor` | Quick briefing in chat (~2 min read) |
| `/teachmethisai Cursor --deep` | Deep dive in chat (~10 min read) |
| `/teachmethisai Cursor --visual` | Quick briefing + HTML report opens in browser |
| `/teachmethisai Cursor --deep --visual` | Deep dive + full HTML report with diagrams |
| `/teachmethisai Cursor --visual --save` | Same as above, but saves report to `~/dante-os/reports/` |

### `/coursecreator`

| Command | What you get |
|---------|-------------|
| `/coursecreator Cursor` | Full course in chat with modules, lessons, quizzes & projects |
| `/coursecreator Cursor --visual` | Course + HTML report opens in browser |
| `/coursecreator Cursor --visual --save` | Same as above, but saves report to `~/dante-os/courses/` |

### `/outreach`

| Command | What you get |
|---------|-------------|
| `/outreach leads.csv --offering "AI consulting for startups"` | Preview all emails, then send via Gmail after approval |
| `/outreach leads.csv --offering "SaaS onboarding tool" --tone casual` | Same, with casual tone |
| `/outreach leads.csv --offering "Design sprint workshops" --draft` | Generate and display emails only — no sending |

## Design Principles

- **AI-native**: Every skill leverages AI to save time and build knowledge.
- **Practical**: Focus on actionable output, not theory.
- **Personal**: Built for Dante's workflow and preferences.
