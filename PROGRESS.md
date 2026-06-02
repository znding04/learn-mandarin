# Learn Mandarin — Build Progress

## Current Status

**Last Updated:** 2026-06-02

### What's Built (Phases 1-3 + Review Page Complete)
- Vue 3 + Vite + Cloudflare Pages setup
- Landing page with hero, XP display, daily goal progress bar, streak counter
- Lessons browser (15 HSK 1 lessons with ~150 vocab words)
- Flashcard study page with 3D flip animation
- SM-2 spaced repetition system (localStorage-based)
- Web Speech API TTS pronunciation (Chinese voice)
- Gamification: XP awards, streak tracking, lesson completion badges
- Pinyin toggle on/off
- Heritage speaker banner (skip to Level 3+)
- **NEW: Review Due page** (`/review`) - shows all cards due across all HSK levels
- **NEW: HSK 2 vocabulary** (80 words, lessons 16-23)
- **NEW: Home page review banner** - shows due card count on home page
- GitHub Actions auto-deploy workflow (requires secrets - see SECRETS_SETUP.md)
- TEST_CHECKLIST.md for manual QA

### Bug Fixes (2026-05-31)
- **Fixed duplicate XP**: `completeLesson()` in useProgress.js already adds +20 XP; removed duplicate award in StudyPage.vue rate()
- **Fixed daily goal display**: Now tracks today's XP separately in localStorage (not `totalXP % DAILY_GOAL`)
- **Fixed pinyin hint**: Card front now shows "Tap to flip" (was redundant v-if/v-else that both showed "Tap to reveal")

### v1 Remaining Features
- Heritage placement test (20 Q, adaptive)
- User profiles (name, age, avatar)
- Achievement badges UI
- Tone drill mini-game
- Parent dashboard
- HSK 3 vocabulary

## Deployment Status

### GitHub Actions Deploy: BLOCKED - requires manual secrets setup
See **SECRETS_SETUP.md** for step-by-step instructions. Summary:
1. Create Cloudflare API Token (Account - Cloudflare Pages - Edit)
2. Get Cloudflare Account ID from dashboard URL
3. Add both as GitHub repo secrets: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`
4. Push any commit to trigger deploy

**Expected URL after deploy: `https://learn-mandarin.pages.dev`**

### Local Deploy (requires credentials)
```bash
cd ~/Work/learn-mandarin
export CLOUDFLARE_API_TOKEN=your_token
export CLOUDFLARE_ACCOUNT_ID=your_account_id
bash deploy.sh
```

## Local Build (no deploy)
```bash
cd ~/Work/learn-mandarin
npm run build
# Output in dist/
npx wrangler pages dev dist  # Preview locally
```

## Content Stats
- HSK 1: 147 vocabulary words (15 lessons)
- HSK 2: 80 vocabulary words (lessons 16-23)
- Total: 227 vocabulary words
