<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProgress } from '../composables/useProgress.js'
import { useSRS } from '../composables/useSRS.js'
import { useAchievements } from '../composables/useAchievements.js'

const router = useRouter()
const { state, getStreak } = useProgress()
const { getDueCards } = useSRS()
const { checkNewAchievements } = useAchievements()

const DAILY_GOAL = 50
// Track XP earned today separately (not modulo of total XP)
const todayStr = () => new Date().toISOString().slice(0, 10)
const xpToday = computed(() => {
  const lastDate = localStorage.getItem('mandarin-xp-date')
  if (lastDate !== todayStr()) return 0
  return parseInt(localStorage.getItem('mandarin-xp-today') || '0', 10)
})
const xpRemaining = computed(() => Math.max(DAILY_GOAL - xpToday.value, 0))
const goalPercent = computed(() => Math.min((xpToday.value / DAILY_GOAL) * 100, 100))
const goalReached = computed(() => xpToday.value >= DAILY_GOAL)
const dueCount = ref(0)
const toast = ref(null)

onMounted(async () => {
  const [hsk1, hsk2] = await Promise.all([
    fetch('/content/hsk1-vocab.json').then(r => r.json()),
    fetch('/content/hsk2-vocab.json').then(r => r.json()).catch(() => []),
  ])
  const allVocab = [...hsk1, ...hsk2]
  const due = getDueCards(null, allVocab)
  dueCount.value = due.length

  // Check for new achievements
  const newBadges = checkNewAchievements(state)
  if (newBadges.length > 0) {
    const badge = newBadges[0]
    toast.value = `${badge.icon} ${badge.label} — You earned a new badge!`
    setTimeout(() => { toast.value = null }, 3500)
  }
})
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
      <div v-if="dueCount > 0" class="review-banner" @click="router.push('/review')">
        📚 {{ dueCount }} card{{ dueCount === 1 ? '' : 's' }} due for review
      </div>

      <div class="hero-links">
        <a href="https://ljding.app" target="_blank" rel="noopener">View my portfolio → ljding.app</a>
        <span class="link-sep">|</span>
        <a href="https://github.com/znding04/learn-mandarin" target="_blank" rel="noopener">View source on GitHub → github.com/znding04/learn-mandarin</a>
      </div>
    </div>
    <transition name="toast">
      <div v-if="toast" class="achievement-toast">{{ toast }}</div>
    </transition>
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

.review-banner {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.review-banner:hover {
  background: rgba(255, 255, 255, 0.25);
}

.achievement-toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-card);
  color: var(--color-text);
  padding: 14px 24px;
  border-radius: var(--radius);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  font-size: 1rem;
  z-index: 50;
  white-space: nowrap;
}

.toast-enter-active {
  animation: slideUp 0.4s ease;
}

.toast-leave-active {
  animation: slideUp 0.3s ease reverse;
}

.hero-links {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
}

.hero-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;
}

.hero-links a:hover {
  color: rgba(255, 255, 255, 1);
}

.link-sep {
  color: rgba(255, 255, 255, 0.4);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
