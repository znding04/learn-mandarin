<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const questions = ref([])
const currentIndex = ref(0)
const score = ref(0)
const selectedAnswer = ref(null)
const showResult = ref(false)
const loading = ref(true)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickDistractors(pool, correct, key, count = 3) {
  const others = pool.filter(w => w[key] !== correct[key])
  return shuffle(others).slice(0, count).map(w => w[key])
}

onMounted(async () => {
  const [hsk1, hsk2] = await Promise.all([
    fetch('/content/hsk1-vocab.json').then(r => r.json()),
    fetch('/content/hsk2-vocab.json').then(r => r.json()).catch(() => []),
  ])
  const allVocab = [...hsk1, ...hsk2]

  // Pick 10 from HSK1, 10 from HSK2
  const hsk1Sample = shuffle(hsk1).slice(0, 10)
  const hsk2Sample = shuffle(hsk2).slice(0, 10)
  const selected = [...hsk1Sample, ...hsk2Sample]

  const built = selected.map((word, i) => {
    const type = i % 3 // cycle through 3 question types
    if (type === 0) {
      // "What does this mean?" — show Chinese, 4 English options
      const distractors = pickDistractors(allVocab, word, 'english')
      return {
        prompt: word.chinese,
        promptLabel: 'What does this mean?',
        correct: word.english,
        options: shuffle([word.english, ...distractors]),
        hskLevel: word.hskLevel,
      }
    } else if (type === 1) {
      // "How do you say this in Chinese?" — show English, 4 Chinese options
      const distractors = pickDistractors(allVocab, word, 'chinese')
      return {
        prompt: word.english,
        promptLabel: 'How do you say this in Chinese?',
        correct: word.chinese,
        options: shuffle([word.chinese, ...distractors]),
        hskLevel: word.hskLevel,
      }
    } else {
      // "Select the correct pinyin" — show Chinese, 4 pinyin options
      const distractors = pickDistractors(allVocab, word, 'pinyin')
      return {
        prompt: word.chinese,
        promptLabel: 'Select the correct pinyin',
        correct: word.pinyin,
        options: shuffle([word.pinyin, ...distractors]),
        hskLevel: word.hskLevel,
      }
    }
  })

  questions.value = shuffle(built)
  loading.value = false
})

function selectAnswer(option) {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = option
  const q = questions.value[currentIndex.value]
  if (option === q.correct) {
    score.value += q.hskLevel === 1 ? 1 : 2
  }
  setTimeout(() => {
    selectedAnswer.value = null
    if (currentIndex.value < questions.value.length - 1) {
      currentIndex.value++
    } else {
      showResult.value = true
    }
  }, 600)
}

const suggestedLevel = () => {
  if (score.value >= 20) return { level: 2, lesson: 16 }
  if (score.value >= 8) return { level: 1, lesson: 8 }
  return { level: 1, lesson: 1 }
}

function finishPlacement() {
  const result = suggestedLevel()
  localStorage.setItem('mandarin-placement-done', 'true')
  localStorage.setItem('mandarin-placement-level', result.level.toString())
  router.push('/lessons')
}
</script>

<template>
  <div class="placement-page">
    <NavBar :showBack="true" />
    <div class="container">
      <div v-if="loading" class="loading">Loading questions...</div>

      <div v-else-if="showResult" class="result-screen">
        <h1 class="result-title">Placement Complete!</h1>
        <div class="result-card">
          <p class="result-score">You scored {{ score }} / {{ questions.length * 2 }}</p>
          <h2 class="result-level">Start at HSK Level {{ suggestedLevel().level }}</h2>
          <p class="result-suggestion">We suggest starting at Lesson {{ suggestedLevel().lesson }}</p>
        </div>
        <button class="start-btn" @click="finishPlacement">Start Learning</button>
      </div>

      <div v-else class="quiz">
        <div class="progress-info">
          Question {{ currentIndex + 1 }} of {{ questions.length }}
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: ((currentIndex + 1) / questions.length * 100) + '%' }"></div>
        </div>

        <div class="question-card">
          <p class="question-label">{{ questions[currentIndex].promptLabel }}</p>
          <h2 class="question-prompt">{{ questions[currentIndex].prompt }}</h2>
        </div>

        <div class="options">
          <button
            v-for="(option, idx) in questions[currentIndex].options"
            :key="idx"
            class="option-btn"
            :class="{
              correct: selectedAnswer !== null && option === questions[currentIndex].correct,
              wrong: selectedAnswer === option && option !== questions[currentIndex].correct,
            }"
            @click="selectAnswer(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 16px;
}

.loading {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-light);
  font-size: 1.1rem;
}

.progress-info {
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: 8px;
  font-weight: 500;
}

.progress-bar {
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 32px;
}

.progress-fill {
  height: 100%;
  background: var(--color-gold);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.question-card {
  text-align: center;
  margin-bottom: 32px;
}

.question-label {
  font-size: 0.95rem;
  color: var(--color-text-light);
  margin-bottom: 12px;
}

.question-prompt {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-text);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  text-align: left;
}

.option-btn:hover {
  border-color: var(--color-gold);
}

.option-btn.correct {
  background: #e8f8f5;
  border-color: #27ae60;
  color: #27ae60;
}

.option-btn.wrong {
  background: #fde8e8;
  border-color: #e74c3c;
  color: #e74c3c;
}

.result-screen {
  text-align: center;
  padding: 40px 0;
}

.result-title {
  font-size: 1.8rem;
  color: var(--color-red);
  margin-bottom: 24px;
}

.result-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 32px 24px;
  box-shadow: var(--shadow);
  margin-bottom: 32px;
}

.result-score {
  font-size: 1rem;
  color: var(--color-text-light);
  margin-bottom: 12px;
}

.result-level {
  font-size: 1.6rem;
  color: var(--color-gold);
  font-weight: 700;
  margin-bottom: 8px;
}

.result-suggestion {
  font-size: 0.95rem;
  color: var(--color-text-light);
}

.start-btn {
  background: var(--color-gold);
  color: var(--color-text);
  font-size: 1.2rem;
  font-weight: 700;
  padding: 14px 40px;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.15s;
}

.start-btn:hover {
  transform: translateY(-2px);
}
</style>
