# Problem: Resource Planning is Broken

## Problem Statement

Our PMs are spending hours every week trying to figure out who's available and manually rebalancing workload. By the time they discover conflicts, deadlines are already at risk. The resource view is confusing and doesn't give the visibility needed to plan effectively.

## Evidence

### User Feedback
From user feedback collection:
- **"Resource view is confusing - I can't see the big picture"** — 18 mentions, marked as CRITICAL
- **"I only find out about conflicts when someone misses a deadline"** — 9 mentions
- **"Can't easily see who's available next week"** — 11 mentions
- **"Need to see utilization by person, not just by project"** — 7 mentions

### Feature Requests
From feature request backlog:
- **Drag-and-Drop Resource Planning** — 11 customers requested, 2 lost deals
  - Quote: "I want to grab a task and drag it to a different week. Basic stuff."
  - Quote: "Float's resource view is so much more intuitive. Can you copy that?"
- **Workload Forecasting** — 5 customers requested, 1 lost deal
  - Quote: "I need to see if we'll be overloaded in 6 weeks so I can hire or turn down work."

### Current Metrics
From product overview:
- Support tickets/user/month: 0.8 (target: 0.5) — ABOVE TARGET
- NPS: 42 (target: 50) — BELOW TARGET
- This is a top NPS detractor theme

### User Personas Affected
- **Jordan (PM)** — Pain point: "I find out someone is double-booked only when deadlines slip"
- **Alex (Agency Owner)** — Pain point: "I don't know if we need to hire or if people are underutilized"

## Who Experiences This Problem?

**Primary:** Project Managers (like Jordan) — 340 customers × ~2 PMs per agency = ~680 PMs
**Secondary:** Agency Owners (like Alex) — 340 customers, use this 2-3x/week for capacity planning

## Why Solve It Now?

1. **Competitive threat** — Float is winning deals based on superior resource view (2 lost deals in feature requests)
2. **Retention risk** — Resource planning is top NPS detractor, affecting retention metrics (all below target)
3. **Strategic priority** — "Win the Agency Vertical" requires best-in-class agency features
4. **Revenue opportunity** — Lost 2 deals citing this gap

## Current Workaround

PMs manually check utilization, edit tasks one by one, and over-communicate to compensate for tool gaps. This is:
- Time-consuming (5+ hours/week on status updates)
- Error-prone (conflicts discovered too late)
- Doesn't scale (gets worse as agency grows)

## Constraints

- Engineering bandwidth: Medium priority (not top 3 but urgent)
- Design: Needs significant UX work
- Timeline: Ideally Q2 to address before losing more deals
- Technical: Current resource view is confusing, needs rethink not just iteration
