# Learn Mandarin — Free Open-Source Chinese Learning for ABC Kids

> **Status:** Research phase | Deployed at: learn.ljding.app/mandarin (future)

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

- **Frontend:** React Native or Flutter (mobile-first, covers iOS/Android)
- **Backend:** TBD (Supabase? Firebase? Custom?)
- **Content:** HSK standards + heritage speaker curriculum additions
- **Auth:** Parent-managed accounts (COPPA compliance critical for kids)
- **Payments:** Subscription (monthly/annual)

## 5. Business Model

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | Limited lessons, ads, basic tracking |
| Premium | ~$10–15/mo | Full curriculum, no ads, progress reports |
| Family | ~$20/mo | 2–3 kids, parent dashboard |

## 6. Open Questions

1. Mobile-first or web-first? (WeChat mini program distribution?)
2. Live teacher component or fully self-paced?
3. How do we source/license Chinese content legally?
4. COPPA compliance — how to handle under-13 accounts?
5. What makes us meaningfully different from LingoAce?
6. How do we handle multiple Chinese dialects/accents?

## 7. Next Steps

- [ ] Review full research document
- [ ] Define target audience and age brackets
- [ ] Decide on tech stack
- [ ] Sketch v1 feature scope
- [ ] Create low-fidelity wireframes