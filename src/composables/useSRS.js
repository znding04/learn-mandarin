import { reactive } from 'vue'

const STORAGE_KEY = 'mandarin-srs'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { cards: {} }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const state = reactive(loadState())

export function useSRS() {
  function getDueCards(lessonId, allCards) {
    const now = Date.now()
    return allCards
      .filter((c) => c.lessonId === lessonId)
      .filter((c) => {
        const srs = state.cards[c.id]
        if (!srs) return true // never reviewed = due
        return srs.nextReview <= now
      })
  }

  function getCardsByLesson(lessonId, allCards) {
    return allCards.filter((c) => c.lessonId === lessonId)
  }

  function reviewCard(cardId, quality) {
    const card = state.cards[cardId] || {
      interval: 0,
      easeFactor: 2.5,
      nextReview: 0,
      repetitions: 0,
    }

    // SM-2 algorithm
    const q = quality
    let { interval, easeFactor, repetitions } = card

    if (q < 3) {
      repetitions = 0
      interval = 1
    } else {
      if (repetitions === 0) {
        interval = 1
      } else if (repetitions === 1) {
        interval = 6
      } else {
        interval = Math.round(interval * easeFactor)
      }
      repetitions += 1
    }

    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    if (easeFactor < 1.3) easeFactor = 1.3

    const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000

    state.cards[cardId] = { interval, easeFactor, nextReview, repetitions }
    saveState(state)
  }

  return { state, getDueCards, getCardsByLesson, reviewCard }
}
