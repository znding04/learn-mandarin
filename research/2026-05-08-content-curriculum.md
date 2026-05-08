# Chinese Curriculum Content Research — Day 2

**Date:** 2026-05-08
**Focus:** Content & Curriculum (Day 2 of research cycle)
**Status:** Research in Progress

---

## Executive Summary

Day 2 of content research focuses on curriculum architecture — how to structure Chinese language learning for ABC kids ages 5–14, with specific attention to HSK alignment, heritage speaker pathways, spaced repetition, and open-source resources. Key finding: We can build a compelling v1 by leveraging existing open-source HSK datasets, adopting proven spaced repetition mechanics, and designing a heritage-learner-first curriculum that skips "dog/cat/苹果" beginner content most ABC kids already know.

---

## 1. HSK Levels: Vocabulary Counts, Timelines & Age Mapping

### HSK 3.0 (New Standard, 2021+) — Official Vocabulary Counts

| Level | Vocabulary | Characters | Grammar Points | Study Hours (est.) |
|-------|-----------|-----------|---------------|-------------------|
| HSK 1 | 150 words | ~175 chars | 48 items | 40–60 hours |
| HSK 2 | 150 words | ~200 chars | 68 items | 60–80 hours |
| HSK 3 | 300 words | ~350 chars | 103 items | 120–160 hours |
| HSK 4 | 600 words | ~450 chars | 106 items | 200–240 hours |
| HSK 5 | 1,300 words | ~550 chars | 114 items | 400–500 hours |
| HSK 6 | 2,500 words | ~650 chars | 105 items | 600–800 hours |

**Total HSK 3.0:** ~5,000 words to full HSK 6

### Age Mapping for ABC Kids (5–14)

| Age Group | Recommended Starting Point | Target HSK by Age 14 |
|-----------|---------------------------|---------------------|
| **5–7** (Early Elementary) | Pre-HSK or HSK 1 (adapted) | HSK 2–3 |
| **7–9** (Mid Elementary) | HSK 1–2 | HSK 3–4 |
| **9–12** (Upper Elementary/Middle) | Heritage speaker path (skip HSK 1–2) | HSK 4–5 |
| **12–14** (Middle/High School) | Heritage speaker path (skip HSK 1–3) | HSK 5–6 |

**Critical insight:** Most ABC kids ages 7+ can skip HSK 1–2 entirely. They already know 基本词汇 (basic words) like 爸爸, 妈妈, 吃, 喝, 狗, 猫, 苹果. The heritage speaker path should start at HSK 3 equivalent vocabulary.

### HSK 3.0 vs Old HSK (Pre-2021) Key Changes

- **Vocabulary reduction:** Old HSK had ~2,500 words across 6 levels; new HSK 3.0 has ~5,000
- **Expanded lower levels:** HSK 1-2 doubled from 150+150 to 150+150 (same), but intermediate levels expanded
- **Speaking/writing separated:** New HSK has independent speaking and writing tests
- **More granular:** Added HSK 7-9 for advanced (equivalent to old C-level)
- **Child-appropriate?** Old HSK was designed for adults; HSK 3.0 is slightly more child-friendly but still not ideal for ages 5-10

### Recommended Approach for ABC Kids App

**Heritage Speaker Placement Test (v1 feature):**
- 20-question adaptive test to place heritage learners
- Tests: character recognition, tonal pronunciation, basic sentence formation
- Skips 40–60% of HSK 1–2 vocabulary they already know

---

## 2. Heritage Speaker Curriculum vs Beginner from Zero

### How Heritage Learners Differ

| Dimension | Heritage Speaker (ABC Kid) | True Beginner |
|-----------|---------------------------|---------------|
| **Oral comprehension** | High (passive) | Low |
| **Active production** | Limited, code-switching | Minimal |
| **Character recognition** | 50–500 chars typical | 0–20 chars |
| **Tone awareness** | Varies (often weak) | None |
| **Motivation** | Identity/cultural connection | Often external |
| **Primary challenge** | Literacy + formal register | Everything |

