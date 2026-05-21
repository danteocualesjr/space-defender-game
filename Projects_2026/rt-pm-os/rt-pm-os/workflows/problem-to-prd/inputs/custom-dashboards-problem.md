# Problem: Custom Dashboards for Reporting

## Problem Statement

Agency owners and operations managers are spending hours every week exporting data to Excel to build custom dashboards because Luma's built-in reports don't show the metrics they care about. This is the #1 most requested feature and a top NPS detractor.

## Evidence

### Feature Requests
From feature request backlog:
- **Custom Dashboards** — #1 most requested feature
  - 14 customers requested
  - 3 lost deals citing this gap
  - Quote: "I need to see project profitability, team utilization, and overdue tasks on one screen. Your reports make me click around."
  - Quote: "We export to Excel every week to build our own dashboard. That's ridiculous."
  - Business impact: HIGH — frequent NPS detractor, lost deal driver
  - Effort estimate: Large (3-4 months)

### User Feedback
From user feedback collection:
- **"Reporting is too basic - I have to export to Excel for anything useful"** — 22 mentions, marked as CRITICAL
- **"Need custom dashboards - current reports don't match what I track"** — 14 mentions
- **"Would love project profitability reports"** — 8 mentions
- NPS Detractor theme: Reporting inadequacy

### Current Metrics
From product overview:
- NPS: 42 (target: 50) — BELOW TARGET
- Support tickets/user/month: 0.8 (target: 0.5) — ABOVE TARGET
- Reporting is consistently mentioned as reason for churn

### User Personas Affected
- **Alex (Agency Owner)** — Pain point: "I have to check five different places to understand what's going on"
  - Needs: Business health visibility (profitability, utilization, risk)
  - Frequency: 2-3x/week dashboard check
  - Quote: "I need tools that give me confidence without requiring me to micromanage"

- **Jordan (PM)** — Pain point: "I spend 5+ hours/week just updating spreadsheets and sending status emails"
  - Needs: Operational dashboards (project status, team workload, blockers)
  - Frequency: Daily (6-8 hrs/day in Luma)
  - Quote: "I love my job when I'm actually managing projects. I hate my job when I'm just updating tools."

## Who Experiences This Problem?

**Primary:** Agency Owners (like Alex) — 340 customers
- Use dashboards for business decisions
- Need executive-level visibility
- High willingness to pay for this

**Secondary:** Operations Managers and Senior PMs — ~500 users
- Build dashboards for leadership
- Power users who need customization
- Currently exporting to Excel/Tableau/Looker

## Why Solve It Now?

1. **Lost deals** — 3 deals lost explicitly citing this gap (revenue impact: ~$100K ARR)
2. **Top NPS detractor** — Reporting inadequacy affects retention (all cohorts below target)
3. **Strategic priority** — "Move Upmarket" requires enterprise reporting capabilities
4. **Competitive parity** — Monday.com, Teamwork, Float all have custom dashboards
5. **Expansion revenue** — Natural upsell to Business tier ($59/seat vs $29/seat)

## Current Workaround

Users are:
- Exporting data to Excel weekly (time-consuming, error-prone)
- Using external BI tools (Looker, Tableau) — added cost + complexity
- Building custom reports via API (technical users only)
- Checking multiple pages in Luma to piece together insights

This workaround:
- Takes 2-5 hours/week per user
- Doesn't scale as data grows
- Increases likelihood of decisions based on stale data
- Creates frustration and churn risk

## Constraints

- **Engineering bandwidth:** Large effort (3-4 months)
- **Design complexity:** Dashboard builder UX is hard to get right
- **Performance:** Custom queries could impact database performance
- **Timeline:** Ideally Q3 2026 to address before enterprise push
- **Technical debt:** Current reporting system is basic, may need rearchitecture
- **Pricing:** Should this be Business-tier only or available to Pro?
