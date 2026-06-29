<script setup>
import NavBar from '../components/NavBar.vue'
import { useAchievements } from '../composables/useAchievements.js'
import { useProgress } from '../composables/useProgress.js'

const { getAchievements } = useAchievements()
const { state } = useProgress()

const achievements = getAchievements()
const earnedCount = achievements.filter(a => a.earned).length
</script>

<template>
  <div class="achievements-page">
    <NavBar :showBack="true" />
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">🏆 My Badges</h1>
        <p class="page-subtitle">{{ earnedCount }} of {{ achievements.length }} badges earned</p>
      </div>

      <div class="badge-grid">
        <div
          v-for="badge in achievements"
          :key="badge.id"
          class="badge-card"
          :class="{ earned: badge.earned, locked: !badge.earned }"
        >
          <div class="badge-icon">{{ badge.icon }}</div>
          <div class="badge-name">{{ badge.label }}</div>
          <div class="badge-desc">{{ badge.description }}</div>
          <div v-if="badge.earned" class="badge-earned-tag">Earned!</div>
          <div v-else class="badge-locked-tag">Locked</div>
        </div>
      </div>

      <div class="motivation">
        <p v-if="earnedCount === 0">Start learning to earn your first badge!</p>
        <p v-else-if="earnedCount < achievements.length">
          Keep going! {{ achievements.length - earnedCount }} more badge{{ achievements.length - earnedCount === 1 ? '' : 's' }} to unlock.
        </p>
        <p v-else>🎉 Amazing! You've earned all available badges!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.achievements-page {
  min-height: 100vh;
  background: var(--color-bg);
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 16px 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 28px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--color-text-light);
}

.badge-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 24px;
}

.badge-card {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}

.badge-card.earned {
  border-color: var(--color-gold);
  background: linear-gradient(135deg, #fff 0%, #fffdf0 100%);
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.15);
}

.badge-card.locked {
  opacity: 0.55;
  filter: grayscale(0.4);
}

.badge-icon {
  font-size: 2.8rem;
  line-height: 1;
}

.badge-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
}

.badge-desc {
  font-size: 0.75rem;
  color: var(--color-text-light);
  line-height: 1.3;
}

.badge-earned-tag {
  margin-top: 4px;
  background: var(--color-gold);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 10px;
}

.badge-locked-tag {
  margin-top: 4px;
  background: var(--color-border);
  color: var(--color-text-light);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 10px;
}

.motivation {
  text-align: center;
  padding: 16px;
  background: var(--color-card);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.motivation p {
  color: var(--color-text);
  font-size: 0.95rem;
  margin: 0;
}

@media (max-width: 400px) {
  .badge-grid {
    grid-template-columns: 1fr;
  }
}
</style>