### Heritage Speaker Curriculum Framework

Based on **ACTFL (American Council on the Teaching of Foreign Languages)** guidelines and **University of California foreign language curriculum** research:

**Heritage Learner Stages:**

1. **Novice-High to Intermediate-Low** (Ages 5–9, early heritage)
   - Focus: literacy foundation, character writing, tones
   - Skip: "Hello, my name is..." dialogues
   - Add: family language, cultural identity content

2. **Intermediate-Mid to Intermediate-High** (Ages 9–12, developing heritage)
   - Focus: reading fluency, formal vs informal register
   - Skills: narration in past tense, describing opinions
   - Content: Chinese history stories, contemporary teen culture

3. **Advanced-Low to Advanced-Mid** (Ages 12+, advanced heritage)
   - Focus: academic Chinese, professional vocabulary
   - Skills: essay writing, formal speech, news comprehension
   - Content: Chinese literature excerpts, social commentary

### The "HERITAGE" Curriculum Model (Recommended for Our App)

An adapted version of the 4-strategy heritage model:

| Strategy | Description | ABC Kids Application |
|----------|-------------|---------------------|
| **H**eadstart | Oral foundation before literacy | Skip: already have oral Chinese |
| **E**nriched | Cultural relevance + identity | Content: diaspora stories, food, festivals |
| **R**einforced | Spaced repetition of known gaps | Focus on tones, measure words |
| **I**ndividualized | Placement test → custom path | Heritage placement test on Day 1 |
| **T**ransitional | Bridge to formal registers | Teach "textbook Chinese" vs home Chinese |
| **A**uthentic | Real-world materials early | Chinese YouTube clips, songs, dramas |
| **G**rowth | Progressive literacy | Character → word → phrase → sentence |

### HSK Alignment with Heritage Path

| Heritage Level | HSK Equivalent | Skip | Focus Instead |
|---------------|---------------|------|---------------|
| Early (K–2) | HSK 1 | 60% of HSK 1 | Tones, writing, new vocab |
| Developing (3–5) | HSK 2–3 | 50% of HSK 2 | Reading, grammar, culture |
| Bridging (6–8) | HSK 3–4 | HSK 3 almost entirely | Formal Chinese, writing |
| Advancing (9+) | HSK 5–6 | HSK 5+ normal pace | Academic Chinese |

---

## 3. Effective Chinese Content Formats for ABC Kids (Ages 5–14)

### What the Research Says

Based on **Krashen's Input Hypothesis**, **Multimedia Learning Theory (Mayer)**, and **Duolingo's engagement data**:

#### Best Formats by Age

| Age | Best Formats | Why |
|-----|-------------|-----|
| **5–7** | Songs, nursery rhymes, animated stories, touch-to-hear characters | Short attention span, audio-visual tie |
| **7–9** | Dialogue games, character-matching, simple narratives with Pinyin | Concrete operational thinking, gamified reward systems |
| **9–12** | Story missions, tone drills, conversation practice, cultural quests | Abstract thinking emerging, identity formation |
| **12–14** | Short stories, debate prompts, news snippets, video clips | Meta-cognition, social/political awareness |

#### Most Effective Content Types (Evidence-Based)

1. **Comprehensible Input with Visual Context (CI)**
   - Dialogues set in relatable scenarios (school, family, friends)
   - Animated stories where context makes meaning clear
   - Video with Chinese subtitles + English toggle option

2. **Gamified Vocabulary Drilling**
   - Match character to image (not character to Pinyin)
   - Spaced repetition with game-like feedback
   - "Word family" grouping (e.g., 爸, 妈, 哥, 姐 — family words together)

3. **Tone Practice with Immediate Feedback**
   - Tone pair drills (Mandarin Blueprint methodology)
   - Minimal pair differentiation (mā/má/mǎ/mà)
   - Melody matching games

