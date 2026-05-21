---
name: welcome
description: "Set up your Ryan Taylor PM Operating System. Automatically extracts company, product, personas, competitors, and goals from your website in 2-3 minutes. Use when: first time setup, onboarding, personalize context, getting started."
---

# Welcome to RT's PM Operating System

Set up your PM Operating System in 2-3 minutes. I'll extract company, product, personas, and competitors from your website, then help you set up your goals for strategic alignment.

## When to Use This Skill

- First time using mySecond after purchasing the Context Kit
- Personalizing your context files automatically
- Updating existing context with fresh website data
- Re-onboarding after major product changes

## How This Works

**Automation-first approach:**
1. Give me your website → I extract company, product, personas, competitors (10-15 seconds)
2. Review what I found → Approve or edit specific sections
3. Set up goals → Strategic narrative, business objectives, product goals (5 minutes)
4. (Optional) Enhance personas → Run `/persona-generator` for full Pragmatic Institute profiles
5. (Optional) Profile competitors → Run `/competitive-profile-builder` for DHM analysis
6. (Optional) Upload docs → Run `/enhance-context` to merge internal docs

**Fallback:** If no website or extraction fails, I'll ask questions (10-12 minutes)

## What You'll Get

By the end, you'll have 5 personalized context files:
- `context/company.md` — Mission, industry, business model
- `context/product.md` — Features, target users, metrics
- `context/personas.md` — User archetypes (basic or full behavioral profiles)
- `context/competitors.md` — Competitive landscape (list or DHM analysis)
- `context/goals.md` — Strategic narrative, business objectives, product goals

These files give every mySecond skill the context AND strategic alignment it needs to produce work tailored to YOUR business.

---

## Process

### Before We Start: Existing Context Check

**If you're running `/welcome` for the first time:**
→ Skip to Step 1

**If you're running `/welcome` again and already have context:**

I'll check if your context files have real data (not placeholders).

**If I find existing context:**
```
I see you already have context files with real data.

Want me to:
1. Overwrite with fresh website extraction? (loses current content)
2. Enhance your existing context with new data? (runs /enhance-context)
3. Cancel and exit?
```

**If you choose "enhance":** I'll guide you to run `/enhance-context` to add new insights without losing existing work.

**If you choose "overwrite":** We'll proceed with extraction below.

---

### Step 1: Get Your Website

**I'll ask:**
```
# Welcome to RT's PM Operating System 👋

I'll set up your PM Operating System in about 2-3 minutes. Your operating system works best when it has context about your company, personas, and landscape. I'll help you through that now.

Here's how this works:

1. Give me your company website → I'll extract company, product, personas, competitors
2. I'll show you what I found → You approve or correct
3. (Optional) Enhance with full personas and competitor profiles
4. (Optional) Upload docs for even more context

This is way faster than filling out forms. Most of the work is automatic.

Ready? What's your company website?
```

**You provide:** Your website URL (e.g., "acme.com" or "https://acme.com")

**If you don't have a website or want to skip:** Say "skip" or "no website" → I'll fall back to asking questions manually

---

### Step 2: Confirm Before Extracting

**I'll confirm:**
```
Got it — I'll extract from acme.com:
- Company info (mission, industry, business model)
- Product details (features, target users)
- Personas (inferred from messaging)
- Competitors (from comparison pages, if any)

This takes 10-15 seconds. Ready? (yes)
```

**You confirm:** yes

---

### Step 3: Extract and Show Results

**I'll extract using `/api/extract` and show you what I found:**

```
🔍 Extracting from acme.com...

[Processing... 10-15 seconds]

✅ Done! Here's what I found:

## Company
- Name: Acme Corp
- Mission: We help creative agencies plan projects without chaos
- Industry: B2B SaaS
- Business Model: Subscription (monthly/annual)

## Product
- Name: Acme Planner
- Description: Project planning tool for creative agencies. Helps avoid double-booking designers.
- Target Users: Creative directors at 10-50 person agencies
- Core Features:
  - Resource planning calendar
  - Capacity tracking
  - Project timelines
  - Team availability
  - Budget tracking

## Personas (inferred from website)
1. Alex the Agency Owner
   - Goals: Plan 5+ projects at once without overbooking team

2. Jordan the Creative Director
   - Goals: See real-time team capacity and project status

## Competitors (inferred from website)
- Monday.com
- Teamwork
- Float

---

Is this your company? (yes / no)
```

**You confirm this is your company:** yes

```
Look good? You can:
- Say "yes" → I'll save this to your context files
- Say "edit personas" → I'll build full persona profiles
- Say "edit competitors" → I'll build DHM competitor profiles
- Say "edit [section]" → I'll ask questions for that section
- Say "redo all" → I'll ask questions for everything
```

---

