<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useProgress } from '../composables/useProgress.js'

const props = defineProps({
  showBack: { type: Boolean, default: false },
})

const router = useRouter()
const route = useRoute()
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
      <router-link
        v-else-if="route.path !== '/'"
        to="/"
        class="navbar-link"
        :class="{ active: route.path === '/' }"
      >Home</router-link>
      <router-link
        v-if="!showBack && route.path !== '/lessons'"
        to="/lessons"
        class="navbar-link"
        :class="{ active: route.path === '/lessons' }"
      >Lessons</router-link>
      <router-link
        v-if="!showBack && route.path !== '/profile'"
        to="/profile"
        class="navbar-profile"
      >👤</router-link>
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
.navbar-link {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 10px 16px;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-back:hover,
.navbar-link:hover {
  background: rgba(255, 255, 255, 0.3);
}

.navbar-link.active {
  background: rgba(255, 255, 255, 0.35);
  font-weight: 700;
}

.navbar-profile {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 6px 10px;
  border-radius: 50%;
  font-size: 1rem;
  min-height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-profile:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
