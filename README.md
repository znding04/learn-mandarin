# Learn Mandarin — Free Chinese Learning for ABC Kids

> Chinese for ABC Kids — a free, open-source web app for heritage learners

**Tech Stack:** Vue 3 + Vite + Cloudflare Pages
**Target:** ABC kids (ages 5-14) learning Simplified Chinese
**No backend required** — all data stored in localStorage

## Features

### Core Learning
- **HSK-aligned vocabulary** — HSK 1 (147 words) + HSK 2 (80 words) = 227 total words
- **Spaced repetition flashcards** — SM-2 algorithm for optimal review scheduling
- **Heritage placement test** — bypass basic content if you already speak Chinese
- **Pinyin toggle** — show/hide pronunciation guides

### Gamification
- **XP system** — +5 per card, +20 per lesson, +50 daily goal bonus
- **Streak tracking** — daily study streaks with freeze earned via achievements
- **Achievement badges** — 8 badges for milestones (first card, 7-day streak, etc.)

### Pages
| Route | Description |
|-------|-------------|
| `/` | Home — XP, streak, daily goal progress |
| `/lessons` | Browse 23 lessons across HSK 1-2 |
| `/study/:id` | Flashcard study session with flip animation |
| `/review` | Review all cards due across all lessons |
| `/placement` | Heritage learner placement test |
| `/profile` | User profile (name, age) |
| `/tone-drill` | Tone practice mini-game (4 tones, 10 per session) |
| `/parent` | Parent dashboard — progress, stats, recommendations |

### Audio
- Web Speech API TTS for Chinese pronunciation (no API key needed)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deploy to Cloudflare Pages

### GitHub Actions (auto-deploy)
1. Create a Cloudflare API Token with Pages > Edit permission
2. Get your Cloudflare Account ID from the dashboard URL
3. Add as GitHub repo secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Push to `main` — deployment happens automatically

See [SECRETS_SETUP.md](SECRETS_SETUP.md) for step-by-step instructions.

**Expected URL:** `https://learn-mandarin.pages.dev`

### Manual Deploy (local)
```bash
export CLOUDFLARE_API_TOKEN=your_token
export CLOUDFLARE_ACCOUNT_ID=your_account_id
npm run build
npx wrangler pages deploy dist --project-name=learn-mandarin --no-bundle
```

## Content

Vocabulary stored in `public/content/`:
- `hsk1-vocab.json` — 147 HSK 1 words (15 lessons)
- `hsk2-vocab.json` — 80 HSK 2 words (lessons 16-23)

## Project Structure

```
learn-mandarin/
├── public/content/        # Vocabulary JSON files
├── src/
│   ├── components/        # NavBar, HeritageBanner
│   ├── composables/       # useProgress, useSRS, useAchievements
│   ├── pages/            # All route components
│   ├── App.vue           # Root component
│   ├── main.js           # Entry point
│   ├── router.js         # Vue Router config
│   └── style.css         # Global styles
├── wrangler.jsonc        # Cloudflare Pages config
└── deploy.sh             # Build + deploy script
```

## Related

- [SPEC.md](SPEC.md) — Full product specification
- [PROGRESS.md](PROGRESS.md) — Build progress and deployment status
- [DEPLOY.md](DEPLOY.md) — Alternative deployment guide
- [TEST_CHECKLIST.md](TEST_CHECKLIST.md) — QA checklist

**Sister project:** [learn-some-ai](https://github.com/znding04/learn-some-ai) — AI learning for kids