### Step 4: Save or Enhance

**Option A: You say "yes"**
→ I save all extracted data to context files
→ Skip to Step 7 (optional file upload)

**Option B: You say "edit personas"**
→ Go to Step 5

**Option C: You say "edit competitors"**
→ Go to Step 6

**Option D: You say "edit company" or "edit product"**
→ I ask questions for just that section, then save

**Option E: You say "redo all"**
→ I ask questions for all sections (manual mode)

---

### Step 5: Enhance Personas (Optional)

**If you said "edit personas":**

```
Got it — let's build full Pragmatic Institute personas with use scenarios, JTBD, and behavioral patterns.

Do you have any of these?
- Interview transcripts
- Survey results
- User research docs
- Product usage analytics

You can paste them here or say "skip" and I'll use what I extracted from the website.
```

**If you provide research:**
```
Great! Now run this command to create full persona profiles:

/persona-generator

This will analyze your research + extracted context and create behavioral personas with evidence.
Takes about 30-45 seconds. Run it now and let me know when it's done.
```

**If you skip:**
```
No problem! To create persona profiles from the extracted context, run:

/persona-generator

This will create inferred personas marked as "needs validation with research."
Takes about 30 seconds. Run it now and let me know when it's done.
```

**After user runs `/persona-generator`:**
✅ Confirm personas are updated and continue

---

### Step 6: Enhance Competitors (Optional)

**If you said "edit competitors":**

```
Got it — let's build full DHM profiles (Delight, Hard-to-Copy, Margin) + battlecards.

I found these competitors: Monday.com, Teamwork, Float

Which 3-4 should I profile?

You can:
- List specific ones (e.g., "Monday, Asana")
- Say "use what you found" → I'll profile Monday, Teamwork, Float
- Say "all" → I'll profile everything I found
- Say "skip" → Keep basic list only
```

**You tell me which competitors to profile**

**Then:**
```
Perfect! To create full DHM profiles + battlecards for [competitors], run:

/competitive-profile-builder [competitor name]

Run it once for each competitor. Each one takes 30-60 seconds.

This will create:
- DHM analysis (what delights customers, their moats, business model)
- SWOT comparison (their strengths/weaknesses vs your opportunities/threats)
- Sales battlecard (talking points for competitive deals)

Start with the first one and let me know when you're done with all of them.
```

**After user runs profiles for all competitors:**
✅ Confirm competitors are profiled and continue

---

### Step 7: Set Up Your Goals (Recommended)

**After context is saved:**

```
✅ Context files updated!

One more thing — let's set up your goals.md file. This is your strategic foundation that makes every skill work better.

Want to set up goals now? (yes / skip for now)
```

**If yes:**

```
Perfect! I'll help you create a goals.md file in about 5 minutes.

Do you have any strategy docs? (pitch deck, OKR doc, roadmap, quarterly plan)
- Say "yes" and drop them here → I'll extract your goals automatically
- Say "no" → I'll ask you 5 quick questions
```

#### If User Uploads Strategy Docs

**Step 1: Read all uploaded files**

Use the Read tool to read each uploaded document. Combine the contents.

**Step 2: Call the extraction API**

Send the document contents to `/api/extract-goals`:

```typescript
fetch('/api/extract-goals', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    documents: [doc1Content, doc2Content, ...] // Array of document text
  })
})
```

The API will return:
- `extraction`: Structured data with all extracted fields
- `markdown`: Pre-formatted goals.md content
- `summary`: Human-readable summary to show user
- `confidence`: Confidence levels (high/medium/low) for each section

**Step 3: Show extracted content to user**

```
[Use the summary from API response]

Great! I found:
- Vision: [extracted.vision.text]
- Current state: [extracted.current_state.text]
- Business objectives: [count] found
- Product goals: [count] found

Here's your goals.md:

[Display the markdown from API response]

**Confidence levels:**
- Strategic Narrative: [confidence.narrative]
- Business Objectives: [confidence.objectives]
- Product Goals: [confidence.goals]

Where I'm less confident, I've marked with ⚠️.

Should I save this? (yes / edit first)
```

- If **"yes"** → Save to `context/goals.md` and continue
- If **"edit first"** → Ask what to change, update, then save

#### If User Says "No" (No Strategy Docs)

Ask 5 quick questions for **Strategic Narrative** (required):

```
No problem! Let's fill in your strategic narrative. Answer these 5 prompts — keep it simple, 1 sentence each:

1. **Our vision is...** (Where are we going?)
2. **Currently we are...** (Where are we now?)
3. **By the end of [Q/year], we will...** (Next milestone?)
4. **And drive the business...** (Business impact?)
5. **This will empower customers to...** (Customer outcome?)
```

Wait for answers, then structure into narrative:

