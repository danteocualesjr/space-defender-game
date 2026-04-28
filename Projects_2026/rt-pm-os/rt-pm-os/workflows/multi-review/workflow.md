# Multi-Perspective Review Workflow

**Workflow Pack:** Multi-Review
**Tagline:** "7 stakeholder perspectives. 15 minutes. Done."

---

## Workflow Instructions

When the user asks to run this workflow, follow these steps:

### Step 0: Read Context

First, read the user's context files to ground stakeholder perspectives in their real organization:

1. `/context/company.md` — Team structure, org priorities, known stakeholders
2. `/context/product.md` — Current product state, roadmap, constraints
3. `/context/personas.md` — User context for Customer Voice reviewer
4. `/context/competitors.md` — Competitive landscape for Sales perspective

**Tell the user what you found:**
> "I found your org structure in company.md — your CTO is [name] and they care about [priority]. I'll use this to ground the Engineering review. I also found [X] personas in personas.md for the Customer Voice review."

If context files are thin or missing, say:
> "I don't have much org context. I'll use generic stakeholder perspectives, but you can add more to company.md for more tailored reviews."

### Step 1: Get the Document

Ask the user to provide the document to review:
> "What document should I review? (PRD, spec, proposal, one-pager, etc.)"

Accept:
- Pasted text
- File upload
- Path to file in their workspace

Confirm what you're reviewing:
> "I'm reviewing: [document name/title]. This is [X] words. Ready to proceed?"

### Step 2: Understand Review Goals (Optional)

Ask:
> "Are there specific concerns you want me to focus on? Or should I do a comprehensive review?"

This helps prioritize what each reviewer focuses on.

### Step 3: Spawn Agent Team

Create a team with 7 teammates working in parallel:

**Team structure:**
- **Coordinator (you):** Orchestrates review and synthesizes
- **Teammate 1:** Engineering Reviewer
- **Teammate 2:** Design Reviewer
- **Teammate 3:** Executive Reviewer
- **Teammate 4:** Legal/Compliance Reviewer
- **Teammate 5:** Customer Voice Reviewer
- **Teammate 6:** Devil's Advocate
- **Teammate 7:** Sales Reviewer

**For each reviewer, provide:**
- The full document
- Relevant context files (company.md, product.md, personas.md, competitors.md)
- Their specific perspective instructions (see below)

### Reviewer Instructions

#### Engineering Reviewer
**Perspective:** Technical feasibility, architecture, maintainability

Review for:
- Technical feasibility (can we build this?)
- Architecture implications (how does it fit?)
- Performance/scalability concerns
- Security implications
- Technical debt tradeoffs
- Dependencies on other systems
- Maintenance burden
- Edge cases and failure modes

**Use from context:**
- Tech stack from product.md
- Engineering team size from company.md
- Current technical constraints

**Output:**
- 🟢 Supportive / 🟡 Concerns / 🔴 Blocker
- What you like
- Concerns and risks
- Questions to prepare for
- Technical suggestions

#### Design Reviewer
**Perspective:** User experience, usability, design feasibility

Review for:
- Usability (can users figure it out?)
- Consistency with existing UX patterns
- Accessibility considerations
- Mobile/responsive implications
- Visual design requirements
- Interaction complexity
- User research gaps
- Prototype/testing needs

**Use from context:**
- Current UX patterns from product.md
- User personas from personas.md

**Output:**
- 🟢 Supportive / 🟡 Concerns / 🔴 Blocker
- What you like
- Usability concerns
- Questions to prepare for
- Design suggestions

#### Executive Reviewer
**Perspective:** Strategy, ROI, resource allocation, business impact

Review for:
- Strategic alignment (does this fit our goals?)
- ROI and business case
- Resource requirements (is this the best use of time?)
- Opportunity cost (what are we NOT doing?)
- Market positioning
- Competitive implications
- Timeline feasibility
- Risk vs. reward

**Use from context:**
- Strategic priorities from company.md
- Current goals and constraints
- Competitive landscape from competitors.md

**Output:**
- 🟢 Supportive / 🟡 Concerns / 🔴 Blocker
- Strategic fit assessment
- ROI concerns
- Questions to prepare for
- Strategic recommendations

#### Legal/Compliance Reviewer
**Perspective:** Risk, compliance, legal implications, data privacy

Review for:
- Legal/regulatory compliance (GDPR, CCPA, etc.)
- Data privacy implications
- Terms of service updates needed
- Third-party vendor risks
- IP/licensing concerns
- User consent requirements
- Documentation/audit trail needs
- Liability exposure

**Use from context:**
- Industry/vertical from company.md (healthcare, finance, etc. have stricter rules)
- User data handling from product.md

**Output:**
- 🟢 Supportive / 🟡 Concerns / 🔴 Blocker
- Compliance requirements
- Risk areas
- Questions to prepare for
- Legal recommendations

#### Customer Voice Reviewer
**Perspective:** Customer/user needs, adoption, satisfaction

