# Learn Mandarin — Free Open-Source Chinese Learning for ABC Kids

> **Status:** BUILD COMPLETE — Manual Cloudflare credential setup required to enable GitHub Actions auto-deploy. Deploy script fixed (2026-05-25) to clean Workers-style wrangler.json before Pages deploy.
>
> **Build Decision:** All 7 days of research complete. No hard blockers found. Proceed to implementation.

## Build Progress

- **Phase 1 Complete (2026-05-10):** Vue 3 + Vite project setup, landing page, lessons browser, HSK1 first lesson vocab (10 words). Router with Home and Lessons pages. Cloudflare Pages deployment config. Mobile-first CSS with Noto Sans SC.
- **Phase 2 Complete (2026-05-10):** Flashcard SRS system (SM-2), 30 vocab words across 3 lessons, study page with flip animation, pinyin toggle, Easy/Medium/Hard rating.
- **Phase 3 Complete (2026-05-11):** Gamification UI (XP + streak display on home, nav, lessons pages), Web Speech API TTS pronunciation, mobile polish, Cloudflare Pages deploy.

**In our app ecosystem:** learn-some-ai (AI learning) + learn-mandarin (Chinese learning)

## 1. Concept & Vision

An engaging, gamified Chinese learning app designed specifically for ABC (American Born Chinese) kids ages 5–14 who want to connect with their heritage language. The app should feel fun, modern, and culturally relevant — not like homework. Think: Duolingo meets a Chinese cultural experience.

Target: ABC kids who speak some Chinese at home but can't read/write fluently, and kids with zero background who parents want to expose early.

## 2. Competitive Landscape

### Key Competitors
- **LingoAce** — Live 1-on-1 instruction, 7,000+ teachers, 22M+ lessons, ages 3–15, ~$30–60/class
- **Blingo (比邻中文趣学星球)** — Gamified WeChat mini program, younger kids (4–12), uses games/stickers
- **ChinesePod** — More adult-focused, dialogue-based
- **Skritter** — Writing practice focused, more serious tone
- **Du Chinese** — Short stories with annotations, intermediate learners
- **Harbingot / PandaTree** — 1-on-1 tutoring services

### Market Gaps Observed
- ABC teens (13+) are underserved — most apps target young kids
- No strong "heritage speaker" curriculum that acknowledges existing oral fluency
- Parent involvement features are weak in most competitors
- Cultural content (stories, festivals, pop culture) underused as teaching vehicles
- Short-form video content for teens barely explored

## 3. Core Feature Ideas

### Must Have (v1)
- [ ] User accounts with age-appropriate profiles (kid vs parent dashboard)
- [ ] HSK-aligned lesson content with heritage speaker adjustments
- [ ] Gamification: streaks, XP, levels, badges, unlockable rewards
- [ ] Vocabulary deck system (spaced repetition)
- [ ] Character writing practice (stroke order guidance)
- [ ] Short dialogue/listening exercises with tones
- [ ] Progress tracking for parents

### Should Have
- [ ] Chinese cultural content (festival stories, myths, modern life)
- [ ] Speaking practice with tone feedback
- [ ] Leveled reading (simple texts with annotations)
- [ ] Weekly / daily lesson structure
- [ ] Social features (friend leaderboards, class groups)

### Nice to Have
- [ ] AI conversation partner for speaking practice
- [ ] Short video clips from Chinese TV/drama (culturally relevant)
- [ ] User-generated content (kids write stories)
- [ ] Integration with Chinese school curricula tracking

## 4. Technical Stack (Confirmed)

- **Frontend:** Vue 3 + Vite + Cloudflare Pages (same stack as learn-some-ai)
- **Backend:** Self-contained (localStorage for v1, Cloudflare KV for user data in v2)
- **Content:** HSK 3.0 vocabulary from GitHub datasets + heritage speaker curriculum additions
- **Auth:** Parent-managed accounts (COPPA compliance critical for kids)
- **Payments:** Subscription (monthly/annual) — defer to v2

### Technical Decisions (Research Days 2-4)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Stroke animation** | `chanind/hanzi-writer` (⭐4,762) | 10k+ chars, MIT, TypeScript, Vue compatible |
| **SRS algorithm** | FSRS.js (`open-spaced-repetition`) | More accurate than SM-2, JS/WASM, MIT |
| **HSK vocabulary** | `drkameleon/complete-hsk-vocabulary` (⭐215) | HSK 2.0/3.0 complete, MIT |
| **TTS (v1)** | Web Speech API | Free, browser-native, no API key |
| **Character set** | Simplified Chinese | ABC kids in US mostly learn Simplified |
| **Pinyin display** | Toggle mode (show/hide) | Heritage learners vary in need |
| **Data persistence** | localStorage (v1), Cloudflare KV (v2) | Simple start, scalable later |
| **Font loading** | Google Fonts Noto Sans SC | Free, font-display:swap, ~1-2MB |

