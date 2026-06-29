import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LessonsPage from './pages/LessonsPage.vue'
import StudyPage from './pages/StudyPage.vue'
import ReviewPage from './pages/ReviewPage.vue'
import PlacementPage from './pages/PlacementPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ToneDrillPage from './pages/ToneDrillPage.vue'
import ParentDashboard from './pages/ParentDashboard.vue'
import AchievementsPage from './pages/AchievementsPage.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/lessons', component: LessonsPage },
  { path: '/study/:lessonId', component: StudyPage },
  { path: '/review', component: ReviewPage },
  { path: '/placement', component: PlacementPage },
  { path: '/profile', component: ProfilePage },
  { path: '/tone-drill', component: ToneDrillPage },
  { path: '/parent', component: ParentDashboard },
  { path: '/achievements', component: AchievementsPage },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