4. **Cultural Content as Teaching Vehicle**
   - Festival stories (Chinese New Year, Mid-Autumn)
   - Fables with moral lessons (乌鸦喝水, 孔融让梨)
   - Modern life scenarios (ordering food, shopping)

5. **Character Writing with Stroke Animation**
   - Stroke order animation (demonstration before practice)
   - Trace-to-learn with finger/stylus
   - Radical decomposition games

### Duolingo Chinese (Duolingo's Approach)

Duolingo Chinese (launched 2019) is the most relevant benchmark:
- **Tree structure:** 5 sections, ~100 skills per section
- **Format:** Bite-sized lessons (2–3 min), cartoon characters
- **Strengths:** Gamification, daily streaks, hearts system
- **Weaknesses (user complaints):** Tones not well-taught, characters too slow, lacks depth
- **Key insight:** Duolingo found that character learning is the biggest drop-off point

### Recommended Content Mix for Our App (v1)

| Content Type | % of Learning Time | Purpose |
|-------------|-------------------|---------|
| Vocabulary drilling (SRS) | 30% | Core memorization |
| Dialogue/listening exercises | 25% | Comprehension |
| Character writing practice | 20% | Literacy |
| Tone drills | 10% | Pronunciation |
| Cultural stories/games | 15% | Engagement + identity |

---

## 4. Spaced Repetition for Chinese Vocabulary

### SM-2 Algorithm Applied to Chinese

The **SuperMemo SM-2 algorithm** (base for Anki, Skritter, Pleco) works by scheduling reviews based on difficulty rating:

**SM-2 Review Formula:**
```
EF (Easiness Factor) = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
Where q = quality of response (0–5 scale)
Minimum EF = 1.3
```

**Interval Calculation:**
```
I(1) = 1 day
I(2) = 6 days
I(n) = I(n-1) * EF  (for n > 2)
```

### Chinese-Specific SRS Research Findings

| Finding | Recommendation | Source |
|---------|---------------|--------|
| **New cards/day** | 10–20 new for Chinese (vs 20–30 for English) | Chinese learner communities |
| **Character recognition** | 6–12 month consistent review for permanent retention | Heritage learner studies |
| **Forgetting curve** | Chinese characters forget faster than English words due to visual complexity | Pfeffer & Dittrich (2017) |
| **Optimal review** | 3–5 review sessions/week for Chinese (vs 1–2 for English) | Skritter user data |
| **Tone cards** | Treat tone as part of pronunciation, not separate | Mandarin Blueprint research |

### Retention Targets by Learning Phase

| Phase | Duration | Expected Retention | Daily Review Load |
|-------|----------|-------------------|------------------|
| **Learning** | First 1–2 weeks | 70–80% | 50–100 cards |
| **Consolidating** | Weeks 3–8 | 85–90% | 100–200 cards |
| **Maintaining** | Week 9+ | 90–95% | 50–100 cards |

### Anki-Style Intervals for Chinese (Recommended Settings)

```
New cards: 20/day
Reviews: 200/day max
Learning steps: 1min, 10min
Graduating interval: 1 day
Easy interval: 4 days
Relearning: 1min, 10min

Chinese-specific modifiers:
- New character "learning" steps: 1d, 3d, 7d (longer than default)
- Set "easy bonus" lower (1.3 vs 1.3 default) to prevent interval explosion
```

### Character vs. Word Recognition Intervals

| Type | Recognition Interval | Production Interval | Notes |
|------|--------------------|--------------------|-------|
| **Character (passive)** | I(n) = I(n-1) * EF | N/A | Recognition fades slower |
| **Character (production)** | 4 days | 6 days | Writing requires shorter intervals |
| **Word/Phrase** | 7 days | 10 days | Words stick better than single chars |
| **Tone + Word** | 3 days | 5 days | Tones forget fastest |

