# Hypothesis Tester

**5 theories. One truth. Fast.**

---

## What This Workflow Does

When you don't know why a metric changed or what's causing a problem, this workflow spawns 5 AI teammates. Each investigates a different hypothesis in parallel, they debate findings adversarially, and the lead synthesizes the most likely root cause with confidence levels.

**Time saved:** 2 hours → 15 minutes (8× faster)

---

## When to Use This

- **Metrics debugging** — "Why did conversion drop 20%?"
- **Root cause analysis** — "Why is churn increasing?"
- **Pre-mortems** — "What could cause this launch to fail?"
- **Problem diagnosis** — "Why aren't users adopting this feature?"
- **A/B test analysis** — "Why did variant B lose?"

---

## What You'll Get

**Single hypothesis testing report** with:

1. **Executive Summary** — Most likely cause with confidence %
2. **5 Hypotheses Investigated** — Each with:
   - Supporting evidence (data, logs, user feedback)
   - Disconfirming evidence (what contradicts this theory)
   - Confidence level (High/Medium/Low with %)
   - Validation tests (how to confirm or disprove)
3. **Debate Summary** — Key findings from adversarial challenges
4. **Recommended Next Steps:**
   - Immediate validation tests
   - If validated → recommended fixes
   - If not validated → next hypothesis to explore
5. **Confidence Assessment** — Why this confidence level, remaining uncertainties

---

## How It Works

### 1. You Provide
- Problem statement (e.g., "Conversion dropped 20% last week")
- (Optional) Context: recent changes, data sources, timeframe

### 2. Lead Generates Hypotheses
- 5 competing theories (technical, UX, market, product, acquisition)
- Or you can suggest your own theories to test

### 3. Agent Team Investigates
- 5 AI teammates work in parallel (1 per hypothesis)
- Each looks for supporting AND disconfirming evidence
- Teammates assign confidence levels (High/Medium/Low)

### 4. Adversarial Debate
- Teammates challenge each other's findings
- Identify contradictions, resolve conflicts
- Update confidence levels based on debate

### 5. Lead Synthesizes
- Most likely cause with confidence %
- Recommended validation tests
- Next steps if validated or not

### 6. You Receive
- Hypothesis testing report (~15 minutes)
- Actionable validation tests
- Honest assessment of uncertainty

---

## Framework

**Scientific Method:**
- Generate competing hypotheses
- Look for supporting AND disconfirming evidence
- Test assumptions, don't just confirm bias
- Assign confidence based on evidence strength

**Shreyas Doshi — Pre-Mortems:**
- Imagine failure scenarios before launch
- Work backwards from failure
- Test assumptions proactively

**David Bland — Assumption Testing:**
- Identify riskiest assumptions
- Design validation tests
- Update confidence based on results

---

## Requirements

**Before running:**
- ✅ Specific problem statement (metric, magnitude, timeframe)
- ✅ (Optional) Available data sources or recent changes

**Platform:**
- Claude Code Desktop or CLI (agent teams required)

---

## Output Example

```
workflows/hypothesis-tester/outputs/
└── hypothesis-testing-report-2026-02-05.md
```

**Report includes:**
- 5 hypotheses investigated with evidence
- Confidence levels (with % and justification)
- Adversarial debate summary
- Validation tests (specific and actionable)
- Recommended next steps

---

## Example Use Case

**Problem:** "Conversion dropped 20% last week, don't know why."

**Hypotheses Generated:**
1. Bug in checkout flow (technical)
2. Pricing page confusion (UX)
3. Mobile experience degraded (platform)
4. Marketing traffic quality dropped (acquisition)
5. Competitor launched feature (market)

**Investigation Results:**
- Hypothesis 1: High confidence (70%) — error logs show mobile checkout failures starting Feb 1
- Hypothesis 3: Medium confidence (50%) — mobile UX issues align with H1
- Hypotheses 2, 4, 5: Low confidence (<30%) — little supporting evidence

**Debate Findings:**
- H1 and H3 converge: mobile checkout bug
- H4 weakly supported (no retention change)
- H5 unlikely (no competitor launches)

**Most Likely Cause:** Mobile checkout bug (70% confidence)

**Validation Tests:**
1. Inspect error logs for mobile checkout (Feb 1-5)
2. Manually test checkout on iOS/Android
3. Review recent code deploys to checkout flow

**If Validated:** Deploy hotfix, monitor conversion recovery

**If Not Validated:** Investigate pricing page confusion (Hypothesis 2)

---

## Tips for Best Results

1. **Be specific** — "Conversion dropped 20%" beats "users aren't converting"
2. **List data sources** — Analytics, logs, user feedback (even if you don't have them yet)
3. **Note recent changes** — Launches, campaigns, code deploys
4. **Run validation tests** — High confidence (80%) isn't certainty; always validate
5. **Share findings** — Be transparent about uncertainty with your team

---

## Limitations

**Can't do:**
- ❌ Access your analytics/logs directly
- ❌ Guarantee root cause is correct (confidence %, not certainty)
- ❌ Fix the problem automatically
- ❌ Replace A/B testing or experiments

**Does:**
- ✅ Generate competing hypotheses (avoids anchoring bias)
- ✅ Investigate multiple theories in parallel
- ✅ Challenge assumptions through debate
- ✅ Assign honest confidence levels
- ✅ Recommend specific validation tests
- ✅ Save 1.5-2 hours of investigation time

---

## Cost

**Token usage:** ~75-115K tokens per analysis (~$1.38 in Claude API costs)

**Value:** 2 hours saved × $50-75/hr = $100-150 saved

**ROI:** 72-109× on token costs

---

## Getting Started

1. Run the workflow: `/hypothesis-tester`
2. Describe the problem (specific metric, magnitude, timeframe)
3. (Optional) Share context (recent changes, data sources)
4. Review generated hypotheses (or suggest your own)
5. Wait 10-15 minutes for investigation + debate
6. Review report in `outputs/` folder
7. Run recommended validation tests

---


*Competitive Intelligence Pack | Batch Interview Synthesis | Hypothesis Tester | Market Sizing Analyzer | Voice of Customer Analysis*