## 6. Open Questions (RESOLVED)

1. ~~Mobile-first or web-first?~~ → **Web-first** (Vue 3 + Cloudflare Pages)
2. Live teacher component or fully self-paced? → **Self-paced** (free, open-source model)
3. ~~How do we source/license Chinese content legally?~~ → **HSK vocab from GitHub (MIT), stories created in-house (CC-licensed)**
4. COPPA compliance — how to handle under-13 accounts? → Parent email verification + no personal data collection beyond name/age
5. ~~What makes us meaningfully different from LingoAce?~~ → **Free + open-source + heritage-learner-first design**
6. How do we handle multiple Chinese dialects/accents? → **Mandarin only (for now), PRC standard for tones**
7. ~~Pinyin strategy~~ → **Toggle mode (show/hide)** — heritage learners vary in need
8. ~~Daily lesson structure~~ → **Heritage placement test → adaptive path**
9. ~~Gamification scope v1~~ → **Streaks + XP + levels + badges. NO lives/hearts** (too punishing for Chinese)
10. **NEW — Hearts/lives for Chinese?** → **NO.** Chinese characters are harder than European vocabulary. Duolingo-style lives cause frustration and churn. Use streak-freeze earned via achievements instead.

## 6b. v1 Feature List (Final)

### MVP (Must Have)
- [ ] Heritage placement test (20 Q, adaptive, places into HSK level or bypasses to W3+)
- [ ] User profiles (name, age, avatar, parent-managed settings)
- [ ] Daily lesson path (5–10 min, HSK-aligned or heritage path)
- [ ] Vocabulary SRS deck (FSRS.js, 15 new cards/day, 100 reviews/day max)
- [ ] Character writing practice (hanzi-writer, stroke animation + quiz)
- [ ] Tone drill mini-game (tone identification, 4 difficulty levels)
- [ ] XP system (+5/correct, +20 perfect lesson, +50 daily goal)
- [ ] Streak tracking with earned freeze items
- [ ] Level progression (6 HSK-aligned worlds, unlocking)
- [ ] Achievement badges (learning + streak + heritage milestones)
- [ ] Parent dashboard (child progress, XP, streak in English)
- [ ] Pinyin toggle (show/hide on all content)
- [ ] LocalStorage persistence (v1 only)

### Should Have (v1.1)
- [ ] Short dialogue/listening exercises (audio + text + Q)
- [ ] Cultural stories with vocabulary highlight
- [ ] Friend leaderboard (within friend group only)

## 7. Research Progress

| Day | Focus | Status |
|-----|-------|--------|
| 1 | Competitive Landscape | ✅ Complete |
| 2 | Content & Curriculum | ✅ Complete |
| 3–4 | Technical Architecture | ✅ Complete |
| 5–6 | Gamification & Engagement | ✅ Complete |
| 7 | Open-Source Landscape | ✅ Complete |

## 7b. Gamification Decisions (Final)

### XP System
- Correct answer: +5 XP | Perfect lesson bonus: +20 XP | Daily goal met: +50 XP
- 7-day streak burst: +50 XP | 30-day streak: +150 XP
- Daily targets: 50–75 XP (ages 5–7), 100–150 XP (ages 8–10), 150–200 XP (ages 11–14)

### Streaks
- **NO lives/hearts system** — too punishing for Chinese (harder than European languages)
- Streak freeze earned via achievements (not purchasable in free app)
- Streak repair available within 4 hours of break

### Heritage Learner UX
- Placement test bypasses HSK 1–2 content (ABC kids already know basic vocabulary)
- Pinyin toggle always available
- Age-appropriate tone instruction (not condescending)
- Parent dashboard in English

## 8. Next Steps (Revised)

- [x] Complete gamification & engagement research (Days 5–6)
- [x] Complete open-source landscape research (Day 7)
- [x] Resolve gamification mechanics (streaks, XP, lives/hearts decision)
- [ ] **CREATE SKELETON PROJECT** — `npm create vue@latest`, install dependencies
- [ ] Set up Cloudflare Pages project (following learn-some-ai pattern)
- [ ] Implement heritage placement test (20 questions)
- [ ] Build core lesson flow (placement → lesson card → review)
- [ ] Integrate hanzi-writer for stroke practice
- [ ] Integrate FSRS.js for vocabulary SRS
- [ ] Build XP/streak/achievement system
- [ ] Build parent dashboard
- [ ] Deploy to Cloudflare Pages
- [ ] **OPEN BETA** — invite first 10 families