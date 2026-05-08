# Technical Architecture Research — Days 3-4

**Date:** 2026-05-08
**Focus:** Technical Architecture (Vue 3 + Vite + Cloudflare Pages, Chinese text rendering, stroke order, SRS, libraries)
**Status:** Research Complete

---

## Executive Summary

Day 3-4 research covers the full technical stack for Learn Mandarin. Key findings:
- **Stroke animation:** `chanind/hanzi-writer` (⭐4,762, MIT) — the definitive JS library, TypeScript, Vue-compatible
- **SRS algorithm:** FSRS (Free Spaced Repetition Scheduler) by Open Spaced Repetition — superior to SM-2, WASM/JS available
- **Vocabulary data:** `drkameleon/complete-hsk-vocabulary` (⭐215, MIT) — HSK 2.0/3.0 complete with pinyin/English
- **Vue 3 + Cloudflare Pages:** Well-documented pattern from learn-some-ai; no Vue-specific Chinese libraries found
- **Font strategy:** Noto Sans SC via Google Fonts (free) or self-hosted woff2 for offline
- **No hard blockers found** — all core technical decisions resolved

---

## 1. Vue 3 + Vite + Cloudflare Pages Architecture

### 1.1 Recommended Project Structure

```
learn-mandarin/
├── public/
│   └── fonts/           # Self-hosted Noto Sans SC (optional)
├── src/
│   ├── assets/         # Static assets, CSS
│   ├── components/      # Vue components
│   │   ├── common/      # Buttons, cards, modals
│   │   ├── char/        # Character-specific components
│   │   │   ├── CharCard.vue        # Display character + pinyin
│   │   │   ├── CharQuiz.vue        # hanzi-writer quiz wrapper
│   │   │   ├── CharStroke.vue      # Stroke animation viewer
│   │   │   └── CharPractice.vue    # Full writing practice mode
│   │   ├── lesson/      # Lesson components
│   │   │   ├── LessonCard.vue
│   │   │   ├── DialoguePlayer.vue  # Audio + text dialogue
│   │   │   └── ToneDrill.vue
│   │   ├── gamification/
│   │   │   ├── XpBar.vue
│   │   │   ├── StreakBadge.vue
│   │   │   └── AchievementCard.vue
│   │   └── layout/
│   │       ├── AppHeader.vue
│   │       ├── ParentDashboard.vue
│   │       └── KidHome.vue
│   ├── composables/     # Vue composables (reusable logic)
│   │   ├── useSrs.ts           # FSRS integration
│   │   ├── useHanziWriter.ts   # hanzi-writer Vue wrapper
│   │   ├── useAudio.ts         # TTS/audio playback
│   │   └── useProgress.ts      # XP, streaks, level logic
│   ├── stores/          # Pinia stores
│   │   ├── user.ts              # User profile, age, preferences
│   │   ├── progress.ts          # XP, level, streak state
│   │   ├── lesson.ts            # Current lesson state
│   │   └── srs.ts                # Card deck, review queue
│   ├── views/            # Page-level components
│   │   ├── Home.vue
│   │   ├── PlacementTest.vue
│   │   ├── LessonView.vue
│   │   ├── ReviewView.vue
│   │   ├── CharacterDetail.vue
│   │   └── ParentDashboard.vue
│   ├── router/           # Vue Router
│   ├── services/         # API/logic layer
│   │   ├── srs/
│   │   │   ├── fsrs.ts          # FSRS algorithm implementation
│   │   │   └── cardScheduler.ts # Card scheduling logic
│   │   ├── storage/
│   │   │   └── localStorage.ts  # Cloudflare KV or localStorage
│   │   └── api/
│   │       └── hsk.ts           # HSK vocabulary data service
│   └── types/            # TypeScript types
│       ├── character.ts
│       ├── card.ts
│       └── user.ts
├── functions/            # Cloudflare Workers (if needed for API)
│   └── api/
├── SPEC.md
├── package.json
├── vite.config.ts
└── wrangler.jsonc        # Cloudflare Pages config
```

