# Learn Mandarin — Build Progress

## Current Status

**Last Updated:** 2026-06-30

### ✅ ALL PHASES COMPLETE — BUILD VERIFIED CLEAN
`npm run build` succeeds (467ms, 54 modules, no errors)
`dist/` folder ready for deploy — git working tree clean

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

### ⚠️ DEPLOY BLOCKED: Manual Setup Required (Not Automated)

**Problem:** No Cloudflare API token exists in this environment. `wrangler whoami` shows "You are not authenticated." The GitHub Actions workflow requires `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets.

**Two options to deploy:**

#### Option A: Local Deploy (fastest, 2 minutes)
```bash
cd ~/Work/learn-mandarin
npx wrangler login   # Opens browser for Cloudflare auth
bash deploy.sh       # After auth, runs build + deploy
```
Expected URL: https://learn-mandarin.pages.dev

#### Option B: GitHub Actions Auto-Deploy (one-time setup)
1. Create Cloudflare API Token: https://dash.cloudflare.com/profile/api-tokens
   - Name: `learn-mandarin-deploy`
   - Permissions: Account → Cloudflare Pages → Edit
2. Copy the token + your Account ID (from dashboard URL)
3. Add secrets at: https://github.com/znding04/learn-mandarin/settings/secrets-and-variables/actions
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Push any commit or manually run the workflow from Actions tab

See **DEPLOY.md** and **SECRETS_SETUP.md** for full step-by-step instructions.

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
