import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LessonsPage from './pages/LessonsPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/lessons', component: LessonsPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
