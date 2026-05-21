import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LessonsPage from './pages/LessonsPage.vue'
import StudyPage from './pages/StudyPage.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/lessons', component: LessonsPage },
  { path: '/study/:lessonId', component: StudyPage },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
