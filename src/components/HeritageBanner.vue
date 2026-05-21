<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dismissed = ref(true)

onMounted(() => {
  dismissed.value = localStorage.getItem('heritage-banner-dismissed') === 'true'
})

function dismiss() {
  dismissed.value = true
  localStorage.setItem('heritage-banner-dismissed', 'true')
}

function startHeritage() {
  dismiss()
  router.push('/lessons')
}
</script>

<template>
  <div v-if="!dismissed" class="heritage-banner">
    <button class="dismiss-btn" @click="dismiss">&times;</button>
    <p class="banner-text">Heritage speaker? Start from Level 3+ to skip what you already know!</p>
    <button class="heritage-btn" @click="startHeritage">Start Heritage Path</button>
  </div>
</template>

<style scoped>
.heritage-banner {
  position: relative;
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: #fff;
  padding: 16px 40px 16px 16px;
  text-align: center;
  font-size: 0.95rem;
}

.banner-text {
  margin-bottom: 10px;
  font-weight: 500;
  line-height: 1.4;
}

.heritage-btn {
  background: #fff;
  color: #e67e22;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 20px;
  border-radius: var(--radius);
  min-height: 44px;
}

.heritage-btn:hover {
  background: #fff8f0;
}

.dismiss-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.dismiss-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
