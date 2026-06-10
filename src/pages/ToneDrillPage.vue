<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { useProgress } from '../composables/useProgress.js'

const router = useRouter()
const { addXP, getStreak } = useProgress()

const allVocab = ref([])
const sessionWords = ref([])
const currentIndex = ref(0)
const score = ref(0)
const xpEarned = ref(0)
const sessionComplete = ref(false)
const feedback = ref(null) // { correct: boolean, correctTone: number }
const waiting = ref(false)
const hasTTS = ref('speechSynthesis' in window)

const TOTAL_WORDS = 10
const TONE_LABELS = ['1st — flat', '2nd — rising', '3rd — dip', '4th — falling']

const currentWord = computed(() => sessionWords.value[currentIndex.value] || null)

// Extract tone number from pinyin with tone marks
function getTone(pinyin) {
  const tone1 = /[āēīōūǖ]/
  const tone2 = /[áéíóúǘ]/
  const tone3 = /[ǎěǐǒǔǚ]/
  const tone4 = /[àèìòùǜ]/
  if (tone1.test(pinyin)) return 1
  if (tone2.test(pinyin)) return 2
  if (tone3.test(pinyin)) return 3
  if (tone4.test(pinyin)) return 4
  return 0 // neutral tone
}

// Strip tone marks from pinyin to show base form
function stripTones(pinyin) {
  const map = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü',
  }
  return pinyin.split('').map(c => map[c] || c).join('')
}

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickSessionWords(vocab) {
  // Filter for single-character words with clear tones (1-4)
  const candidates = vocab.filter(w => {
    const tone = getTone(w.pinyin)
    return tone >= 1 && tone <= 4 && w.chinese.length === 1
  })
  // Ensure a mix of tones — pick from each tone bucket
  const buckets = { 1: [], 2: [], 3: [], 4: [] }
  for (const w of candidates) {
    buckets[getTone(w.pinyin)].push(w)
  }
  // Shuffle each bucket and round-robin pick
  for (const k of Object.keys(buckets)) {
    buckets[k] = shuffle(buckets[k])
  }
  const picked = []
  let idx = 0
  while (picked.length < TOTAL_WORDS) {
    const tone = (idx % 4) + 1
    if (buckets[tone].length > 0) {
      picked.push(buckets[tone].shift())
    }
    idx++
    if (idx > 100) break // safety
  }
  return shuffle(picked)
}

onMounted(async () => {
  const [hsk1, hsk2] = await Promise.all([
    fetch('/content/hsk1-vocab.json').then(r => r.json()),
    fetch('/content/hsk2-vocab.json').then(r => r.json()).catch(() => []),
  ])
  allVocab.value = [...hsk1, ...hsk2]
  sessionWords.value = pickSessionWords(allVocab.value)

  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {
      hasTTS.value = 'speechSynthesis' in window
    }
  }
})

function speak(text) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'zh-CN'
    const voices = speechSynthesis.getVoices()
    const zhVoice = voices.find(v => v.lang.startsWith('zh')) || voices[0]
    if (zhVoice) utter.voice = zhVoice
    utter.rate = 0.85
    speechSynthesis.speak(utter)
  }
}

function selectTone(tone) {
  if (waiting.value || !currentWord.value) return
  const correctTone = getTone(currentWord.value.pinyin)
  const isCorrect = tone === correctTone
  feedback.value = { correct: isCorrect, correctTone, selected: tone }
  waiting.value = true

  if (isCorrect) {
    score.value++
    xpEarned.value += 5
    addXP(5)
  }

  const delay = isCorrect ? 800 : 1200
  setTimeout(() => {
    feedback.value = null
    waiting.value = false
    if (currentIndex.value < sessionWords.value.length - 1) {
      currentIndex.value++
      // Auto-play audio for next word
      setTimeout(() => {
        if (sessionWords.value[currentIndex.value]) {
          speak(sessionWords.value[currentIndex.value].chinese)
        }
      }, 200)
    } else {
      sessionComplete.value = true
    }
  }, delay)
}

function restart() {
  sessionWords.value = pickSessionWords(allVocab.value)
  currentIndex.value = 0
  score.value = 0
  xpEarned.value = 0
  sessionComplete.value = false
  feedback.value = null
  waiting.value = false
  setTimeout(() => {
    if (sessionWords.value[0]) speak(sessionWords.value[0].chinese)
  }, 300)
}
</script>