```
Perfect! Here's your strategic narrative:

> Our vision is [sentence 1].
> Currently we are [sentence 2].
> By the end of [timeframe], [sentence 3].
> And drive the business [sentence 4].
> This will empower customers to [sentence 5].

Want to add business objectives and product goals too? (yes / skip for now)
```

**If yes:**

```
Great! What are your top 2-3 business objectives for this quarter/year?

Examples:
- Increase MRR from $50K to $100K
- Reduce churn from 5% to 3%
- Expand to enterprise segment
```

Wait for response, then ask:

```
Perfect! Now, what are the 2-3 product goals that drive those business objectives?

Format: [Goal] → drives [Business Objective]

Example:
- Launch onboarding flow → drives activation (reduces churn)
- Add API access → drives enterprise expansion
```

Wait for response, then generate and save goals.md.

**If skip:**

```
No problem! I'll save your strategic narrative and you can add objectives/goals later.
```

Save goals.md with just the Strategic Narrative section filled in, rest as placeholders.

#### Goals Template

```markdown
# Goals

## Strategic Narrative

[5-sentence narrative from extraction or questions]

---

## Current Focus (Q[X] 202X)

### Business Objectives
[If provided, list 2-3 objectives with metrics]
[If NOT provided: placeholder "1. [Define your business objective] — measured by [metric]"]

### Product Goals (How We Drive Business)
[If provided, list 2-3 goals connected to objectives]
[If NOT provided: placeholder "1. [Define your product goal] → drives [Business Objective]"]

### What We're NOT Doing
[If extracted from docs, list items]
[If NOT provided: placeholder "- [Add items as priorities become clear]"]

---

## Open Questions
- [ ]
```

**After saving:**

```
✅ goals.md saved!

This file makes skills strategically aligned:
- /roadmap-builder will align features to product goals
- /prioritization-engine will score backlog against goals
- /okr-coach will validate OKRs against existing goals

You can update goals.md anytime by editing the file directly.
```

**If user says "skip for now":**

```
No problem! You can set up goals.md later. Just remember:
- Goals make skills more strategic (features align to objectives)
- Takes 5-10 minutes whenever you're ready
- Edit context/goals.md directly, or I can help you fill it in later

Ready to continue?
```

---

### Step 8: Optional File Upload Enhancement

**After context is saved:**

```
✅ Context files updated!

Want to make these even better? Upload any internal docs you have:
- PRDs, pitch decks, strategy docs
- User interview transcripts
- Competitive research, win/loss analysis
- Roadmap docs, OKRs

You'll run /enhance-context to extract insights and merge them into your context files.

Have docs to upload? (yes / no)
```

**If yes:**

```
Great! Drop your files into these folders:
- context/inputs/ — Company & product docs
- discovery/inputs/ — User research
- strategy/inputs/ — Competitive intel

When you're ready, say "process files" and I'll enhance your context.
```

**You drop files and say "ready":**
```
Perfect! Now run this command to process your files:

/enhance-context

This will:
- Scan all input folders (context/inputs/, discovery/inputs/, strategy/inputs/)
- Extract insights from each file
- Merge insights into your context files
- Show summary of what was added

Run it now and let me know when it's done. Takes 1-2 minutes depending on file count.
```

**After user runs `/enhance-context`:**
✅ Confirm context is enhanced and continue

**If no:**
```
No problem! You can always run /enhance-context later to add more detail.
```

---

### Step 9: Success & Next Steps

```
🎉 Setup complete!

Your PM Operating System is ready. Here's what I created:

📁 context/company.md
   - Acme Corp
   - Mission: Help creative agencies plan projects without chaos
   - B2B SaaS | Subscription

📁 context/product.md
   - Acme Planner
   - 5 core features
   - Target: Creative directors at 10-50 person agencies

📁 context/personas.md
   - Alex the Agency Owner (full behavioral profile)
   - Jordan the Creative Director (full behavioral profile)

📁 context/competitors.md
   - Monday.com (DHM analysis + battlecard)
   - Teamwork (DHM analysis + battlecard)
   - Float (DHM analysis + battlecard)

📁 context/goals.md
   - Strategic narrative (vision → milestone → impact)
   - Business objectives with metrics
   - Product goals connected to business

---

What to do next:

1️⃣ [RECOMMENDED] Enhance personas
   Run /persona-generator to build full Pragmatic Institute behavioral profiles
   (especially if you have interview transcripts or research)

2️⃣ [RECOMMENDED] Profile competitors
   Run /competitive-profile-builder [competitor name] to build a full DHM analysis + battlecard
   for any competitor

3️⃣ Upload your docs
   Drop PRDs, research, or strategy docs into local folders:
   - context/inputs/
   - discovery/inputs/
   - strategy/inputs/
   Then run /enhance-context to merge insights

4️⃣ Run a skill
   Try /prd-generator, /roadmap-builder, or /user-story-writer
   Skills will automatically use your context AND goals

5️⃣ Keep context fresh
   - Edit context files directly anytime (including goals.md)
   - Run /welcome again to refresh from your website

---

How this works better than ChatGPT:

✅ Context always loaded — No re-explaining every session
✅ Goals always referenced — Features align to objectives automatically
✅ Framework-backed — Skills use Marty Cagan, Teresa Torres,
   Gibson Biddle methods
✅ Auto-updating — /enhance-context keeps context fresh
✅ Reusable — Same skills, infinite use cases

Questions? Just ask! Otherwise, try running a skill. 🚀
```