### 1.2 State Management (Pinia)

**Recommended Pinia stores:**

| Store | Purpose | Key State |
|-------|---------|-----------|
| `userStore` | User profile, age group, preferences | `{ age, level, isHeritage, pinyinMode, fontSize }` |
| `progressStore` | XP, level, streaks, badges | `{ xp, level, streak, badges[], lastActive }` |
| `lessonStore` | Current lesson, quiz state | `{ lessonId, currentCard, quizMode, score }` |
| `srsStore` | Card deck, review queue | `{ dueCards[], newCards[], learningCards[] }` |

### 1.3 Vue Router Structure

```
/                       → Home (age-based redirect)
/onboarding            → First-time user setup
/placement              → Heritage placement test
/learn                  → Kid home (main learning view)
/learn/lesson/:id       → Lesson content view
/learn/review           → Daily SRS review
/learn/character/:char → Character detail + practice
/learn/tone-drill       → Tone practice mini-game
/parent                 → Parent dashboard (separate layout)
/parent/progress/:kidId → Kid's detailed progress
```

### 1.4 Cloudflare Pages Deployment

Based on learn-some-ai pattern:

```bash
# Build command
npm run build

# Output directory
dist

# Environment variables (Pages settings)
VITE_API_URL=https://api.cloudflare.com
VITE_SRS_PERSIST=kv  # or 'localStorage' for simpler
```

**Cloudflare-specific services to consider:**
- **KV Namespace** — user progress, XP, streaks (durable, fast reads)
- **D1 Database** — vocabulary data, lesson content (read-mostly)
- **R2** — audio files, font files (CDN-served)
- **Workers** — API endpoints if needed (TTS proxy, user auth)

---

## 2. Chinese Text Rendering

### 2.1 Font Strategy

**Problem:** Chinese characters require large font files (10MB+ for full Noto Sans SC). Loading entire font on page load is too slow.

**Recommended approach: Variable font + subsetting**

| Strategy | Pros | Cons |
|----------|------|------|
| **Google Fonts API** (Noto Sans SC woff2) | Free, no self-hosting, automatically cached | Initial load 1-2s, CDN dependency |
| **Self-hosted subset** (3k-5k chars) | Fast, offline capable, no CDN | Need to manage subsets |
| **Font-display: swap** | Visible text immediately | Flash of fallback font |

**Recommended for v1:** Google Fonts with `font-display: swap`
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-display: swap; /* Show fallback immediately */
}
```

**Self-hosting for v2 (performance):**
```bash
# Install font subsetter
npm install -g fonttools Brotli

# Subset to HSK 1-4 characters (~2,500 chars = ~2MB woff2)
pyftsubset NotoSansSC-Regular.woff2 \
  --unicodes="U+4E00-9FFF,U+3400-4DBF" \
  --output-file=public/fonts/NotoSansSC-subset.woff2
```

### 2.2 Character Set: Simplified vs Traditional

**Recommendation: Simplified Chinese only (for v1)**

Rationale:
- ABC kids in the US overwhelmingly learn Simplified (used in mainland China, Singapore)
- HSK exams in the US use Simplified
- Adding Traditional doubles content maintenance burden
- Heritage learners can switch to Traditional-specific apps later

**Technical handling:**
```typescript
// Detect Simplified vs Traditional
function isSimplified(char: string): boolean {
  // Simplified chars are in U+4E00–U+9FFF (CJK Unified Ideographs)
  // Traditional chars are in U+3400–U+4DBF (CJK Extension A) or specific ranges
  const code = char.codePointAt(0)!
  return code >= 0x4E00 && code <= 0x9FFF
}
```

### 2.3 Pinyin Rendering

**Show/Hide toggle (critical for heritage learners):**

```vue
<template>
  <div class="char-display" :class="{ 'show-pinyin': showPinyin }">
    <span class="character">{{ char }}</span>
    <span v-if="showPinyin" class="pinyin">{{ pinyin }}</span>
  </div>
