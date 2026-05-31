import { reactive } from 'vue'

const STORAGE_KEY = 'mandarin-progress'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { lessonComplete: {}, streak: 0, lastStudyDate: null, xp: 0 }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const state = reactive(loadState())

export function useProgress() {
  function completeLesson(lessonId) {
    if (!state.lessonComplete[lessonId]) {
      state.lessonComplete[lessonId] = true
      addXP(20)
    }
    updateStreak()
    saveState(state)
  }

  function addXP(amount) {
    state.xp += amount
    // Track daily XP for the goal bar
    const today = todayStr()
    const storedDate = localStorage.getItem('mandarin-xp-date')
    const storedTodayXP = parseInt(localStorage.getItem('mandarin-xp-today') || '0', 10)
    if (storedDate === today) {
      localStorage.setItem('mandarin-xp-today', storedTodayXP + amount)
    } else {
      localStorage.setItem('mandarin-xp-date', today)
      localStorage.setItem('mandarin-xp-today', amount)
    }
    saveState(state)
  }

  function updateStreak() {
    const today = todayStr()
    if (state.lastStudyDate === today) return

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().slice(0, 10)

    if (state.lastStudyDate === yesterdayStr) {
      state.streak += 1
    } else if (state.lastStudyDate !== today) {
      state.streak = 1
    }
    state.lastStudyDate = today
  }

  function getStreak() {
    const today = todayStr()
    if (state.lastStudyDate === today) return state.streak

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().slice(0, 10)

    if (state.lastStudyDate === yesterdayStr) return state.streak
    return 0
  }

  function isLessonComplete(lessonId) {
    return !!state.lessonComplete[lessonId]
  }

  return { state, completeLesson, addXP, getStreak, isLessonComplete }
}
