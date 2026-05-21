<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="illustration">🏯🏮🐉</div>
      <h1 class="title">404</h1>
      <p class="message">Oops! This page wandered off.</p>
      <button class="home-btn" @click="router.push('/')">Go Home</button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: 24px;
}

.not-found-content {
  text-align: center;
}

.illustration {
  font-size: 4rem;
  margin-bottom: 16px;
  letter-spacing: 8px;
}

.title {
  font-size: 5rem;
  font-weight: 700;
  color: var(--color-red);
  margin-bottom: 8px;
  line-height: 1;
}

.message {
  font-size: 1.2rem;
  color: var(--color-text-light);
  margin-bottom: 32px;
}

.home-btn {
  background: var(--color-gold);
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 700;
  padding: 14px 36px;
  border-radius: var(--radius);
  min-height: 44px;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
</style>