<template>
  <div class="tone-drill-page">
    <NavBar :showBack="true" />
    <div class="container">
      <!-- Session complete -->
      <div v-if="sessionComplete" class="complete-screen">
        <h2>Session Complete!</h2>
        <div class="score-circle">
          <span class="score-num">{{ score }}</span>
          <span class="score-denom">/ {{ TOTAL_WORDS }}</span>
        </div>
        <p class="score-label">{{ score >= 8 ? 'Excellent!' : score >= 5 ? 'Good job!' : 'Keep practicing!' }}</p>
        <p class="xp-text">+{{ xpEarned }} XP earned</p>
        <div class="complete-actions">
          <button class="btn-gold" @click="restart">Play Again</button>
          <button class="btn-outline" @click="router.push('/')">Back Home</button>
        </div>
      </div>

      <!-- Drill area -->
      <div v-else-if="currentWord" class="drill-area">
        <div class="drill-header">
          <span class="progress-text">{{ currentIndex + 1 }} / {{ TOTAL_WORDS }}</span>
          <span class="score-text">Score: {{ score }}</span>
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: ((currentIndex + 1) / TOTAL_WORDS) * 100 + '%' }"
          ></div>
        </div>

        <div class="word-card" :class="{ 'flash-green': feedback?.correct, 'flash-red': feedback && !feedback.correct }">
          <span class="word-chinese">{{ currentWord.chinese }}</span>
          <span class="word-pinyin">{{ stripTones(currentWord.pinyin) }}</span>
          <button v-if="hasTTS" class="speak-btn" @click="speak(currentWord.chinese)">🔊</button>
        </div>

        <p class="prompt-text">Which tone do you hear?</p>

        <div class="tone-grid">
          <button
            v-for="tone in 4"
            :key="tone"
            class="tone-btn"
            :class="{
              correct: feedback && tone === feedback.correctTone,
              wrong: feedback && !feedback.correct && tone === feedback.selected,
              disabled: waiting
            }"
            @click="selectTone(tone)"
          >
            <span class="tone-number">{{ tone }}</span>
            <span class="tone-label">{{ TONE_LABELS[tone - 1] }}</span>
          </button>
        </div>

        <div v-if="feedback && !feedback.correct" class="feedback-hint">
          <span>{{ currentWord.pinyin }} — tone {{ feedback.correctTone }}</span>
        </div>

        <div class="session-stats">
          <div class="stat-item">
            <span class="stat-value">{{ score }}</span>
            <span class="stat-label">Correct</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">🔥 {{ getStreak() }}</span>
            <span class="stat-label">Streak</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">+{{ xpEarned }}</span>
            <span class="stat-label">XP</span>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-else class="loading">Loading words...</div>
    </div>
  </div>
</template>

<style scoped>
.drill-area {
  padding-top: 16px;
}

.drill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-text {
  font-size: 0.85rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.score-text {
  font-size: 0.85rem;
  color: var(--color-gold);
  font-weight: 600;
}

.progress-bar {
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  margin-bottom: 24px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-gold);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Word card */
.word-card {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 40px 20px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  transition: border-color 0.3s, background 0.3s;
}

.word-card.flash-green {
  border-color: #27ae60;
  background: #e8f8f0;
}

.word-card.flash-red {
  border-color: #e74c3c;
  background: #fdf0ef;
}

.word-chinese {
  display: block;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 8px;
}

.word-pinyin {
  display: block;
  font-size: 1.3rem;
  color: var(--color-text-light);
}

.speak-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(243, 156, 18, 0.15);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.speak-btn:hover {
  background: rgba(243, 156, 18, 0.3);
}

.prompt-text {
  text-align: center;
  font-size: 1rem;
  color: var(--color-text-light);
  margin-bottom: 16px;
  font-weight: 500;
}

/* Tone buttons grid */
.tone-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.tone-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border-radius: var(--radius);
  background: var(--color-card);
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow);
  transition: transform 0.15s, border-color 0.2s, background 0.2s;
  min-height: 72px;
}

.tone-btn:hover:not(.disabled) {
  transform: translateY(-1px);
  border-color: var(--color-gold);
}

.tone-btn:active:not(.disabled) {
  transform: translateY(0);
}

.tone-btn.disabled {
  pointer-events: none;
}

.tone-btn.correct {
  border-color: #27ae60;
  background: #e8f8f0;
}

.tone-btn.wrong {
  border-color: #e74c3c;
  background: #fdf0ef;
}

.tone-number {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
}

.tone-label {
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin-top: 2px;
}

.feedback-hint {
  text-align: center;
  color: var(--color-red);
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 16px;
}

/* Session stats */
.session-stats {
  display: flex;
  justify-content: space-around;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px 12px;
  margin-top: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Complete screen */
.complete-screen {
  text-align: center;
  padding: 48px 16px;
}

.complete-screen h2 {
  font-size: 1.6rem;
  color: var(--color-red);
  margin-bottom: 20px;
}

.score-circle {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: 8px;
}

.score-num {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--color-gold);
}

.score-denom {
  font-size: 1.4rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.score-label {
  font-size: 1.1rem;
  color: var(--color-text);
  font-weight: 600;
  margin-bottom: 4px;
}

.xp-text {
  color: var(--color-text-light);
  margin-bottom: 24px;
}

.complete-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.btn-gold {
  background: var(--color-gold);
  color: #2c3e50;
  font-weight: 600;
  font-size: 1rem;
  padding: 12px 32px;
  border-radius: var(--radius);
  transition: background 0.2s;
}

.btn-gold:hover {
  background: var(--color-gold-light);
}

.btn-outline {
  background: transparent;
  color: var(--color-text);
  font-weight: 600;
  font-size: 1rem;
  padding: 12px 32px;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}

.btn-outline:hover {
  background: var(--color-border);
}

.loading {
  text-align: center;
  padding: 64px 16px;
  color: var(--color-text-light);
}
</style>