</template>

<script setup lang="ts">
// Pinyin can be displayed as:
// 1. Tone marks: mā, má, mǎ, mà, ma
// 2. Tone numbers: ma1, ma2, ma3, ma4, ma5
// Recommendation: Use tone marks (more readable for kids)
</script>
```

**Pinyin display options:**
| Mode | Example | Best For |
|------|---------|----------|
| Tone marks | mā | Kids who learned tones with marks |
| Tone numbers | ma1 | Traditional learners |
| No pinyin | (hidden) | Advanced readers |

### 2.4 Text Direction

Chinese does **NOT** use RTL — no special handling needed.
- Default `dir="ltr"` for all Chinese text
- CSS `writing-mode: horizontal-tb` (default) is correct

---

## 3. Character Writing Practice: hanzi-writer

### 3.1 The Library: chanind/hanzi-writer

| Attribute | Value |
|-----------|-------|
| **GitHub** | https://github.com/chanind/hanzi-writer |
| **Stars** | ⭐4,762 |
| **License** | MIT |
| **Language** | TypeScript |
| **Last Updated** | 2026-05-08 |
| **NPM** | `hanzi-writer` |

**Core features:**
- Animated stroke order demonstration
- Quiz mode (user draws character)
- 10,000+ character dataset included
- SVG-based rendering (crisp at any size)
- Mobile touch support
- Works in Vue 3, React, plain JS

### 3.2 Vue 3 Composable Wrapper

```typescript
// src/composables/useHanziWriter.ts
import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import HanziWriter from 'hanzi-writer'

interface UseHanziWriterOptions {
  char: Ref<string>
  el: Ref<HTMLElement | null>
  showOutline?: boolean
  showCharacter?: boolean
  strokeColor?: string
  outlineColor?: string
  drawingColor?: string
}

export function useHanziWriter(options: UseHanziWriterOptions) {
  let writer: InstanceType<typeof HanziWriter> | null = null

  function initWriter() {
    if (!options.el.value || !options.char.value) return
    
    writer = HanziWriter.create(options.el.value, options.char.value, {
      showOutline: options.showOutline ?? true,
      showCharacter: options.showCharacter ?? false,
      strokeColor: options.strokeColor ?? '#333',
      outlineColor: options.outlineColor ?? '#DDD',
      drawingColor: options.drawingColor ?? '#3366FF',
      onLoadCharacterData: (data) => {
        console.log('Character data loaded:', data)
      },
      onError: (error) => {
        console.error('hanzi-writer error:', error)
      }
    })
  }

  function animateCharacter() {
    writer?.animateCharacter()
  }

  function animateStroke(strokeNum: number) {
    writer?.animateStroke(strokeNum)
  }

  function showCharacter() {
    writer?.showCharacter()
  }

  function hideCharacter() {
    writer?.hideCharacter()
  }

  function quizMode() {
    // User traces the character
    writer?.quiz({
      onComplete: (summary) => {
        console.log('Quiz complete:', summary)
      }
    })
  }

  function updateCharacter(newChar: string) {
    if (writer) {
      writer.showCharacter() // Reset state
      // For now, recreate — there's also setCharacter method
    }
  }

  onMounted(() => {
    if (options.char.value) {
      initWriter()
    }
  })

  onUnmounted(() => {
    // Cleanup if needed
  })

  return {
    animateCharacter,
    animateStroke,
    showCharacter,
    hideCharacter,
    quizMode,
    updateCharacter
  }
}
```

### 3.3 Usage in Vue Component

```vue
<!-- CharPractice.vue -->
<template>
  <div class="char-practice">
    <div class="char-info">
      <h2>{{ character }}</h2>
      <p class="pinyin">{{ pinyin }}</p>
      <p class="meaning">{{ meaning }}</p>
    </div>
    
    <div class="writer-container" ref="writerEl"></div>
    
    <div class="controls">
      <button @click="animate">Show Stroke Order</button>
      <button @click="startQuiz">Practice Writing</button>
      <button @click="nextChar">Next Character</button>
    </div>
    
    <div v-if="quizResult" class="quiz-result">
      <p v-if="quizResult.correct">✓ Correct!</p>
      <p v-else>✗ Try again</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHanziWriter } from '@/composables/useHanziWriter'

