<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { useProgress } from '../composables/useProgress.js'
import { useSRS } from '../composables/useSRS.js'
import { useAchievements } from '../composables/useAchievements.js'

const router = useRouter()
const { state, getStreak } = useProgress()
const { state: srsState } = useSRS()
const { getAchievements } = useAchievements()

const totalLessons = 23 // 15 HSK1 + 8 HSK2

const lessonsCompleted = computed(() => Object.keys(state.lessonComplete).length)
const hsk1Completed = computed(() => Object.keys(state.lessonComplete).filter(id => Number(id) <= 15).length)
const hsk2Completed = computed(() => Object.keys(state.lessonComplete).filter(id => Number(id) > 15).length)
const hsk1Remaining = computed(() => 15 - hsk1Completed.value)
const hsk2Remaining = computed(() => 8 - hsk2Completed.value)

const streak = computed(() => getStreak())

// Calculate days active from first study date and streak
const daysActive = computed(() => {
  if (!state.lastStudyDate) return 0
  // Estimate: at minimum streak days, at least 1
  return Math.max(state.streak, 1)
})

const avgDailyXP = computed(() => {
  if (daysActive.value === 0) return 0
  return Math.round(state.xp / daysActive.value)
})

// Cards mastered: SRS interval > 21 days
const cardsMastered = computed(() => {
  return Object.values(srsState.cards).filter(c => c.interval > 21).length
})

const totalCardsReviewed = computed(() => {
  return Object.keys(srsState.cards).length
})

// Achievements
const earnedAchievements = computed(() => {
  return getAchievements().filter(a => a.earned)
})

const allAchievements = computed(() => getAchievements())

// Recommendation
const recommendation = computed(() => {
  if (lessonsCompleted.value === 0) {
    return 'Your child hasn\'t started any lessons yet. Encourage them to begin with Lesson 1!'
  }
  if (hsk1Completed.value < 15) {
    return `Keep going! ${hsk1Remaining.value} more lesson${hsk1Remaining.value === 1 ? '' : 's'} to complete HSK 1.`
  }
  if (hsk2Completed.value < 8) {
    return `HSK 1 complete! ${hsk2Remaining.value} more lesson${hsk2Remaining.value === 1 ? '' : 's'} to finish HSK 2.`
  }
  return 'Amazing! All available lessons are complete. Time for review and practice!'
})

const lessonNames = {
  1: 'Greetings & Basics', 2: 'Common Particles', 3: 'People & Places',
  4: 'Language & Numbers', 5: 'Time & Dates', 6: 'Family & School',
  7: 'Food & Actions', 8: 'Transportation', 9: 'Work & Places',
  10: 'Entertainment & Weather', 11: 'Descriptions', 12: 'Shopping & Colors',
  13: 'Polite Expressions', 14: 'Daily Life', 15: 'Directions & Weather',
  16: 'School & Academics', 17: 'Health & Body', 18: 'Hobbies & Sports',
  19: 'Travel & Directions', 20: 'Shopping & Money', 21: 'Home & Rooms',
  22: 'Feelings & Opinions', 23: 'Nature & Seasons',
}

const completedLessonList = computed(() => {
  return Object.keys(state.lessonComplete)
    .map(Number)
    .sort((a, b) => a - b)
    .map(id => ({ id, name: lessonNames[id] || `Lesson ${id}` }))
})
</script>

