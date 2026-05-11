#!/bin/bash
# Learn Mandarin — Deploy Script
# Run this from the learn-mandarin directory
set -e

echo "=== Building ==="
npm run build

echo "=== Deploying to Cloudflare Pages ==="
echo "NOTE: You must first run 'npx wrangler login' to authenticate."
echo "Or set CLOUDFLARE_API_TOKEN environment variable with a Pages deploy token."
echo ""
echo "Deploy command:"
echo "  npx wrangler pages deploy dist --project-name=learn-mandarin"
echo ""
echo "Or if you have an API token:"
echo "  CLOUDFLARE_API_TOKEN=your_token npx wrangler pages deploy dist --project-name=learn-mandarin"