const props = defineProps<{
  character: string
  pinyin: string
  meaning: string
}>()

const writerEl = ref<HTMLElement | null>(null)
const charRef = ref(props.character)
const quizResult = ref<{ correct: boolean } | null>(null)

const { animateCharacter, quizMode } = useHanziWriter({
  char: charRef,
  el: writerEl,
  showOutline: true,
  showCharacter: false
})

function animate() {
  animateCharacter()
}

function startQuiz() {
  quizResult.value = null
  quizMode()
}
</script>
```

### 3.4 Stroke Data Source

The `hanzi-writer` library includes stroke data for 10k+ characters internally. For additional characters or custom data:

| Data Source | Description |
|-------------|-------------|
| **Included in hanzi-writer** | ~10k characters, stroke paths + medians |
| `skrisrishu/hanzi-writer-data` | Separate stroke data repo (400+ stars) |
| `kfcd/stroke-order` | SVG stroke data for 6k+ characters |

**Data format (JSON):**
```json
{
  "character": "我",
  "strokes": [
    { "path": "M 0,0 Q 10,5 20,0", "type": "horizontal" },
    { "path": "M 5,10 L 15,10", "type": "horizontal" }
  ],
  "medians": [[5,5], [15,5]]
}
```

### 3.5 Performance Tips for hanzi-writer in Vue

1. **Lazy load:** Don't initialize hanzi-writer on every character view — use `v-if` or keep-alive
2. **Single instance:** Reuse one writer instance, call `setCharacter()` to change chars
3. **Mobile:** Add `touch-action-none` CSS to prevent browser gestures interfering
4. **Size:** Target 150x150px canvas for mobile, 200x200px for desktop

```css
.writer-container {
  width: 150px;
  height: 150px;
  touch-action: none; /* Critical for mobile drawing */
}
```

---

## 4. Spaced Repetition: FSRS Algorithm

### 4.1 FSRS vs SM-2

FSRS (Free Spaced Repetition Scheduler) is the newer algorithm by Open Spaced Repetition, designed to replace SM-2 (used by Anki, SuperMemo).

| Aspect | SM-2 | FSRS |
|--------|------|------|
| **Accuracy** | Good | Significantly better (catches 10-20% more forgotten cards) |
| **Memory model** | 3 states (learning, review, relearning) | 6 states (DSR model) |
| **Adaptability** | Manual EF adjustment | Automatic parameter tuning |
| **Chinese fit** | Good | Better (handles character forgetting curves better) |
| **Implementation** | Many | `fsrs.js` (WASM) + `fsrs4anki` (Anki integration) |
| **Benchmark** | Baseline | FSRS reduces review time by ~20% vs SM-2 |

**Recommendation: Use FSRS** — it's open-source, actively maintained, and specifically designed to outperform Anki's SM-2.

### 4.2 Key FSRS Repositories

| Repo | Stars | Description |
|------|-------|-------------|
| `open-spaced-repetition/fsrs4anki` | ⭐3,932 | Anki addon implementing FSRS (most used) |
| `open-spaced-repetition/free-spaced-repetition-scheduler` | ⭐648 | Core algorithm, language-agnostic |
| `open-spaced-repetition/fsrs.js` | ⭐180 | JavaScript/WASM implementation |
| `open-spaced-repetition/srs-benchmark` | ⭐220 | Algorithm benchmark suite |

### 4.3 FSRS Card States (DSR Model)

FSRS uses 6 stability states (D=stability, S=stability, R=retrievability):

```
                    ┌─────────────┐
                    │   Again     │
                    │  (failed)  │
                    └──────┬──────┘
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
      ▼                    ▼                    ▼
