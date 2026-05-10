<script setup>
import NavBar from '../components/NavBar.vue'

const lessons = [
  { id: 1, title: 'Greetings & Basics', wordCount: 10, status: 'not_started' },
  { id: 2, title: 'Numbers & Counting', wordCount: 10, status: 'locked' },
  { id: 3, title: 'Family Members', wordCount: 10, status: 'locked' },
  { id: 4, title: 'Daily Actions', wordCount: 10, status: 'locked' },
  { id: 5, title: 'Food & Drink', wordCount: 10, status: 'locked' },
]

function statusLabel(status) {
  return status === 'locked' ? 'Locked' : 'Not Started'
}

function statusClass(status) {
  return status === 'locked' ? 'badge-locked' : 'badge-ready'
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
      <div class="lesson-list">
        <div
          v-for="lesson in lessons"
          :key="lesson.id"
          class="lesson-card"
          :class="{ 'lesson-locked': lesson.status === 'locked' }"
        >
          <div class="lesson-info">
            <span class="lesson-number">Lesson {{ lesson.id }}</span>
            <h3 class="lesson-title">{{ lesson.title }}</h3>
            <span class="lesson-words">{{ lesson.wordCount }} words</span>
          </div>
          <span class="lesson-badge" :class="statusClass(lesson.status)">
            {{ statusLabel(lesson.status) }}
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
}

.lesson-locked {
  opacity: 0.55;
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

.badge-locked {
  background: #f0f0f0;
  color: #999;
}
</style>