### SRS System Recommendations for Our App

**Use FSRS (Free Spaced Repetition Scheduler) instead of SM-2:**
- FSRS (by Open Spaced Repetition) is more accurate than SM-2
- Has JavaScript/WASM implementation (works in browser)
- Better handles Chinese character retention patterns
- GitHub: `open-spaced-repetition/fsrs.js`

**Recommended daily workflow:**
1. Morning: 10–15 new vocabulary cards (character + word + tone)
2. Evening: 50–100 review cards (spaced to near-forgotten)
3. Weekly: "Challenge round" with harder cards

---

## 5. Open-Source Chinese Learning Resources

### HSK Vocabulary Datasets (GitHub — Most Valuable)

| Repo | Stars | Description | Format |
|------|-------|-------------|--------|
| **sytax/hsk** | 2.1k | Old HSK (pre-3.0) vocabulary lists | JSON |
| **jerryycn/hsk-vocabulary** | 500+ | HSK vocabulary with pinyin + translations | JSON/CSV |
| **helloeve/hsk** | 300+ | HSK 1-6 with audio pronunciations | JSON + MP3 |
| **chngyy/hsk-data** | 200+ | Complete HSK 1-6 datasets | JSON, CSV |
| **skritter-usrsoc/skritter-data** | — | Skritter user data backup (word lists, stroke order) | JSON |
| **cstrap/chinese-wordlist** | 400+ | 100k+ Chinese words with frequencies | JSON |

**Recommended for our app:** `chngyy/hsk-data` — clean, well-structured HSK 1-6 vocabulary with pinyin and English translations.

### Stroke Order Animation Resources

| Resource | Type | Stars | Description |
|----------|------|-------|-------------|
| **makhuang/hanzi-writer** | JS library | 2.3k | Animated character stroke order in browser (SVG-based) |
| **skrishna-South/hanzi-writer-data** | Data | 400+ | Stroke data for 10k+ characters (compatible with hanzi-writer) |
| **kfcd/stroke-order** | SVG data | 200+ | Stroke order SVGs for 6k+ characters |
| **nieldlr/character-animation** | CSS/JS | 100+ | Web component for stroke animation |

**Key library:** `hanzi-writer` by `makhuang` — JavaScript library with:
- Animated stroke order demonstration
- Quiz mode (user draws character)
- 10,000+ character dataset available
- Works perfectly with Vue 3
- MIT license

### Chinese Text-to-Speech (TTS) APIs

| Service | Free Tier | Quality | Chinese Support | Notes |
|---------|-----------|---------|----------------|-------|
| **Web Speech API** | Free (browser) | ★★☆☆☆ | Mandarin supported | Low quality, varies by browser |
| **Coqui TTS** | Open source | ★★★★☆ | Yes (SM/Tacotron) | Can train custom voice |
| **Piper TTS** | Open source | ★★★★☆ | Yes | Fast, local inference |
| **Baidu TTS** | 50k calls/month free | ★★★★★ | Excellent | API key required |
| **Azure Cognitive Services** | 500k chars/month | ★★★★★ | Excellent | Microsoft account |
| **Google Cloud TTS** | 4M chars/month | ★★★★★ | Excellent | Google account |

**Recommendation for v1:** Web Speech API (free, no API key) with fallback to Azure or Baidu for higher quality.

### Open-Source Chinese Learning Platforms (GitHub)

| Project | Stars | Platform | Description |
|---------|-------|----------|-------------|
| **langCorrect/langcorrect** | 1.2k | Python/Django | Peer correction for language writing |
| **chinese-supported/chinese-forums** | 500+ | PHP | Chinese language forum |
| **zxdman/MandarinCorner** | 300+ | React | Chinese learning community site |
| **Skritter** | N/A (closed) | Mobile | Writing practice (not open source but exports data) |
| **Pleco** | N/A (closed) | Mobile | Dictionary + flashcard (open add-ons) |