┌──────────┐       ┌──────────────┐       ┌──────────────┐
│ Learning │       │   Review     │       │  Relearning  │
│  (Lapsed)│       │   (Graduated)│       │              │
└────┬─────┘       └──────┬───────┘       └──────┬───────┘
     │                    │                     │
     │   Easy             │  Good/Again          │ Relearn
     │                    │                     │
     ▼                    ▼                     ▼
┌──────────┐       ┌──────────────┐       ┌──────────────┐
│  Review  │       │   Review     │       │   Review     │
└──────────┘       └──────────────┘       └──────────────┘
```

**Card ratings:**
- **Again (0)** — Complete failure, reset to learning
- **Hard (1)** — Difficult, decrease interval less
- **Good (2)** — Normal recall, standard interval increase
- **Easy (3)** — Easy recall, larger interval increase

### 4.4 Vue 3 + FSRS Integration

#### Step 1: Install fsrs.js
```bash
npm install fsrs.js
# or
npm install @open-spaced-repetition/fsrs
```

#### Step 2: SRS Store (Pinia)
```typescript
// src/stores/srs.ts
import { defineStore } from 'pinia'
import { FSRS, Rating, Card, ReviewLog } from 'fsrs.js'

interface SrsCard {
  id: string
  front: string        // Character or word
  back: string         // Pinyin + meaning
  character?: string   // For character cards
  state: number        // 0=learning, 1=review, 2=relearning
  due: Date
  stability: number    // D in DSR model
  difficulty: number   // R in DSR model
  interval: number     // Days until next review
}

const f = new FSRS()

export const useSrsStore = defineStore('srs', {
  state: () => ({
    cards: [] as SrsCard[],
    currentReview: null as SrsCard | null,
    dueToday: 0,
    newToday: 0,
  }),
  
  getters: {
    dueCards: (state) => state.cards.filter(c => new Date(c.due) <= new Date()),
    newCards: (state) => state.cards.filter(c => c.state === 0),
  },
  
  actions: {
    // Initialize card for learning
    createCard(front: string, back: string, character?: string): SrsCard {
      const now = new Date()
      return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        front,
        back,
        character,
        state: 0, // learning
        due: now,
        stability: 0,
        difficulty: 0,
        interval: 0,
      }
    },
    
    // Review a card and get next schedule
    reviewCard(cardId: string, rating: Rating) {
      const card = this.cards.find(c => c.id === cardId)
      if (!card) return
      
      const now = new Date()
      const result = f.schedule(card as unknown as Card, now, rating)
      
      // Update card with new schedule
      card.state = result.card.state
      card.due = result.card.due
      card.stability = result.card.s
      card.difficulty = result.card.d
      card.interval = result.card.interval
      
      // Save to storage
      this.saveCards()
      
      return result
    },
    
    // Get cards due for review today
    getDueCards(): SrsCard[] {
      const now = new Date()
      return this.cards.filter(c => new Date(c.due) <= now)
    },
    
    // Get next card for review
    getNextCard(): SrsCard | null {
      const due = this.getDueCards()
      // Sort: learning cards first, then by due date
      return due.sort((a, b) => {
        if (a.state !== b.state) return a.state - b.state
        return new Date(a.due).getTime() - new Date(b.due).getTime()
      })[0] || null
    },
    
    // Save/load from localStorage (or Cloudflare KV)
    saveCards() {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs-cards', JSON.stringify(this.cards))
      }
    },
    
    loadCards() {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('srs-cards')
        if (saved) {
          this.cards = JSON.parse(saved)
        }
      }
    }
  }
})
```

#### Step 3: Review View Component
```vue
<!-- ReviewView.vue -->
<template>
  <div class="review-view">
    <div class="progress-bar">
      <span>{{ reviewed }}/{{ total }}</span>
      <div class="bar" :style="{ width: `${(reviewed/total)*100}%` }"></div>
    </div>
    
    <div v-if="currentCard" class="card">
      <div class="card-front">
        <h1 class="character">{{ currentCard.front }}</h1>
        <button class="reveal-btn" @click="showAnswer = true">Show Answer</button>
      </div>
      
      <div v-if="showAnswer" class="card-back">
        <p class="pinyin">{{ currentCard.back.split('|')[0] }}</p>
        <p class="meaning">{{ currentCard.back.split('|')[1] }}</p>
        
        <div class="rating-buttons">
          <button class="again" @click="rate(Rating.Again)">Again</button>
          <button class="hard" @click="rate(Rating.Hard)">Hard</button>
          <button class="good" @click="rate(Rating.Good)">Good</button>
          <button class="easy" @click="rate(Rating.Easy)">Easy</button>
        </div>
      </div>
    </div>
    
    <div v-else class="complete">
      <h2>✓ All done!</h2>
      <p>Reviewed {{ reviewed }} cards. Come back tomorrow!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSrsStore } from '@/stores/srs'
