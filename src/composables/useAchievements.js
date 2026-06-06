import { reactive } from 'vue'

const STORAGE_KEY = 'mandarin-achievements'

const ACHIEVEMENTS = [
  { id: 'first_lesson', label: 'First Step', description: 'Complete your first lesson', icon: '🌱', condition: (state) => Object.keys(state.lessonComplete).length >= 1 },
  { id: 'five_lessons', label: 'Getting Started', description: 'Complete 5 lessons', icon: '🌿', condition: (state) => Object.keys(state.lessonComplete).length >= 5 },
  { id: 'streak_3', label: 'On a Roll', description: '3-day streak', icon: '🔥', condition: (state) => state.streak >= 3 },
  { id: 'streak_7', label: 'Week Warrior', description: '7-day streak', icon: '🔥', condition: (state) => state.streak >= 7 },
  { id: 'xp_100', label: 'Century Club', description: 'Earn 100 XP', icon: '⭐', condition: (state) => state.xp >= 100 },
  { id: 'xp_500', label: 'XP Master', description: 'Earn 500 XP', icon: '💎', condition: (state) => state.xp >= 500 },
  { id: 'first_review', label: 'Review Runner', description: 'Complete your first review session', icon: '📚', condition: (state) => state.reviewSessions >= 1 },
  { id: 'hsk1_done', label: 'HSK 1 Graduate', description: 'Complete all HSK 1 lessons', icon: '🎓', condition: (state) => Object.keys(state.lessonComplete).filter(id => Number(id) <= 15).length >= 15 },
]

function loadEarned() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

function saveEarned(earned) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(earned))
}

export function useAchievements() {
  const earned = reactive(loadEarned())

  function getAchievements() {
    return ACHIEVEMENTS.map(badge => ({
      ...badge,
      earned: earned.includes(badge.id),
    }))
  }

  function checkNewAchievements(progressState) {
    const state = {
      ...progressState,
      reviewSessions: parseInt(localStorage.getItem('mandarin-review-sessions') || '0', 10),
    }
    const newBadges = []
    for (const badge of ACHIEVEMENTS) {
      if (!earned.includes(badge.id) && badge.condition(state)) {
        earned.push(badge.id)
        newBadges.push(badge)
      }
    }
    if (newBadges.length > 0) {
      saveEarned([...earned])
    }
    return newBadges
  }

  return { getAchievements, checkNewAchievements }
}