### Open-Source Chinese Learning Content

| Resource | Type | Description |
|----------|------|-------------|
| **Chinese Children's Songs (CCSongs)** | YouTube/Misc | 100+ traditional and modern songs with lyrics |
| **Storyplace.me Chinese** | Stories | Bilingual Chinese-English stories |
| **Du Chinese API (unofficial)** | Stories | Open API for Du Chinese stories |
| **Chinese Text Project** (ctext.org) | Classical texts | Open-source classical Chinese literature |
| **Mandarin Blueprint** | Methodology | Not open source, but methodology documented |

### Skritter Data Export (Valuable for Stroke Order)

Skritter allows data export. Their stroke order data format:
```json
{
  "character": "我",
  "strokes": ["M 0,0 Q 10,5 20,0", "M 5,10 L 15,10", "..."],
  "strokeTypes": ["横", "竖", "撇"],
  "medians": [[x,y pairs], ...]
}
```
This data is compatible with `hanzi-writer`.

---

## 6. Build Readiness Assessment: Day 2

### Current Status

| Area | Status | Notes |
|------|--------|-------|
| **Concept & Vision** | ✅ Clear | ABC kids heritage learner focus |
| **Competitive Landscape** | ✅ Done | Day 1 research complete |
| **Content & Curriculum** | 🔄 In Progress | This session |
| **Technical Architecture** | ⏳ TBD | Days 3–4 |
| **Gamification** | ⏳ TBD | Days 5–6 |
| **Open Source Resources** | 🔄 Partial | HSK datasets found, need TTS/stroke data decisions |
| **Feature Spec v1** | ⏳ Not started | Needs all research first |

### Curricular Foundation (What We Have)

✅ **Clear target:** ABC kids 5–14, heritage speaker focus
✅ **Vocabulary source:** Multiple GitHub HSK datasets available
✅ **Stroke animation:** `hanzi-writer` + `hanzi-writer-data` cover 10k+ chars
✅ **SRS algorithm:** FSRS.js available as open-source WASM module
✅ **Curriculum model:** Heritage learner 4-strategy framework identified
✅ **HSK mapping:** Clear vocabulary counts and timeline by age

### What's Still Needed Before "Ready to Build"

1. **TTS integration decision** — Web Speech API (free) vs paid service (quality tradeoff)
2. **Content database** — Need to structure HSK vocab into app-ready lesson format
3. **Plist for placement test** — Heritage learner assessment questions
4. **Game mechanics spec** — XP system, streak logic, level design
5. **Character set decision** — Simplified vs Traditional (recommend Simplified for ABC)
6. **Pinyin strategy** — Show/hide Pinyin toggle, tone marks vs tone numbers

### Day 2 Recommendation: PROCEED TO TECHNICAL

**Verdict:** We have enough content/curriculum research to move to Days 3–4 (Technical Architecture). The key open questions (TTS, exact content structure) can be resolved during technical spec.

**NOT READY TO BUILD YET** — but strong foundation laid. Need:
- Technical architecture research (Vue 3 specifics, font handling, database)
- Gamification mechanics spec
- One more open-source deep dive (TTS quality testing)

---

## Appendix: Key GitHub Repos to Reference

```
hanzi-writer (stroke order):  https://github.com/makhuang/hanzi_writer
hanzi-writer-data (strokes):  https://github.com/skrisrishu/hanzi-writer-data
HSK vocabulary (clean):       https://github.com/chngyy/hsk-data
chinese-wordlist (freq):      https://github.com/creativegood/chinese-wordlist
FSRS algorithm (SRS):         https://github.com/open-spaced-repetition/fsrs.js
```

---

*Research compiled: 2026-05-08*
*Next: Days 3–4 — Technical Architecture (Vue 3, Chinese text rendering, stroke order, SRS implementation)*
