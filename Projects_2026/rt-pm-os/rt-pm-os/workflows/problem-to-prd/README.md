# Problem to PRD

**"From problem statement to engineering-ready"**

Transform a problem statement and research evidence into a complete spec package — JTBD analysis, opportunity tree, PRD, and user stories ready for engineering.

---

## What You Get

| Output | Description |
|--------|-------------|
| **JTBD Analysis** | Functional, emotional, and social jobs extracted from evidence |
| **Opportunity Tree** | Solutions mapped to opportunities with assumptions to test |
| **Complete PRD** | Problem, evidence, success criteria, risks, non-goals |
| **User Stories** | Acceptance criteria, edge cases, engineering-ready |

---

## Time Comparison

| Approach | Time |
|----------|------|
| Manual spec writing | 4-6 hours across multiple sessions |
| PMKit workflow | **30-45 minutes** |

---

## How to Use

### Step 1: Prepare Your Inputs

Create a file in the `inputs/` folder with:

1. **Problem Statement** — What problem are you solving and for whom?
2. **Evidence** — Research, data, feedback that supports this is a real problem
3. **Context** — Any constraints, dependencies, or relevant background

Example input file (`inputs/checkout-friction.md`):

```markdown
# Problem: Checkout Friction

## Problem Statement
Users are abandoning checkout at the payment step. We're seeing 40% drop-off
between "Add to Cart" and "Purchase Complete."

## Evidence
- Analytics: 40% drop-off at payment step (up from 25% last quarter)
- User research: 3 of 5 users mentioned "too many steps" in interviews
- Support tickets: 47 tickets last month about "checkout problems"

## User Quote
> "I just wanted to buy one thing and it felt like I was filling out a mortgage application"

## Context
- We currently require account creation before checkout
- Payment options: Credit card only
- Mobile traffic is 60% of checkout attempts
```

### Step 2: Run the Workflow

In Claude Code, tell Claude:

```
Run the problem to PRD workflow
```

Or be more specific:

```
Run the problem to PRD workflow for the checkout friction problem
```

### Step 3: Review Outputs

Find your results in the `outputs/` folder:

```
outputs/
├── jtbd-analysis.md
├── opportunity-tree.md
├── prd-[feature-name].md
└── user-stories-[feature-name].md
```

---

## Best Results Tips

1. **Start with evidence** — The more research you include, the stronger the PRD
2. **Be specific about the problem** — Vague problems lead to vague specs
3. **Include constraints** — Technical limitations, timeline, resources
4. **Review and iterate** — Ask Claude to refine specific sections

---

## What Claude Does

1. **Analyzes your problem** and evidence
2. **Extracts JTBD** from the user perspective
3. **Maps opportunities** to potential solutions
4. **Generates PRD** with problem-first methodology (Marty Cagan)
5. **Writes user stories** with acceptance criteria

---

## Framework

This workflow uses:

- **Marty Cagan's Problem-First PRD** — Start with problem, not solution
- **Teresa Torres' Opportunity Solution Trees** — Map solutions to user needs
- **Jobs-to-Be-Done** — Understand user motivation

---

## Pro Workflow

This workflow is part of **PMKit Pro** ($29/mo).

→ [Upgrade at pmkit.ai/pricing](https://pmkit.ai/pricing)
