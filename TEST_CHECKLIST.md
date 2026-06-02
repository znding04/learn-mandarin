# Learn Mandarin — Manual Test Checklist

## Test Setup
- Open the app at the deployed URL (or run locally with `npm run dev`)
- Clear localStorage between test runs for fresh state: `localStorage.clear()` in browser console

---

## Flow 1: New User — Landing → Study a Lesson

**Expected: Land on home page, see XP=0, streak=0, go through lesson, earn XP**

1. Open home page (`/`)
   - [ ] Hero shows "Learn Mandarin" title
   - [ ] "Chinese for ABC Kids" tagline visible
   - [ ] XP shows 0, streak shows 0
   - [ ] Daily goal bar shows 0%
   - [ ] "Continue Learning" button visible

2. Tap "Continue Learning" → `/lessons`
   - [ ] HSK 1 section visible with multiple lessons
   - [ ] Each lesson shows word count
   - [ ] "Start" buttons on lessons

3. Tap a lesson (e.g. Lesson 1) → `/study/1`
   - [ ] Flashcard shows Chinese character (large)
   - [ ] "Tap to flip" hint visible
   - [ ] Progress bar at top

4. Tap card to flip
   - [ ] Card flips with 3D animation
   - [ ] Shows pinyin + English translation
   - [ ] 🔊 speaker button visible (if Web Speech API available)

5. Rate card (Easy/Medium/Hard)
   - [ ] Advances to next card
   - [ ] Card resets to front side

6. Complete all cards in lesson
   - [ ] "Lesson Complete!" screen appears
   - [ ] "+20 XP" shown
   - [ ] "Study Again" and "Back to Lessons" buttons work

7. Return to home page
   - [ ] XP increased (check value)
   - [ ] Streak updated if first study today

---

## Flow 2: Review Due — Cross-Lesson Review

**Expected: Cards reviewed today are due again after interval passes**

1. Study some cards today
2. Wait (or simulate via localStorage - set `nextReview` in `mandarin-srs` to past timestamp)
3. Go to home page
   - [ ] "📚 X cards due for review" banner appears
4. Tap the review banner → `/review`
   - [ ] Shows cards due across all lessons
   - [ ] Due count displayed
5. Complete review session
   - [ ] Session complete screen shows cards reviewed

---

## Flow 3: Streak & XP Display

**Expected: Streak increments on consecutive days, XP accumulates**

1. After first study session:
   - [ ] Streak shows 1
   - [ ] XP shows > 0
2. Complete daily goal (50 XP):
   - [ ] "Daily goal reached!" message
   - [ ] Goal bar at 100%

---

## Mobile-Specific Checks

1. Open DevTools → toggle device toolbar (iPhone SE / Pixel 5)
   - [ ] No horizontal scroll
   - [ ] Chinese characters are large and readable (4rem minimum)
   - [ ] Tap targets (buttons) are at least 44px
   - [ ] Nav bar is usable on small screens

2. Pinyin toggle:
   - [ ] Toggle on flashcard back shows pinyin
   - [ ] Toggle off hides pinyin

---

## TTS (Text-to-Speech)

1. On Study page, flip a card
2. Tap 🔊 speaker button
   - [ ] Chinese pronunciation plays
   - [ ] No console errors

---

## Empty States

1. All cards studied, no due cards:
   - [ ] Home page shows "All caught up!" on review banner (no banner if 0 due)
   - [ ] Review page shows "All caught up!" empty state

---

## Edge Cases

1. Go to `/review` with no cards due:
   - [ ] Empty state shown with "All caught up!" message
   - [ ] "Go to Lessons" button works

2. Go to `/study/999` (non-existent lesson):
   - [ ] No crash (shows "Loading cards..." then empty)
