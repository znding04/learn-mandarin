<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  showBack: { type: Boolean, default: false },
})

const router = useRouter()
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-brand">Learn Mandarin</router-link>
    <button v-if="showBack" class="navbar-back" @click="router.back()">
      &larr; Back
    </button>
    <router-link v-else to="/" class="navbar-home">Home</router-link>
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