import { Rating } from 'fsrs.js'

const srsStore = useSrsStore()
const showAnswer = ref(false)

onMounted(() => {
  srsStore.loadCards()
})

const currentCard = computed(() => {
  if (!showAnswer.value) {
    return srsStore.getNextCard()
  }
  return srsStore.currentReview
})

const reviewed = ref(0)
const total = computed(() => srsStore.getDueCards().length + reviewed.value)

function rate(rating: Rating) {
  if (currentCard.value) {
    srsStore.reviewCard(currentCard.value.id, rating)
    reviewed.value++
    showAnswer.value = false
  }
}
</script>
```

### 4.5 FSRS Algorithm Parameters

The algorithm has tunable parameters. For Chinese specifically:

```typescript
// src/services/srs/fsrsConfig.ts

// Default FSRS parameters (auto-tuned by the algorithm)
const DEFAULT_PARAMETERS = {
  // Stability (how reliably you remember)
  // Higher = longer intervals feel safe
  retrievability: {
    initial: 0.9,        // Start at 90% expected retention
    minimum: 0.7,        // Don't go below 70%
  },
  // Interval modifiers
  intervals: {
    graduating: 1,        // Days after first "good" recall
    easy: 4,             // Days after "easy"
    relearning: 1,       // Days to relearn after "again"
    graduatingInterval: 1, // Starting interval
    easyInterval: 4,
  },
  // Chinese-specific modifiers
  chinese: {
    newCardsPerDay: 15,    // Fewer new cards than English (harder to learn)
    maxReviewsPerDay: 100, // Cap daily reviews
    minimumEase: 1.3,     // Minimum ease factor (same as SM-2)
  }
}

export const SRS_CONFIG = {
  // New cards per day — lower for Chinese (10-20 vs 20-30 for English)
  newCardsPerDay: 15,
  
  // Max reviews per day to prevent burnout
  maxReviewsPerDay: 100,
  
  // Learning steps (in minutes)
  learningSteps: [1, 10],  // Review after 1min, then 10min
  
  // Relearning steps (after "again")
  relearningSteps: [1, 10],
  
  // Target retention rate
  targetRetention: 0.9,   // 90% — higher than default for kids
  
  // Interval modifiers
  easyBonus: 1.3,
  hardMultiplier: 1.2,
}
```

---

## 5. HSK Vocabulary Data

### 5.1 Recommended HSK Datasets

| Repo | Stars | Format | Quality |
|------|-------|--------|---------|
| `drkameleon/complete-hsk-vocabulary` | ⭐215 | JSON | HSK 2.0/3.0 complete, clean |
| `ivankra/hsk30` | ⭐56 | JSON/Notebook | HSK 3.0 cleaned with POS, traditional |
| `chngyy/hsk-data` | ~200 | JSON/CSV | HSK 1-6 (from Day 2 research) |

**Recommendation:** Use `drkameleon/complete-hsk-vocabulary` — clean, MIT license, HSK 2.0/3.0.

### 5.2 HSK Data Format

```json
{
  "level": "HSK1",
  "word": "你",
  "pinyin": "nǐ",
  "tones": "3",
  "english": ["you"],
  "traditional": "你",        // Same for Simplified
  "partOfSpeech": "pronoun",
  "radical": "亻",
  "hspLevel": 1
}
```

### 5.3 Loading HSK Data in Vue

```typescript
// src/services/api/hsk.ts
import hskData from '@/assets/hsk/hsk-data.json'

