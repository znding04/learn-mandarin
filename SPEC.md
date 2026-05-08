# Learn Mandarin — Free Open-Source Chinese Learning for ABC Kids

> **Status:** Research (Day 2 of 7 — Content & Curriculum) | Deployed at: learn.ljding.app/mandarin (future)

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

## 4. Technical Stack (TBD)

- **Frontend:** Vue 3 + Vite + Cloudflare Pages
- **Backend:** TBD (Supabase? Firebase? Cloudflare Workers + D1?)
- **Content:** HSK 3.0 vocabulary from GitHub datasets + heritage speaker curriculum additions
- **Auth:** Parent-managed accounts (COPPA compliance critical for kids)
- **Payments:** Subscription (monthly/annual)

### Technical Decisions (Research Day 2)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Stroke animation** | `hanzi-writer` + `hanzi-writer-data` | 10k+ chars, MIT license, Vue compatible |
| **SRS algorithm** | FSRS.js (WASM) | More accurate than SM-2, JS-native |
| **HSK vocabulary** | `chngyy/hsk-data` (GitHub) | Clean JSON, HSK 1-6, pinyin + translations |
| **TTS (v1)** | Web Speech API | Free, browser-native, no API key |
| **Character set** | Simplified Chinese | ABC kids in US mostly learn Simplified |
| **Pinyin display** | Toggle mode (show/hide) | Heritage learners vary in need |

## 5. Business Model

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | Limited lessons, ads, basic tracking |
| Premium | ~$10–15/mo | Full curriculum, no ads, progress reports |
| Family | ~$20/mo | 2–3 kids, parent dashboard |

## 6. Open Questions

1. ~~Mobile-first or web-first?~~ → **Web-first** (Vue 3 + Cloudflare Pages)
2. Live teacher component or fully self-paced? → **Self-paced** (free, open-source model)
3. ~~How do we source/license Chinese content legally?~~ → **HSK vocab from GitHub (open), stories/content created in-house or CC-licensed**
4. COPPA compliance — how to handle under-13 accounts? → Needs legal review
5. ~~What makes us meaningfully different from LingoAce?~~ → **Free + open-source + heritage-learner-first design**
6. How do we handle multiple Chinese dialects/accents? → **Mandarin only (for now), tone neutral**
7. **NEW — Pinyin strategy:** Show Pinyin always vs. hide it once mastered? → Toggle mode recommended
8. **NEW — Daily lesson structure:** Fixed path vs. adaptive? → Heritage placement test → adaptive
9. **NEW — Gamification scope v1:** Just streaks/XP or full Duolingo-style hearts/lives?

## 7. Research Progress

| Day | Focus | Status |
|-----|-------|--------|
| 1 | Competitive Landscape | ✅ Complete |
| 2 | Content & Curriculum | ✅ Complete (this session) |
| 3–4 | Technical Architecture | ⏳ Next |
| 5–6 | Gamification & Engagement | ⏳ Planned |
| 7 | Open-Source Landscape | ⏳ Planned |

## 8. Next Steps (Revised)

- [ ] Complete technical architecture research (Days 3–4)
- [ ] Define v1 feature scope (MVP list)
- [ ] Decide on gamification mechanics (streaks only or full Duolingo-style?)
- [ ] Create heritage learner placement test questions
- [ ] Sketch v1 user flows (onboarding → placement → daily learning)