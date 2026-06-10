# Learn Mandarin — Build Progress

## Current Status

**Last Updated:** 2026-06-09

### What's Built (Phases 1-3 + Tone Drill + Parent Dashboard) — READY FOR DEPLOY ✓
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
- **NEW: Tone Drill mini-game** (`/tone-drill`) — hear a word, select the tone (4 tones, 10 per session, +5 XP)
- **NEW: Parent Dashboard** (`/parent`) — XP, streak, lesson progress, vocabulary stats, achievements, recommendations
- GitHub Actions auto-deploy workflow (requires secrets - see SECRETS_SETUP.md)
- TEST_CHECKLIST.md for manual QA

### Bug Fixes (2026-05-31)
- **Fixed duplicate XP**: `completeLesson()` in useProgress.js already adds +20 XP; removed duplicate award in StudyPage.vue rate()
- **Fixed daily goal display**: Now tracks today's XP separately in localStorage (not `totalXP % DAILY_GOAL`)
- **Fixed pinyin hint**: Card front now shows "Tap to flip" (was redundant v-if/v-else that both showed "Tap to reveal")

### v1 Remaining Features
- HSK 3 vocabulary (content)
- Achievement badges UI page (badges are tracked in useAchievements.js but no dedicated display page yet)

## Deployment Status

### ⚠️ ACTION REQUIRED: GitHub Secrets Not Set
The GitHub Actions deploy workflow is configured but **failing** because secrets are not set.
Run #22 (2026-06-06) failed instantly at "Deploy to Cloudflare Pages" step — missing credentials.

**To deploy, you must add GitHub secrets:**
1. Create a Cloudflare API Token (Account → Cloudflare Pages → Edit permission)
2. Get your Cloudflare Account ID from the dashboard URL
3. Add as GitHub repo secrets: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`
   → https://github.com/znding04/learn-mandarin/settings/secrets-and-variables/actions

See **SECRETS_SETUP.md** for step-by-step instructions.

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