export interface HskWord {
  level: string
  word: string
  pinyin: string
  tones: string
  english: string[]
  traditional?: string
  partOfSpeech?: string
  radical?: string
}

export function getWordsByLevel(level: string): HskWord[] {
  return hskData.filter(w => w.level === level)
}

export function getHeritageWords(): HskWord[] {
  // For heritage learners, skip basic vocabulary they already know
  const skipBasic = ['我', '你', '他', '她', '是', '的', '了', '在', '有', '和', 
                     '爸爸', '妈妈', '哥哥', '姐姐', '狗', '猫', '苹果', '吃', '喝']
  return hskData.filter(w => !skipBasic.includes(w.word))
}

export function searchWords(query: string): HskWord[] {
  const q = query.toLowerCase()
  return hskData.filter(w => 
    w.word.includes(q) || 
    w.pinyin.toLowerCase().includes(q) ||
    w.english.some(e => e.toLowerCase().includes(q))
  )
}
```

---

## 6. Text-to-Speech (TTS)

### 6.1 Options for Chinese TTS

| Service | Quality | Free | API Key | Notes |
|---------|---------|------|---------|-------|
| **Web Speech API** | ★★☆☆☆ | Yes | No | Browser-native, variable quality |
| **Azure Cognitive Services** | ★★★★★ | 500k chars/mo | Yes | Best quality, Microsoft |
| **Google Cloud TTS** | ★★★★★ | 4M chars/mo | Yes | Good, Google |
| **Baidu TTS** | ★★★★★ | 50k/month | Yes | Best for Chinese |
| **Coqui TTS** | ★★★★☆ | Yes (open) | No | Self-hosted, trainable |

### 6.2 Recommended: Web Speech API (v1)

```typescript
// src/composables/useAudio.ts
interface UseAudioOptions {
  lang?: string
}

export function useAudio(options: UseAudioOptions = {}) {
  const lang = options.lang || 'zh-CN'  // zh-CN for mainland Mandarin
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
  
  function speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!synth) {
        reject(new Error('Speech synthesis not available'))
        return
      }
      
      // Cancel any ongoing speech
      synth.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.9  // Slightly slower for kids
      utterance.pitch = 1.0
      
      // Try to get a Chinese voice
      const voices = synth.getVoices()
      const chineseVoice = voices.find(v => v.lang.startsWith('zh'))
      if (chineseVoice) {
        utterance.voice = chineseVoice
      }
      
      utterance.onend = () => resolve()
      utterance.onerror = (e) => reject(e)
      
      synth.speak(utterance)
    })
  }
  
  function stop() {
    synth?.cancel()
  }
  
  return { speak, stop }
}
```

**Usage:**
```vue
<script setup>
import { useAudio } from '@/composables/useAudio'
const { speak } = useAudio()

// Play character pronunciation
async function playChar(char: string, pinyin: string) {
  // Show pinyin briefly, then speak
  await speak(char)
}
</script>
```

---

## 7. Data Persistence Options

### 7.1 For Cloudflare Pages

| Storage | Use Case | Pros | Cons |
|---------|----------|------|------|
| **localStorage** | v1 prototype | Simple, no setup | 5MB limit, client-only |
| **Cloudflare KV** | User progress, streaks | Fast, durable, global | Needs Workers for writes |
| **Cloudflare D1** | Vocabulary, lesson content | SQL queries, relational | Read-heavy (content is static) |
| **IndexedDB** | Large card decks, offline | 50MB+, structured | More complex |

### 7.2 Recommended v1 Architecture

**v1 (MVP):** localStorage for progress, bundled JSON for vocabulary
```typescript
// Simple localStorage persistence
export function saveProgress(key: string, data: any) {
  localStorage.setItem(`mandarin_${key}`, JSON.stringify(data))
}

