---
name: tov-dezy
description: Tone-of-voice profile and analysis pipeline for Instagram creator Dezy Jariwala (@dezyjariwala), a repeat SkinInspired collaborator. Use when writing or reviewing anything in her voice — reel scripts, briefs, captions, hooks for her SkinInspired collabs — or when asked to analyse, refresh, or complete her TOV profile. Triggers: "/tov-dezy", "Dezy's tone", "script for Dezy", "brief for dezyjariwala", "does this sound like Dezy".
---

# TOV — Dezy Jariwala (@dezyjariwala)

Two jobs, in order:

1. **If the Voice Profile below is still `PENDING`** → run the *Analysis
   Pipeline* first (needs network access to Instagram/Apify — see
   "Environment check"). Fill in the profile, flip the status, and update
   this file.
2. **If the Voice Profile is `VERIFIED`** → use it to write or review
   content in her voice. Never invent voice traits that are not in the
   profile; the provisional signals are hypotheses, not facts.

For SkinInspired deliverables, always cross-check the finished copy with the
`skininspired-positioning-checker` skill — her voice and the brand's
positioning both have to hold.

## Who she is (verified from SkinInspired records, Aug 2026)

- Dezy Jariwala — Surat, Gujarat. Micro creator: ~3.5K followers (Feb 2026)
  grown to ~5K (Jul 2026); average reel views ~5–6K.
- Professional background: marketing strategist / digital-marketing creator
  (LinkedIn positioning: personal branding, content writing, "Create,
  captivate, convert!"). Content skews **educational, working-professional,
  concept-led** rather than lifestyle-aesthetic.
- Written register (from her emails): polished, formal, warm professional
  English.
- Repeat SkinInspired collaborator (5 reels live, 1 nail-serum collab
  paused as of Jul 2026). Rates: ₹5,000–7,000 per non-collab reel with
  1 month ad rights.

### SkinInspired collab history (seed reels for analysis)

| Live date | SKU | Concept note | Reel | Code |
|---|---|---|---|---|
| 27 Feb 2026 | RNC (Retinol Night Cream) | — | instagram.com/reel/DVRBciNkoGC | INFRNC208 |
| 03 Mar 2026 | INSS (InviShield Sunscreen Spray) | "Holi concept", educational | instagram.com/reel/DVaxI3bCDms | — |
| 27 Mar 2026 | RNC | — | instagram.com/reels/DWYR0HRAViS | INFRNC280 |
| 01 May 2026 | UASM (Underarm Serum Mist) | "corporate" | instagram.com/reel/DXzYaf3oc7v | INFUASM009 |
| 29 Jun 2026 | iREVIVE | "Always on the go" | instagram.com/reel/DaLWrQjo4hR | INFIREVIVE033 |

Ad-side evidence of what her delivery does: UASM creative hook rate 16.8%,
iREVIVE 13.6% — her openings hold attention well above the account's typical
UGC; conversion (ROAS 0.43–1.01) is middling, so her strength is **top-of-funnel
hooks and credible explanation**, not hard-sell CTAs.

## Voice Profile — status: **PENDING** (not yet analysed from her reels)

> Do NOT present the signals below as her confirmed tone of voice. They are
> evidence-based hypotheses from collab records, her emails, and her LinkedIn
> presence. The confirmed profile comes only from transcribing and analysing
> 10–12 of her actual reels (pipeline below).

Provisional signals to test against the reels:

- Educational explainer stance — teaches rather than performs; likely
  "informed friend/strategist" persona, not "influencer bestie".
- Concept-first structure — builds reels around a scenario (festival tie-in,
  office/corporate life, on-the-go routine) rather than a plain review.
- Working-professional framing — content addresses busy professional women.
- Strong front-loaded hooks (the 13–17% ad hook rates).
- Polished English as base register; expect Hindi/Hinglish code-switching
  typical of Surat/Gujarat micro creators — ratio unknown until transcribed.
- Warm-formal sign-offs and courteous, structured phrasing in writing.

## Analysis Pipeline (run once, then update this file)

**Environment check first:** this needs Instagram content. A claude.ai/code
remote container blocks Instagram, scraper mirrors, and api.apify.com at the
egress proxy — the pipeline cannot run there. Run it in the local Cowork /
Claude Code environment where `~/.apify_token` exists (same setup as the
`creator-vetting` skill). If no such environment is available, use the
manual path (Option B).

### Option A — scrape + transcribe (preferred)

1. Pull the latest 12 reels for `dezyjariwala` via Apify
   (`apify/instagram-reel-scraper` or the actor the `creator-vetting`
   skill's cache already uses — reuse its reel cache if one exists; it
   already contains captions and video URLs). Cost is trivial
   (~$0.03 at the measured $0.0024/reel).
2. For each reel capture: caption text, posting date, video URL, views.
3. Transcribe the spoken audio of each reel (whisper locally, or download
   the mp4s and use an available media-transcription tool). On-screen text
   matters too if the transcript is thin — note it from the video.
4. Prefer a mix: ≥6 organic/non-SkinInspired reels + the 5 SkinInspired
   reels above, so the profile captures her *own* voice, not our briefs
   reflected back.

### Option B — manual (no scraping possible)

Ask the user for 10–12 reel links plus transcripts/captions (they can copy
captions from the app and auto-generated captions from the reel player), or
raw draft videos from the WhatsApp thread with her. Do not proceed on fewer
than 8 reels without flagging the sample is thin.

### The analysis — score every reel on these 10 dimensions, then synthesise

1. **Hook pattern** — first 3 seconds: question / bold claim / scenario
   drop-in / on-screen text? Collect the exact opening lines.
2. **Language mix** — English : Hindi : Gujarati ratio; where she
   code-switches (emphasis? punchlines? technical terms always English?).
3. **Sentence rhythm** — short punchy vs flowing; pause placement; how she
   lands emphasis.
4. **Persona & stance** — expert, strategist, friend, tester? How she
   handles authority ("studies say" vs "I tried this").
5. **Emotional register & humor** — dry, self-deprecating, earnest,
   none? Frequency and placement.
6. **Vocabulary fingerprint** — recurring phrases, fillers, signature
   words, how she names products/problems.
7. **Structure** — map each reel: hook → context → demo/explanation →
   payoff → CTA. Note which beats she skips.
8. **Caption style vs spoken style** — caption length, emoji density,
   hashtag habits, whether captions add info or restate.
9. **CTA style** — direct ask, soft suggestion, or none; exact wording.
10. **Negative space** — what she never does (no dancing? no trends? no
    hard discount pushes?). This is the fastest authenticity check.

### Writing the profile back

Replace the *Voice Profile* section above with the synthesised profile
(keep the 10 dimensions as subheads, quote 2–3 verbatim lines per dimension
as evidence), change the status line to
`**VERIFIED** — analysed <N> reels, <date>, links listed below`, list the
analysed reel URLs, and keep the provisional-signals block only if some
hypotheses were overturned (say which). Commit the update.

## Using the profile (once VERIFIED)

- **Writing for her**: draft in her dimensions — her hook pattern, her
  code-switch points, her CTA softness. Read the draft aloud mentally in
  30–40s reel time (her SkinInspired deliverable length).
- **Reviewing her drafts**: check against the fingerprint and negative
  space; flag lines that sound like a brand brief rather than her.
- **Briefing her**: give concept + key claims + mandatory mentions, not
  scripted lines — her strength is explaining in her own structure
  (the concept-led reels are her best hook-rate performers).
