<script setup>
import { useRouter } from 'vue-router'
import { useProgress } from '../composables/useProgress.js'

const props = defineProps({
  showBack: { type: Boolean, default: false },
})

const router = useRouter()
const { state, getStreak } = useProgress()
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-brand">Learn Mandarin</router-link>
    <div class="navbar-right">
      <span class="navbar-stats">⭐{{ state.xp }} 🔥{{ getStreak() }}</span>
      <button v-if="showBack" class="navbar-back" @click="router.back()">
        &larr; Back
      </button>
      <router-link v-else to="/" class="navbar-home">Home</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--color-red);
  color: #fff;
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-stats {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.navbar-back,
.navbar-home {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 6px 14px;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
}

.navbar-back:hover,
.navbar-home:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