---

## Manual Mode (Fallback)

If website extraction fails or you don't have a website, I'll ask questions instead:

### Company Questions (4)
1. Company name
2. Mission (1-2 sentences)
3. Industry (e.g., B2B SaaS, marketplace, consumer app)
4. Business model (e.g., subscription, usage-based, freemium)

### Product Questions (6)
1. Product name
2. What it does (1-2 sentences)
3. Target users (who is it for?)
4. Core features (3-5 key capabilities)
5. Key metrics (2-3 that matter most)
6. Roadmap (optional — what are you building next?)

### Personas (Optional)
For each persona (1-2):
- Name (e.g., "Alex the Agency Owner")
- Role (e.g., Creative Director)
- Goals (what they're trying to achieve)
- Pain points (what frustrates them)

### Competitors (Optional)
For each competitor (2-5):
- Company name
- Differentiator (optional — what makes them different?)

**Time:** 5-7 minutes for manual mode

---

## Error Handling

**If context files don't exist:**
```
Hmm, I can't find your context files.

Make sure you're in the folder where you unzipped your Context Kit.
I'm looking for:
- context/company.md
- context/product.md
- context/personas.md
- context/competitors.md

Want to try again? (yes / no)
```

**If extraction API fails:**
```
I couldn't extract from that website. This happens if:
- The site blocks automated access
- The URL is incorrect
- The site doesn't have enough public info

No problem — I can ask you questions instead. Ready? (yes / no)
```

**If extraction returns incomplete data:**
```
I extracted from the website but didn't find much info on [section].

Want me to:
1. Ask you questions for [section]?
2. Skip [section] for now?
```

---

## File Locations

Your context files will be saved at:
- `context/company.md`
- `context/product.md`
- `context/personas.md`
- `context/competitors.md`
- `context/goals.md`

**Input folders for enhancement:**
- `context/inputs/` — Company & product docs
- `discovery/inputs/` — User research
- `strategy/inputs/` — Competitive intel

These files must stay in the `context/` folder for skills to find them.

---

## Tips for Best Results

**For extraction:**
- Use your main website URL (homepage is fine)
- Make sure your website has public info about company, product, users
- If extraction misses something, you can edit that section manually

**For personas:**
- Upload real research if you have it (interview transcripts, surveys)
- If no research, extracted personas will be marked as "inferred, needs validation"
- You can always enhance later with `/persona-generator`

**For competitors:**
- Choose 3-4 top competitors for DHM profiling
- Don't profile everyone — focus on who you compete against most
- DHM profiles take 30-60 seconds each

**For file upload:**
- Name files descriptively (e.g., "interview-sarah-pm.md" not "notes.txt")
- Organize by folder (company docs → `context/inputs/`, research → `discovery/inputs/`)
- Run `/enhance-context` regularly to keep context fresh

**You can always edit later:**
- Context files are just markdown files
- Edit them directly anytime
- Run `/welcome` again to refresh with new website data
- Run `/enhance-context` to add insights from new docs

---

## Framework Reference

This skill orchestrates multiple frameworks:
- **Website Extraction:** `/api/extract` (Anthropic Claude Haiku)
- **Persona Generation:** Pragmatic Institute personas + Jobs-to-be-Done
- **Competitive Analysis:** Gibson Biddle's DHM Model (Delight, Hard-to-Copy, Margin)
- **Context Enhancement:** Atomic Research methodology (source attribution, insight synthesis)
- **Goal Setting:** OKR methodology (John Doerr), Strategic Narrative (Amazon), Product Strategy Stack (Marty Cagan)

---

## Time Savings

**Automation mode:** 2-3 minutes (website extraction)
**Manual mode:** 5-7 minutes (question-based)
**With goals setup:** 7-12 minutes (context + goals)
**With full enhancements:** 10-15 minutes (personas + competitors + docs + goals)

**vs. Manual setup:** 3-4 hours to create context files + goals from scratch
**vs. ChatGPT:** 10-15 minutes lost per session re-explaining context + priorities

---

Ready to get started? Reply "yes" when you're ready, or ask me any questions first.
