# Batch Interview Analysis

**"10 interviews. 15 minutes. Done."**

Transform a batch of user interviews into a complete research package — individual snapshots, cross-interview synthesis, data-backed personas, and prioritized opportunities.

---

## What You Get

| Output | Description |
|--------|-------------|
| **Interview Snapshots** | Structured analysis for each interview (JTBD, opportunities, key quotes) |
| **Research Synthesis** | Themes, patterns, and contradictions across all interviews |
| **Data-Backed Personas** | Personas grounded in actual research, not assumptions |
| **Opportunity Tree** | Prioritized opportunities with evidence strength |

---

## Time Comparison

| Approach | Time |
|----------|------|
| Manual analysis | 30-45 min × 10 interviews + 2-3 hrs synthesis = **7-10 hours** |
| PMKit workflow | **15-20 minutes** |

---

## How to Use

### Step 1: Add Your Interviews

Drop your interview transcripts into the `inputs/` folder.

**Supported formats:**
- Text files (.txt)
- Markdown files (.md)
- Any plain text format

**Naming tip:** Name files descriptively (e.g., `interview-sarah-pm-acme.md`) so outputs are easy to identify.

### Step 2: Run the Workflow

In Claude Code, navigate to your PMKit folder and run:

```
claude
```

Then tell Claude:

```
Run the batch interview analysis workflow
```

Or be more specific:

```
Run the batch interview analysis workflow. I'm exploring how PMs handle competitive research.
```

### Step 3: Review Outputs

Find your results in the `outputs/` folder:

```
outputs/
├── interview-snapshot-[name-1].md
├── interview-snapshot-[name-2].md
├── ...
├── research-synthesis.md
├── personas.md
└── opportunity-tree.md
```

---

## Best Results Tips

1. **Include raw transcripts** — The more detail, the better the analysis
2. **Add context** — Tell Claude what you were exploring in the research
3. **Name files clearly** — Helps track which snapshot came from which interview
4. **Review and edit** — AI analysis is a starting point, not the final word

---

## What Claude Does

1. **Reads each interview** in the `inputs/` folder
2. **Extracts per interview:**
   - Jobs-to-be-done (functional, emotional, social)
   - Opportunities identified (framed as user needs)
   - Key quotes (verbatim, with context)
   - Behavioral observations
   - Follow-up questions
3. **Synthesizes across all interviews:**
   - Top themes (ranked by frequency)
   - Patterns and contradictions
   - Evidence strength assessment
4. **Generates personas** grounded in the research data
5. **Creates opportunity tree** with prioritized opportunities

---

## Framework

This workflow uses **Teresa Torres' Continuous Discovery Habits**:

- **Opportunities** are framed as user needs, not solutions
- **Evidence strength** helps prioritize what to act on
- **Opportunity trees** connect research to product decisions

---

## Example Output

### Interview Snapshot (per interview)

```markdown
# Interview Snapshot: Sarah Chen

**Date:** 2026-01-15
**Role:** Senior PM at Acme Corp
**Context:** Exploring competitive research workflows

## Jobs-to-Be-Done
- "When preparing for a product review, I need to understand competitor positioning, so I can defend our roadmap decisions"
- "When a competitor launches a feature, I need to quickly assess impact, so I can advise leadership"

## Opportunities Identified
| Opportunity | Evidence | Notes |
|-------------|----------|-------|
| Need faster competitive intel gathering | Strong | Mentioned 3x, high frustration |
| Need to share competitive context with sales | Medium | Secondary pain point |

## Key Quotes
> "I spend half my Fridays just trying to figure out what competitors shipped this week"
> — on competitive monitoring

## Follow-up Questions
- How do you currently share competitive intel with sales?
- What triggers a deep-dive vs. quick scan?
```

### Research Synthesis (across all interviews)

```markdown
# Research Synthesis: Competitive Research Workflows

**Sources:** 8 interviews
**Date:** 2026-01-20

## Top Themes

### 1. Time sink on monitoring (6/8 interviews)
PMs spend 2-4 hours weekly just tracking competitor activity...

### 2. Sharing intel is broken (5/8 interviews)
Competitive knowledge stays siloed in PM heads...

## Contradictions
- Enterprise PMs want depth; startup PMs want speed
- Some want alerts; others find alerts noisy

## Prioritized Opportunities
| Opportunity | Evidence | Impact | Confidence |
|-------------|----------|--------|------------|
| Automated competitor monitoring | Strong (6/8) | High | High |
| Shareable competitive briefs | Strong (5/8) | Medium | Medium |
```

---

## Need Help?

- Check the main PMKit docs at pmkit.ai/docs
- Make sure your interview files are in the `inputs/` folder
- Try being specific about what you're exploring when you run the workflow
