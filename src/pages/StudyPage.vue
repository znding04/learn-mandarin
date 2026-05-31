<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { useSRS } from '../composables/useSRS.js'
import { useProgress } from '../composables/useProgress.js'

const route = useRoute()
const router = useRouter()
const { getDueCards, getCardsByLesson, reviewCard } = useSRS()
const { completeLesson, getStreak } = useProgress()

const lessonId = computed(() => Number(route.params.lessonId))
const allVocab = ref([])
const cards = ref([])
const currentIndex = ref(0)
const isFlipped = ref(false)
const showPinyin = ref(true)
const sessionComplete = ref(false)
const hasTTS = ref('speechSynthesis' in window)

// Session stats
const cardsStudied = ref(0)
const xpEarned = ref(0)

const currentCard = computed(() => cards.value[currentIndex.value] || null)
const progress = computed(() => `Card ${currentIndex.value + 1} of ${cards.value.length}`)

onMounted(async () => {
  const res = await fetch('/content/hsk1-vocab.json')
  allVocab.value = await res.json()

  const due = getDueCards(lessonId.value, allVocab.value)
  if (due.length > 0) {
    cards.value = due
  } else {
    cards.value = getCardsByLesson(lessonId.value, allVocab.value)
  }

  speechSynthesis.onvoiceschanged = () => {
    hasTTS.value = 'speechSynthesis' in window
  }
})

function flipCard() {
  isFlipped.value = true
}

function rate(quality) {
  reviewCard(currentCard.value.id, quality)
  cardsStudied.value++

  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++
    isFlipped.value = false
  } else {
    // completeLesson() already adds +20 XP inside useProgress.js
    completeLesson(lessonId.value)
    xpEarned.value += 20
    sessionComplete.value = true
  }
}

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

function restart() {
  const due = getDueCards(lessonId.value, allVocab.value)
  if (due.length > 0) {
    cards.value = due
  } else {
    cards.value = getCardsByLesson(lessonId.value, allVocab.value)
  }
  currentIndex.value = 0
  isFlipped.value = false
  sessionComplete.value = false
  cardsStudied.value = 0
  xpEarned.value = 0
}
</script>

<template>
  <div class="study-page">
    <NavBar :showBack="true" />
    <div class="container">
      <!-- Session complete -->
      <div v-if="sessionComplete" class="complete-screen">
        <h2>Lesson Complete!</h2>
        <p>You reviewed all {{ cards.length }} cards. +20 XP</p>
        <div class="complete-actions">
          <button class="btn-gold" @click="restart">Study Again</button>
          <button class="btn-outline" @click="router.push('/lessons')">Back to Lessons</button>
        </div>
      </div>

      <!-- Flashcard study -->
      <div v-else-if="currentCard" class="study-area">
        <div class="study-header">
          <span class="progress-text">{{ progress }}</span>
          <label class="pinyin-toggle">
            Pinyin: {{ showPinyin ? 'On' : 'Off' }}
            <input type="checkbox" v-model="showPinyin" />
          </label>
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: ((currentIndex + 1) / cards.length) * 100 + '%' }"
          ></div>
        </div>

        <div class="card-scene" @click="!isFlipped && flipCard()">
          <div class="card" :class="{ 'is-flipped': isFlipped }">
            <div class="card-face card-front">
              <span class="card-chinese">{{ currentCard.chinese }}</span>
              <span class="card-pinyin-hint">Tap to flip</span>
            </div>
            <div class="card-face card-back">
              <button v-if="hasTTS" class="speak-btn" @click.stop="speak(currentCard.chinese)">🔊</button>
              <span v-else class="pinyin-fallback">{{ currentCard.pinyin }}</span>
              <span class="card-chinese">{{ currentCard.chinese }}</span>
              <span v-if="showPinyin" class="card-pinyin">{{ currentCard.pinyin }}</span>
              <span class="card-english">{{ currentCard.english }}</span>
            </div>
          </div>
        </div>

        <div v-if="!isFlipped" class="action-row">
          <button class="btn-gold" @click="flipCard">Show Answer</button>
        </div>

        <div v-else class="rating-row">
          <button class="rate-btn rate-hard" @click="rate(1)">Hard</button>
          <button class="rate-btn rate-medium" @click="rate(3)">Medium</button>
          <button class="rate-btn rate-easy" @click="rate(5)">Easy</button>
        </div>

        <!-- Session stats panel -->
        <div class="session-stats">
          <div class="stat-item">
            <span class="stat-value">{{ cardsStudied }}</span>
            <span class="stat-label">Cards Studied</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">🔥 {{ getStreak() }}</span>
            <span class="stat-label">Day Streak</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">+{{ xpEarned }}</span>
            <span class="stat-label">XP Earned</span>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-else class="loading">Loading cards...</div>
    </div>
  </div>
</template>

<style scoped>
.study-area {
  padding-top: 16px;
}

.study-header {
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

.pinyin-toggle {
  font-size: 0.8rem;
  color: var(--color-text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.pinyin-toggle input {
  accent-color: var(--color-gold);
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

/* Card flip */
.card-scene {
  perspective: 800px;
  margin-bottom: 24px;
  cursor: pointer;
}

.card {
  position: relative;
  width: 100%;
  min-height: 280px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 280px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 32px 20px;
}

.card-back {
  transform: rotateY(180deg);
  position: relative;
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

.card-chinese {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
}

.card-pinyin-hint {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.card-pinyin {
  font-size: 1.3rem;
  color: var(--color-text-light);
  margin-bottom: 8px;
}

.card-english {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-text);
}

/* Buttons */
.action-row {
  display: flex;
  justify-content: center;
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

.rating-row {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.rate-btn {
  flex: 1;
  max-width: 120px;
  padding: 12px 8px;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.2s;
}

.rate-btn:hover {
  opacity: 0.85;
}

.rate-hard {
  background: #e74c3c;
  color: #fff;
}

.rate-medium {
  background: var(--color-gold);
  color: #2c3e50;
}

.rate-easy {
  background: #27ae60;
  color: #fff;
}

/* Complete screen */
.complete-screen {
  text-align: center;
  padding: 64px 16px;
}

.complete-screen h2 {
  font-size: 1.6rem;
  color: var(--color-red);
  margin-bottom: 8px;
}

.complete-screen p {
  color: var(--color-text-light);
  margin-bottom: 24px;
}

.complete-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
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

/* Session stats */
.session-stats {
  display: flex;
  justify-content: space-around;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px 12px;
  margin-top: 24px;
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

/* TTS fallback */
.pinyin-fallback {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(243, 156, 18, 0.15);
  color: var(--color-gold);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
}

.loading {
  text-align: center;
  padding: 64px 16px;
  color: var(--color-text-light);
}
</style>