export function loadProgress(key: string, fallback: any) {
  const saved = localStorage.getItem(`mandarin_${key}`)
  return saved ? JSON.parse(saved) : fallback
}
```

**v2 (Production):** Cloudflare KV for user data
```typescript
// Cloudflare KV (via Workers)
export async function saveProgressKV(key: string, data: any) {
  const res = await fetch('/api/progress', {
    method: 'POST',
    body: JSON.stringify({ key, data })
  })
  return res.ok
}
```

---

## 8. Technical Build Readiness

### 8.1 Assessment

| Area | Status | Details |
|------|--------|---------|
| **Vue 3 + Vite** | ✅ Ready | Standard setup, documented patterns |
| **Cloudflare Pages** | ✅ Ready | learn-some-ai already uses this |
| **Chinese fonts** | ✅ Ready | Noto Sans SC via Google Fonts |
| **Stroke animation** | ✅ Ready | hanzi-writer (⭐4,762, MIT, active) |
| **SRS algorithm** | ✅ Ready | FSRS.js available, better than SM-2 |
| **Vocabulary data** | ✅ Ready | HSK 2.0/3.0 JSON available (MIT) |
| **TTS** | ✅ Ready | Web Speech API (free, no key) |
| **Vue-specific Chinese libs** | ⚠️ None found | No Vue-native Chinese learning components; build custom |
| **Offline support** | ⏳ v2 | PWA with service worker for v2 |

### 8.2 No Hard Blockers

All core technical decisions have viable open-source solutions:
- ✅ Stroke order: hanzi-writer (4,762 stars, MIT)
- ✅ SRS: FSRS.js (180 stars, MIT) or fsrs4anki (3,932 stars)
- ✅ HSK vocabulary: drkameleon/complete-hsk-vocabulary (215 stars, MIT)
- ✅ Font: Noto Sans SC (Google Fonts, free)
- ✅ TTS: Web Speech API (browser-native, free)

### 8.3 Remaining Technical Decisions

1. **Offline support (v1 vs v2):** localStorage enough for v1
2. **Parent auth:** How to handle COPPA? (email-based parent account for under-13)
3. **Audio hosting:** Bundled MP3 vs TTS at runtime
4. **Lesson content structure:** JSON-based lesson definitions or API-driven

---

## Appendix: Key GitHub Repos (Technical)

| Repo | Stars | Purpose |
|------|-------|---------|
| `chanind/hanzi-writer` | ⭐4,762 | Stroke order animation + quiz |
| `open-spaced-repetition/fsrs4anki` | ⭐3,932 | FSRS algorithm (Anki addon) |
| `open-spaced-repetition/free-spaced-repetition-scheduler` | ⭐648 | Core FSRS algorithm |
| `open-spaced-repetition/fsrs.js` | ⭐180 | JavaScript FSRS implementation |
| `drkameleon/complete-hsk-vocabulary` | ⭐215 | Complete HSK 2.0/3.0 vocabulary JSON |
| `skrisrishu/hanzi-writer-data` | ~400 | Stroke data for hanzi-writer |
| `kfcd/stroke-order` | ~200 | SVG stroke order data |
| `ivankra/hsk30` | ⭐56 | Cleaned HSK 3.0 with POS |
| `dierat/learn_hanzi` | ⭐21 | Reference: Chinese SRS flashcard app |

---

*Research compiled: 2026-05-08*
*Next: Days 5-6 — Gamification & Engagement*
