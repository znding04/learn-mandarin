<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { useProgress } from '../composables/useProgress.js'
import { useAchievements } from '../composables/useAchievements.js'

const router = useRouter()
const { state, getStreak } = useProgress()
const { getAchievements } = useAchievements()

const name = ref(localStorage.getItem('mandarin-profile-name') || '')
const showConfirm = ref(false)

function saveName() {
  localStorage.setItem('mandarin-profile-name', name.value)
}

const initial = computed(() => {
  return name.value ? name.value.charAt(0).toUpperCase() : '?'
})

const lessonsCompleted = computed(() => Object.keys(state.lessonComplete).length)

const badges = computed(() => getAchievements())
const earnedCount = computed(() => badges.value.filter(b => b.earned).length)

function resetProgress() {
  localStorage.removeItem('mandarin-progress')
  localStorage.removeItem('mandarin-srs')
  localStorage.removeItem('mandarin-achievements')
  localStorage.removeItem('mandarin-review-sessions')
  localStorage.removeItem('mandarin-xp-date')
  localStorage.removeItem('mandarin-xp-today')
  showConfirm.value = false
  window.location.reload()
}
</script>

<template>
  <div class="profile-page">
    <NavBar :showBack="true" />
    <div class="container">
      <div class="avatar-section">
        <div class="avatar">{{ initial }}</div>
        <input
          v-model="name"
          class="name-input"
          placeholder="Your name"
          @blur="saveName"
          @keyup.enter="saveName"
        />
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{{ state.xp }}</span>
          <span class="stat-label">Total XP</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ getStreak() }}</span>
          <span class="stat-label">Day Streak</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ lessonsCompleted }}</span>
          <span class="stat-label">Lessons Done</span>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Badges ({{ earnedCount }} / {{ badges.length }})</h2>
        <div class="badge-grid">
          <div
            v-for="badge in badges"
            :key="badge.id"
            class="badge-item"
            :class="{ locked: !badge.earned }"
          >
            <span class="badge-icon">{{ badge.earned ? badge.icon : '🔒' }}</span>
            <span class="badge-label">{{ badge.label }}</span>
            <span class="badge-desc">{{ badge.description }}</span>
          </div>
        </div>
      </div>

      <div class="section actions">
        <button class="action-btn retake" @click="router.push('/placement')">
          Retake Placement Test
        </button>
        <button class="action-btn reset" @click="showConfirm = true">
          Reset Progress
        </button>
      </div>

      <div v-if="showConfirm" class="confirm-overlay" @click.self="showConfirm = false">
        <div class="confirm-dialog">
          <h3>Reset All Progress?</h3>
          <p>This will clear all XP, streaks, lesson progress, and SRS data. This cannot be undone.</p>
          <div class="confirm-actions">
            <button class="confirm-cancel" @click="showConfirm = false">Cancel</button>
            <button class="confirm-reset" @click="resetProgress">Reset Everything</button>
          </div>
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

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 24px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-red);
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.name-input {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  padding: 8px 16px;
  font-family: var(--font-family);
  color: var(--color-text);
  background: var(--color-card);
  width: 100%;
  max-width: 260px;
}

.name-input:focus {
  outline: none;
  border-color: var(--color-gold);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px 8px;
  text-align: center;
  box-shadow: var(--shadow);
}

.stat-value {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-red);
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-top: 4px;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 1.1rem;
  color: var(--color-text);
  margin-bottom: 16px;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.badge-item {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px;
  text-align: center;
  box-shadow: var(--shadow);
}

.badge-item.locked {
  opacity: 0.5;
}

.badge-icon {
  display: block;
  font-size: 1.6rem;
  margin-bottom: 4px;
}

.badge-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.badge-desc {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin-top: 2px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  padding: 14px 20px;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.retake {
  background: var(--color-gold);
  color: var(--color-text);
}

.reset {
  background: transparent;
  border: 2px solid #e74c3c;
  color: #e74c3c;
}

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.confirm-dialog {
  background: var(--color-card);
  border-radius: var(--radius);
  padding: 32px 24px;
  max-width: 360px;
  width: 90%;
  text-align: center;
}

.confirm-dialog h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: var(--color-text);
}

.confirm-dialog p {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: 24px;
}

.confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.confirm-cancel {
  padding: 10px 24px;
  border-radius: var(--radius);
  background: var(--color-border);
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
}

.confirm-reset {
  padding: 10px 24px;
  border-radius: var(--radius);
  background: #e74c3c;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
</style>
