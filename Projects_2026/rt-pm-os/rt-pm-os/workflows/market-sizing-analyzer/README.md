# Market Sizing Analyzer

**TAM/SAM/SOM from 5 sources. 45 minutes.**

---

## What This Workflow Does

Researches market size (TAM/SAM/SOM) from 5 different sources in parallel using agent teams. Each teammate researches a different methodology (analyst reports, competitor financials, bottom-up sizing, top-down sizing, adjacent markets), then synthesizes a comprehensive market size estimate with confidence ranges.

**Time saved:** 4 hours → 45 minutes (5× faster)

---

## When to Use This

- Fundraising pitch decks (TAM slide)
- Strategy planning / OKRs (market opportunity sizing)
- Market entry decisions (is this market big enough?)
- Board presentations (market context)
- Business case development (revenue potential)

---

## What You'll Get

**Single comprehensive market sizing report** with:

1. **Executive Summary** — TAM/SAM/SOM ranges with recommended estimate
2. **Methodology Summary** — Comparison table of all 5 estimates
3. **Detailed Analysis** — Full breakdown for each methodology:
   - Analyst Reports (Gartner, Forrester, IDC)
   - Competitor Financials (public company extrapolation)
   - Bottom-Up Sizing (# customers × ARPU)
   - Top-Down Sizing (industry size × % addressable)
   - Adjacent Market Proxies (similar markets as benchmarks)
4. **Triangulated Estimate** — Weighted average with low/mid/high range
5. **Assumptions & Risks** — Key assumptions, sensitivity analysis, confidence drivers
6. **Recommended Use** — Which estimate to use for fundraising vs. planning vs. board decks

---

## How It Works

### 1. You Provide
- Market/product category (e.g., "PM software for agencies")
- Target geography (Global, North America, US only, etc.)
- Time horizon (2026 or 5-year projection)

### 2. Agent Team Researches
- 5 AI teammates work in parallel (1 per methodology)
- Each researches their assigned approach independently
- All cite sources and state assumptions

### 3. Lead Triangulates
- Compares all 5 estimates
- Identifies consensus range (low/mid/high)
- Flags assumption risks
- Recommends which estimate to use for what purpose

### 4. You Receive
- Market sizing report (~45 minutes)
- TAM/SAM/SOM ranges with confidence levels
- Sources cited for all data points

---

## Framework

**TAM/SAM/SOM:**
- TAM = Total Addressable Market (100% capture)
- SAM = Serviceable Addressable Market (realistic reach)
- SOM = Serviceable Obtainable Market (3-5 year capture)

**5 Methodologies:**
1. **Analyst Reports** — Gartner, Forrester, IDC (High credibility)
2. **Competitor Financials** — Public company revenues (Real market data)
3. **Bottom-Up** — # customers × ARPU (Grounded in unit economics)
4. **Top-Down** — Industry size × % addressable (Common in pitch decks)
5. **Adjacent Markets** — Similar market proxies (Validation)

**Triangulation:**
- Use 3-5 independent estimates
- Weighted average based on credibility
- Consensus range increases confidence

---

## Requirements

**Before running:**
- ✅ Specific market definition (not "software" but "AI PM tools for solo PMs")
- ✅ Target geography
- ✅ (Optional) Know your use case (fundraising, planning, board deck)

**Platform:**
- Claude Code Desktop or CLI (agent teams required)

---

## Output Example

```
workflows/market-sizing-analyzer/outputs/
└── market-sizing-report-2026-02-05.md
```

**Report includes:**
- TAM/SAM/SOM ranges (low/mid/high)
- 5 methodology breakdowns with sources
- Triangulated estimate (weighted average)
- Assumptions & sensitivity analysis
- Recommended use (fundraising vs. planning)

---

## Tips for Best Results

1. **Be specific** — "PM software for agencies" beats "PM tools"
2. **Validate assumptions** — Customer counts realistic? ARPU accurate?
3. **Show range, not point estimate** — "$8-12B" is more credible than "$10.347B"
4. **Cite sources** — Always cite when presenting (Gartner, bottom-up, etc.)
5. **Use appropriate estimate:**
   - TAM for fundraising (mid-range with analyst citation)
   - SOM for internal planning (conservative 3-year goal)
   - Range for board decks (low/mid/high with confidence)

---

## Limitations

**Can't do:**
- ❌ Access paywalled analyst reports (uses public excerpts)
- ❌ Guarantee 100% accuracy (market sizing = estimates + assumptions)
- ❌ Predict future with certainty (uses historical growth rates)
- ❌ Provide real-time tracking (one-time snapshot)

**Does:**
- ✅ Research 5 independent methodologies in parallel
- ✅ Triangulate to find consensus range
- ✅ Flag key assumptions and sensitivity
- ✅ Recommend which estimate for what purpose
- ✅ Save 3-4 hours of manual research

---

## Cost

**Token usage:** ~100-130K tokens per analysis (~$1.25-$1.50 in Claude API costs)

**Value:** 4 hours saved × $50-75/hr = $200-300 saved

**ROI:** 133-240× on token costs

---

## Getting Started

1. Run the workflow: `/market-sizing`
2. Describe the market (specific segment, not broad category)
3. Specify geography and time horizon
4. Wait 30-45 minutes for research + triangulation
5. Review report in `outputs/` folder
6. Use appropriate estimate for your use case

---


*Competitive Intelligence Pack | Batch Interview Synthesis | Hypothesis Tester | Market Sizing Analyzer | Voice of Customer Analysis*
