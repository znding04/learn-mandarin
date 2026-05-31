# Learn Mandarin — Build Progress

## Current Status

**Last Updated:** 2026-05-31

### What's Built (Phases 1-3 Complete)
- Vue 3 + Vite + Cloudflare Pages setup
- Landing page with hero, XP display, daily goal progress bar, streak counter
- Lessons browser (15 HSK 1 lessons with ~120 vocab words)
- Flashcard study page with 3D flip animation
- SM-2 spaced repetition system (localStorage-based)
- Web Speech API TTS pronunciation (Chinese voice)
- Gamification: XP awards, streak tracking, lesson completion badges
- Pinyin toggle on/off
- Heritage speaker banner (skip to Level 3+)
- GitHub Actions auto-deploy workflow

### Bug Fixes (2026-05-31)
- **Fixed duplicate XP**: `completeLesson()` in useProgress.js already adds +20 XP; removed duplicate award in StudyPage.vue rate()
- **Fixed daily goal display**: Now tracks today's XP separately in localStorage (not `totalXP % DAILY_GOAL`)
- **Fixed pinyin hint**: Card front now shows "Tap to flip" (was redundant v-if/v-else that both showed "Tap to reveal")

## Deployment Status

### GitHub Actions Deploy: **FAILING**
Error: `Input required and not supplied: apiToken`
- `CLOUDFLARE_API_TOKEN` secret is **not set** in GitHub repo
- `CLOUDFLARE_ACCOUNT_ID` secret is **not set** in GitHub repo

### To Enable Auto-Deploy
Follow DEPLOY.md setup steps:

1. **Create Cloudflare API Token**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token" → "Create Custom Token"
   - Name: `learn-mandarin-deploy`
   - Permissions: Account → Cloudflare Pages → Edit
   - Account Resources: Select your account
   - Copy the token value

2. **Get Your Account ID**
   - Visible in Cloudflare dashboard URL: `dash.cloudflare.com/<ACCOUNT_ID>/...`
   - Or on Workers & Pages overview page

3. **Add GitHub Secrets**
   - Go to: https://github.com/znding04/learn-mandarin/settings/secrets-and-variables/actions
   - Add `CLOUDFLARE_API_TOKEN` = your API token
   - Add `CLOUDFLARE_ACCOUNT_ID` = your account ID

4. **Trigger Deploy**
   - Push any commit, or manually trigger from GitHub Actions tab
   - Expected URL after deploy: `https://learn-mandarin.pages.dev`

### Local Deploy (requires credentials)
```bash
cd ~/Work/learn-mandarin
export CLOUDFLARE_API_TOKEN=your_token_here
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
