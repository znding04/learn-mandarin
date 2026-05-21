<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgress } from '../composables/useProgress.js'

const router = useRouter()
const { state, getStreak } = useProgress()

const DAILY_GOAL = 50
const xpToday = computed(() => state.xp % DAILY_GOAL)
const xpRemaining = computed(() => DAILY_GOAL - xpToday.value)
const goalPercent = computed(() => Math.min((xpToday.value / DAILY_GOAL) * 100, 100))
const goalReached = computed(() => xpToday.value >= DAILY_GOAL)
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">Learn Mandarin</h1>
      <p class="hero-tagline">Chinese for ABC Kids</p>
      <div class="hero-stats">
        <span class="stat-badge">⭐ {{ state.xp }} XP</span>
        <span class="stat-badge">🔥 {{ getStreak() }} day streak</span>
      </div>

      <!-- Daily goal progress -->
      <div class="daily-goal">
        <div class="goal-bar">
          <div class="goal-fill" :style="{ width: goalPercent + '%' }"></div>
        </div>
        <p class="goal-text" v-if="goalReached">Daily goal reached!</p>
        <p class="goal-text" v-else>{{ xpRemaining }} XP until daily goal!</p>
      </div>

      <p class="hero-subtitle">Free, fun, and made for you</p>
      <button class="hero-btn" @click="router.push('/lessons')">
        Continue Learning
      </button>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-red) 0%, var(--color-red-light) 100%);
}

.hero {
  text-align: center;
  padding: 40px 24px;
  color: #fff;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.hero-tagline {
  font-size: 1.4rem;
  font-weight: 500;
  opacity: 0.95;
  margin-bottom: 4px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 12px 0;
}

.stat-badge {
  background: rgba(243, 156, 18, 0.15);
  color: var(--color-gold);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
}

/* Daily goal */
.daily-goal {
  margin: 16px auto 8px;
  max-width: 280px;
}

.goal-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 6px;
}

.goal-fill {
  height: 100%;
  background: var(--color-gold);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.goal-text {
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: 500;
}

.hero-subtitle {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 32px;
}

.hero-btn {
  background: var(--color-gold);
  color: var(--color-text);
  font-size: 1.2rem;
  font-weight: 700;
  padding: 14px 40px;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s, box-shadow 0.15s;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-tagline {
    font-size: 1.1rem;
  }
}
</style>
