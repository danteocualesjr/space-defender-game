# Voice of Customer Analysis

**All your feedback. One report. 30 minutes.**

---

## What This Workflow Does

Analyzes multiple VoC sources (support tickets, NPS comments, sales calls, community posts, app reviews) in parallel using agent teams. Each teammate analyzes one source type, then synthesizes top themes, prioritized pain points, and opportunity areas.

**Time saved:** 3 hours → 30 minutes (6× faster)

---

## When to Use This

- Quarterly roadmap planning (what should we build next?)
- Feature prioritization (which pain points matter most?)
- Product-market fit assessment (are we solving the right problems?)
- Customer retention analysis (why are customers churning?)
- Support ticket trend analysis (what's driving volume?)

---

## What You'll Get

**Single comprehensive VoC report** with:

1. **Executive Summary** — Top 3 cross-source themes with urgency levels
2. **Cross-Source Theme Analysis** — Themes that appear in 2+ sources (validated pain points):
   - Frequency (how many mentions per source)
   - Representative quotes (customer language)
   - Sentiment breakdown
   - Opportunity (what to build/fix)
3. **Prioritized Pain Points** — Frequency × Urgency matrix with P0/P1/P2 labels
4. **Source-Specific Insights** — Deep dive on each source:
   - Support tickets (top issues, sentiment)
   - NPS comments (promoters vs. detractors)
   - Sales calls (objections, expansion blockers)
   - Community posts (engaged user feedback)
   - App reviews (rating trends, common complaints)
5. **Feature Requests** — Aggregated across sources with priority
6. **Sentiment Analysis** — Overall + by source
7. **Opportunity Areas:**
   - Quick wins (< 1 sprint)
   - Strategic bets (> 1 quarter)
8. **Recommended Next Steps** — Immediate / short-term / long-term actions

---

## How It Works

### 1. You Provide
- 2+ VoC sources (support tickets, NPS, sales calls, community, reviews)
- Data can be CSV exports, pasted text, or files in `inputs/` folder

### 2. Agent Team Analyzes
- N AI teammates work in parallel (1 per source type)
- Each extracts pain points, feature requests, themes, quotes, sentiment
- All teammates rate urgency (High/Medium/Low)

### 3. Lead Synthesizes
- Cross-source theme analysis (which themes appear in multiple sources?)
- Prioritization matrix (frequency × urgency × business impact)
- Opportunity areas (quick wins vs. strategic bets)

### 4. You Receive
- VoC analysis report (~30 minutes)
- Prioritized action items
- Representative customer quotes

---

## Framework

**VoC Synthesis:**
- Multi-source triangulation (themes in 3+ sources = highest priority)
- Single-source themes = investigate (may be niche or early signal)

**Atomic Research:**
- Break feedback into atomic units (pain points, requests)
- Tag with source, frequency, urgency
- Cluster into themes

**Prioritization Matrix:**
- **P0 (Fix Now):** High frequency + High urgency + 3+ sources
- **P1 (Next Quarter):** Medium frequency + High urgency, OR High frequency + Medium urgency
- **P2 (Backlog):** Low urgency or single-source themes

---

## Requirements

**Before running:**
- ✅ At least 2 VoC sources (more = better theme validation)
- ✅ Recent data (last 3-6 months for current pain points)
- ✅ Diverse sources (support + sales + community = different perspectives)

**Platform:**
- Claude Code Desktop or CLI (agent teams required)

---

## Output Example

```
workflows/voice-of-customer-analysis/outputs/
└── voc-analysis-report-2026-02-05.md
```

**Report includes:**
- Top 3 cross-source themes
- Prioritized pain points (P0/P1/P2)
- Source-specific insights (support, NPS, sales, community, reviews)
- Feature requests aggregated
- Sentiment analysis
- Quick wins vs. strategic bets

---

## Example VoC Sources

**Support Tickets:**
- Export from Zendesk, Intercom, Help Scout
- CSV with ticket subject, description, tags
- Last 3 months (for current pain points)

**NPS/CSAT Comments:**
- Export from Delighted, Wootric, SurveyMonkey
- CSV with score + comment
- Promoters (9-10), Passives (7-8), Detractors (0-6)

**Sales Call Notes:**
- Call transcripts from Gong, Chorus
- Summary notes from CRM (Salesforce, HubSpot)
- Objection patterns, expansion blockers

**Community Posts:**
- Reddit, ProductHunt, Slack communities
- Paste top threads or export
- Engaged user feedback

**App Store Reviews:**
- iOS App Store, Google Play Store, Chrome Web Store
- Paste recent reviews or use aggregator export
- Focus on 1-3★ reviews (pain points) and 5★ (praise)

---

## Tips for Best Results

1. **Use 2+ sources** — Cross-source themes = validated pain points
2. **Recent data** — Last 3-6 months (feedback evolves over time)
3. **Diverse sources** — Support (reactive) + Sales (proactive) + Community (engaged users)
4. **Act on P0 immediately** — High frequency + urgency + 3+ sources = can't ignore
5. **Close the loop** — Communicate roadmap to customers who gave feedback

---

## Limitations

**Can't do:**
- ❌ Access your support/NPS tools directly (you provide exports)
- ❌ Guarantee perfect theme extraction (some nuance may be lost)
- ❌ Predict future customer needs (analyzes current feedback only)
- ❌ Replace talking to customers (VoC is data, not conversation)

**Does:**
- ✅ Analyze multiple VoC sources in parallel
- ✅ Identify cross-source themes (validated pain points)
- ✅ Prioritize by frequency + urgency + business impact
- ✅ Pull representative quotes (customer language for roadmap)
- ✅ Save 2.5-3 hours of manual synthesis

---

## Cost

**Token usage:** ~90-120K tokens per analysis (~$1.00-$1.40 in Claude API costs)

**Value:** 3 hours saved × $50-75/hr = $150-225 saved

**ROI:** 107-225× on token costs

---

## Getting Started

1. Collect 2+ VoC sources (support tickets, NPS, sales calls, community, reviews)
2. Run the workflow: `/voc-analysis`
3. Select which sources to analyze
4. Provide data (CSV export, paste, or upload to `inputs/` folder)
5. Wait 20-30 minutes for analysis + synthesis
6. Review report in `outputs/` folder
7. Act on P0 items immediately

---


*Competitive Intelligence Pack | Batch Interview Synthesis | Hypothesis Tester | Market Sizing Analyzer | Voice of Customer Analysis*
