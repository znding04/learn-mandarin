<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { useProgress } from '../composables/useProgress.js'

const router = useRouter()
const { state, getStreak, isLessonComplete } = useProgress()

const lessonsCompleted = computed(() =>
  lessons.filter(l => isLessonComplete(l.id)).length
)

const lessons = [
  { id: 1, title: 'Greetings & Basics', wordCount: 10 },
  { id: 2, title: 'Pronouns & Particles', wordCount: 6 },
  { id: 3, title: 'Numbers & Places', wordCount: 10 },
  { id: 4, title: 'Question Words', wordCount: 17 },
  { id: 5, title: 'Family & People', wordCount: 10 },
  { id: 6, title: 'Time & Dates', wordCount: 8 },
  { id: 7, title: 'Food & Drink', wordCount: 11 },
  { id: 8, title: 'Daily Activities', wordCount: 9 },
  { id: 9, title: 'Adjectives & Descriptions', wordCount: 8 },
  { id: 10, title: 'Travel & Directions', wordCount: 9 },
  { id: 11, title: 'Shopping & Money', wordCount: 11 },
  { id: 12, title: 'Nature & Weather', wordCount: 10 },
  { id: 13, title: 'Everyday Objects', wordCount: 7 },
  { id: 14, title: 'Food & Drink II', wordCount: 12 },
  { id: 15, title: 'Time & Weather II', wordCount: 12 },
]

function openLesson(lesson) {
  router.push(`/study/${lesson.id}`)
}
</script>

<template>
  <div class="lessons-page">
    <NavBar :showBack="true" />
    <div class="container">
      <div class="level-header">
        <h1>HSK 1</h1>
        <p>Beginner — First 150 words</p>
      </div>
      <div class="stats-bar">
        <span class="stat-item">⭐ {{ state.xp }} XP</span>
        <span class="stat-item">🔥 {{ getStreak() }} streak</span>
        <span class="stat-item">{{ lessonsCompleted }} / {{ lessons.length }} lessons</span>
      </div>
      <div class="lesson-list">
        <div
          v-for="lesson in lessons"
          :key="lesson.id"
          class="lesson-card"
          @click="openLesson(lesson)"
        >
          <div class="lesson-info">
            <span class="lesson-number">Lesson {{ lesson.id }}</span>
            <h3 class="lesson-title">{{ lesson.title }}</h3>
            <span class="lesson-words">{{ lesson.wordCount }} words</span>
          </div>
          <span v-if="isLessonComplete(lesson.id)" class="lesson-badge badge-complete">
            ✓ Complete
          </span>
          <span v-else class="lesson-badge badge-ready">
            Start
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.level-header {
  text-align: center;
  padding: 32px 0 16px;
}

.level-header h1 {
  font-size: 1.8rem;
  color: var(--color-red);
}

.level-header p {
  color: var(--color-text-light);
  font-size: 0.95rem;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: rgba(243, 156, 18, 0.15);
  border-radius: var(--radius);
}

.stat-item {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-gold);
}

.lesson-card {
  overflow-wrap: break-word;
}

.lesson-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 32px;
}

.lesson-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px 20px;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.lesson-card:hover {
  transform: translateY(-1px);
}

.lesson-number {
  font-size: 0.8rem;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.lesson-title {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 2px 0;
}

.lesson-words {
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.lesson-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

.badge-ready {
  background: #e8f8f5;
  color: #1abc9c;
}

.badge-complete {
  background: #e8f8f5;
  color: #27ae60;
}
</style>
