<script setup>
import { useRouter } from 'vue-router'
import { useProgress } from '../composables/useProgress.js'

const router = useRouter()
const { state, getStreak } = useProgress()
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
      <p class="hero-subtitle">Free, fun, and made for you</p>
      <button class="hero-btn" @click="router.push('/lessons')">
        Start Learning
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