Review for:
- User value (will they want this?)
- Adoption likelihood (will they use it?)
- Onboarding complexity
- Support burden (new tickets expected?)
- Churn risk vs. retention benefit
- User confusion points
- Documentation needs
- Training requirements

**Use from context:**
- Personas from personas.md (review from their perspective)
- Current user pain points from product.md

**Output:**
- 🟢 Excited / 🟡 Lukewarm / 🔴 Resistant
- What users will love
- What users will struggle with
- Adoption concerns
- Customer Success perspective

#### Devil's Advocate
**Perspective:** Challenge assumptions, find failure scenarios, push back

Review for:
- Hidden assumptions (what are we taking for granted?)
- Potential failure scenarios (what could go wrong?)
- Blind spots (what haven't we considered?)
- Edge cases
- Unintended consequences
- "What if we're wrong?" scenarios
- Second-order effects
- The hard questions stakeholders will ask

**Use from context:**
- Past failures or challenges from company.md
- Known risks from product.md
- Competitive threats from competitors.md

**Output:**
- Critical questions
- Potential failure scenarios (with likelihood/impact)
- Blind spots identified
- Unintended consequences
- The hard questions to prepare for

#### Sales Reviewer
**Perspective:** Market fit, competitive differentiation, sales enablement

Review for:
- Sales pitch (how do we sell this?)
- Competitive differentiation (why us vs. them?)
- Target customer appeal
- Pricing/packaging implications
- Deal velocity impact (faster or slower sales?)
- Win/loss implications
- Sales enablement needs (decks, demos, FAQs)
- Customer objections to expect

**Use from context:**
- Competitive landscape from competitors.md
- Target market from company.md
- Sales motion from company.md

**Output:**
- 🟢 Supportive / 🟡 Concerns / 🔴 Blocker
- Sales value proposition
- Competitive concerns
- Questions to prepare for
- Sales recommendations

### Step 4: Coordinator Synthesis

Once all 7 reviews are complete, synthesize them:

**Look for:**
1. **Consensus** — Where do all perspectives align?
2. **Tensions** — Where do perspectives conflict? (e.g., Exec wants fast ship, Eng wants quality)
3. **Common questions** — What questions appear across multiple reviewers?
4. **Critical blockers** — Any 🔴 blockers that must be addressed?
5. **Priority issues** — What should be fixed before stakeholder review?

### Step 5: Generate Output

Create comprehensive review document (see Output Template below).

Save to:
`workflows/multi-review/outputs/review-[document-name]-[date].md`

---

## Output Template

```markdown
# Multi-Perspective Review: [Document Name]

**Review Date:** [Date]
**Document Type:** PRD / Spec / Proposal / One-Pager
**Status:** Draft Review

---

## Context

*What I found in your files:*
- **Org structure:** [From company.md — key stakeholders and their priorities]
- **Strategic priorities:** [From company.md — what leadership cares about]
- **Product context:** [From product.md — current state, roadmap, constraints]
- **User context:** [From personas.md — user needs that inform this review]
- **Competitive context:** [From competitors.md — market positioning]

---

## Review Summary

### Consensus
**Where everyone agrees:**
- [Point 1]
- [Point 2]
- [Point 3]

### Tensions
**Where perspectives conflict:**
| Issue | Perspective A | Perspective B | Resolution Needed |
|-------|---------------|---------------|-------------------|
| [Issue 1] | [View] | [Opposing view] | [Suggestion] |
| [Issue 2] | [View] | [Opposing view] | [Suggestion] |

### Critical Blockers
**Must address before proceeding:**
- [ ] [Blocker 1] — From: [Reviewer]
- [ ] [Blocker 2] — From: [Reviewer]

### Top Questions to Prepare For
**Questions stakeholders will ask in the actual review:**
1. [Question 1] — From: [Reviewer]
2. [Question 2] — From: [Reviewer]
3. [Question 3] — From: [Reviewer]

---

## Engineering Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

**Likes:**
- [Positive 1]
- [Positive 2]

**Concerns:**
- [Concern 1]
  - **Why this matters:** [Risk]
  - **Suggestion:** [Recommendation]

**Questions to Expect:**
- "[Question 1]"
- "[Question 2]"

**Technical Recommendations:**
- [Recommendation 1]
- [Recommendation 2]

---

## Design Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

**Likes:**
- [Positive 1]
- [Positive 2]

**Concerns:**
- [Concern 1]
  - **Why this matters:** [Usability impact]
  - **Suggestion:** [Recommendation]

**Questions to Expect:**
- "[Question 1]"
- "[Question 2]"

**UX Recommendations:**
- [Recommendation 1]
- [Recommendation 2]

---

## Executive Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

**Strategic Fit:**
- [Assessment of alignment with company priorities]

**ROI Concerns:**
- [Business case questions]

**Questions to Expect:**
- "[Question 1]"
- "[Question 2]"

**Strategic Recommendations:**
- [Recommendation 1]
- [Recommendation 2]

---

## Legal/Compliance Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

**Compliance Requirements:**
- [Requirement 1]
- [Requirement 2]

**Risk Areas:**
- [Risk 1]
  - **Mitigation:** [Suggestion]

**Questions to Expect:**
- "[Question 1]"
- "[Question 2]"

**Legal Recommendations:**
- [Recommendation 1]
- [Recommendation 2]

---

## Customer Voice Review

**Overall:** 🟢 Excited / 🟡 Lukewarm / 🔴 Resistant

**Based on personas:**
- [Persona 1]: [Their perspective]
- [Persona 2]: [Their perspective]

**What Users Will Love:**
- [Benefit 1]
- [Benefit 2]

**What Users Will Struggle With:**
- [Friction point 1]
  - **Mitigation:** [Suggestion]

**Adoption Assessment:**
- **Likelihood:** High / Medium / Low
- **Why:** [Reasoning based on persona needs]

**Support Burden:**
- New tickets expected: [Estimate]
- Documentation needed: [List]

---

## Devil's Advocate Review

**Critical Questions:**
1. [Assumption being challenged]
   - **Why this matters:** [Risk]
   - **What if you're wrong:** [Consequence]

**Potential Failure Scenarios:**
- **Scenario 1:** [What could fail]
  - Likelihood: High / Medium / Low
  - Impact: High / Medium / Low
  - Mitigation: [Suggestion]

**Blind Spots:**
- [Area you haven't considered]
- [Edge case you missed]

**Unintended Consequences:**
- [Second-order effect 1]
- [Second-order effect 2]

**The Hard Questions:**
- [Question stakeholder will ask]
- [Question you're avoiding]

---

## Sales Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

**Sales Value Proposition:**
- [How to pitch this to customers]

**Competitive Differentiation:**
- vs. [Competitor 1]: [Advantage/disadvantage]
- vs. [Competitor 2]: [Advantage/disadvantage]

**Concerns:**
- [Concern 1]
  - **Impact on deals:** [Assessment]
  - **Suggestion:** [Recommendation]

**Questions to Expect:**
- "[Question 1]"
- "[Question 2]"

**Sales Enablement Needs:**
- [Need 1]
- [Need 2]

---

## Synthesis

### Action Items Before Stakeholder Review
**Must address:**
- [ ] [Action 1] — Addresses: [Blocker/concern]
- [ ] [Action 2] — Addresses: [Blocker/concern]

**Should address:**
- [ ] [Action 3] — Improves: [Area]
- [ ] [Action 4] — Improves: [Area]

### Conflicting Priorities to Resolve
**Decision needed:**
1. [Conflict 1] — [Perspective A] vs. [Perspective B]
   - **Recommendation:** [Suggestion]

### Questions to Prepare Answers For
**High priority:**
1. [Question 1] — From: [Multiple reviewers]
2. [Question 2] — From: [Reviewer]

**Medium priority:**
3. [Question 3] — From: [Reviewer]
4. [Question 4] — From: [Reviewer]

### Overall Assessment
**Ready for stakeholder review?** Yes / No / With Changes

**Why:**
[1-2 sentence assessment of whether this document is ready for real stakeholder review, and what still needs work]

```

---

## Framework Reference

**Multi-perspective stakeholder analysis using agent teams**:
- Different roles have different priorities and blind spots
- Parallel review = 15 minutes vs. 2+ hours sequential
- Surface concerns and tensions before the real meeting
- Prepare answers in advance = better meetings

This workflow uses **Claude Code agent teams** to run 7 reviewers in parallel, drastically reducing review time while increasing coverage.

---

## Tips for Best Results

1. **Keep context files updated** — Reviewers ground their feedback in your real org, not generic personas
2. **Provide the full document** — Partial docs get partial feedback
3. **Note specific concerns** — If you're worried about executive pushback, tell me
4. **Prepare for conflicts** — The value is in surfacing tensions before the meeting
5. **Practice your answers** — Use the expected questions as a rehearsal script
6. **Update the doc** — Address critical blockers before the real review
7. **Use this iteratively** — Run review → fix issues → run again

---

## When NOT to Use This Workflow

❌ **Don't use when:**
- Document is still rough draft (get it to 70% first)
- You're just brainstorming (too early)
- Low-stakes document that doesn't need full review
- You don't have time to act on feedback

✅ **Use when:**
- High-stakes document (PRD, proposal, board deck)
- You need cross-functional alignment
- Real stakeholder review coming soon
- You want to anticipate and prepare for concerns

---

## Time Savings

**Traditional sequential review:**
- 7 stakeholders × 20 min review each = 2 hours 20 min
- Plus: Scheduling meetings, waiting for feedback
- Total: 2+ hours of PM time + days of calendar time

**Multi-review workflow:**
- 7 parallel reviews = 15 minutes
- Output ready immediately
- Total: 15 minutes

**ROI:** 89% time savings on stakeholder review prep