<template>
  <div class="parent-dashboard">
    <NavBar :showBack="true" />
    <div class="container">
      <div class="page-header">
        <h1>Parent Dashboard</h1>
        <p class="subtitle">Your child's learning progress</p>
      </div>

      <!-- Overview stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">⭐</span>
          <span class="stat-value">{{ state.xp }}</span>
          <span class="stat-label">Total XP</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🔥</span>
          <span class="stat-value">{{ streak }}</span>
          <span class="stat-label">Day Streak</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📅</span>
          <span class="stat-value">{{ daysActive }}</span>
          <span class="stat-label">Days Active</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">⚡</span>
          <span class="stat-value">{{ avgDailyXP }}</span>
          <span class="stat-label">Avg Daily XP</span>
        </div>
      </div>

      <!-- Lesson progress -->
      <div class="dashboard-card">
        <h2>Lesson Progress</h2>
        <div class="progress-summary">
          <div class="progress-bar-container">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" :style="{ width: (lessonsCompleted / totalLessons) * 100 + '%' }"></div>
            </div>
            <span class="progress-count">{{ lessonsCompleted }} / {{ totalLessons }} lessons completed</span>
          </div>
          <div class="level-breakdown">
            <span class="level-tag">HSK 1: {{ hsk1Completed }} / 15</span>
            <span class="level-tag">HSK 2: {{ hsk2Completed }} / 8</span>
          </div>
        </div>
        <div v-if="completedLessonList.length > 0" class="completed-list">
          <h3>Completed Lessons</h3>
          <ul>
            <li v-for="lesson in completedLessonList" :key="lesson.id">
              Lesson {{ lesson.id }}: {{ lesson.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Vocabulary mastery -->
      <div class="dashboard-card">
        <h2>Vocabulary</h2>
        <div class="vocab-stats">
          <div class="vocab-row">
            <span>Cards reviewed</span>
            <span class="vocab-value">{{ totalCardsReviewed }}</span>
          </div>
          <div class="vocab-row">
            <span>Cards mastered (21+ day interval)</span>
            <span class="vocab-value mastered">{{ cardsMastered }}</span>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div class="dashboard-card">
        <h2>Achievements</h2>
        <div v-if="earnedAchievements.length > 0" class="badge-grid">
          <div v-for="badge in allAchievements" :key="badge.id" class="badge-item" :class="{ locked: !badge.earned }">
            <span class="badge-icon">{{ badge.icon }}</span>
            <span class="badge-label">{{ badge.label }}</span>
            <span class="badge-desc">{{ badge.description }}</span>
          </div>
        </div>
        <p v-else class="empty-text">No achievements earned yet. Keep studying!</p>
      </div>

      <!-- Recommendation -->
      <div class="dashboard-card recommendation">
        <h2>Recommendation</h2>
        <p>{{ recommendation }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  text-align: center;
  padding: 24px 0 8px;
}

.page-header h1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text);
}

.subtitle {
  color: var(--color-text-light);
  font-size: 0.9rem;
}

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 20px 0;
}

.stat-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-icon {
  font-size: 1.4rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Dashboard cards */
.dashboard-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  margin-bottom: 16px;
}

.dashboard-card h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
}

.dashboard-card h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-light);
  margin-bottom: 8px;
  margin-top: 16px;
}

/* Progress bar */
.progress-bar-container {
  margin-bottom: 8px;
}

.progress-bar-bg {
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-bar-fill {
  height: 100%;
  background: var(--color-gold);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.progress-count {
  font-size: 0.85rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.level-breakdown {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.level-tag {
  font-size: 0.8rem;
  background: rgba(243, 156, 18, 0.12);
  color: var(--color-gold);
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.completed-list ul {
  list-style: none;
  padding: 0;
}

.completed-list li {
  font-size: 0.85rem;
  color: var(--color-text);
  padding: 4px 0;
  border-bottom: 1px solid var(--color-border);
}

.completed-list li:last-child {
  border-bottom: none;
}

/* Vocabulary stats */
.vocab-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vocab-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--color-text);
}

.vocab-value {
  font-weight: 700;
  color: var(--color-text);
}

.vocab-value.mastered {
  color: #27ae60;
}

/* Achievements */
.badge-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 8px;
  border-radius: var(--radius);
  background: rgba(243, 156, 18, 0.08);
}

.badge-item.locked {
  opacity: 0.35;
  background: var(--color-border);
}

.badge-icon {
  font-size: 1.6rem;
  margin-bottom: 4px;
}

.badge-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text);
}

.badge-desc {
  font-size: 0.7rem;
  color: var(--color-text-light);
}

.empty-text {
  color: var(--color-text-light);
  font-size: 0.9rem;
}

/* Recommendation */
.recommendation {
  border-left: 4px solid var(--color-gold);
}

.recommendation p {
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.5;
}

/* Bottom padding */
.container {
  padding-bottom: 32px;
}
</style>
