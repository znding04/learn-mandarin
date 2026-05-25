#!/bin/bash
# Learn Mandarin — Deploy Script
# Run this from the learn-mandarin directory
set -e

echo "=== Building ==="
npm run build

echo "=== Cleaning up wrangler config (vite plugin generates Workers-style config that conflicts with Pages) ==="
if [ -f dist/wrangler.json ]; then
  python3 -c "
import json
with open('dist/wrangler.json', 'r') as f:
    cfg = json.load(f)
cfg.pop('assets', None)
cfg.pop('jsx_factory', None)
cfg.pop('jsx_fragment', None)
cfg.pop('rules', None)
cfg.pop('durable_objects', None)
cfg.pop('kv_namespaces', None)
cfg.pop('queues', None)
cfg.pop('r2_buckets', None)
cfg.pop('d1_databases', None)
cfg.pop('workers', None)
cfg.pop('workflows', None)
with open('dist/wrangler.json', 'w') as f:
    json.dump(cfg, f, indent=2)
print('Cleaned dist/wrangler.json')
"
fi

echo "=== Deploying to Cloudflare Pages ==="
echo "NOTE: You must first run 'npx wrangler login' to authenticate."
echo "Or set CLOUDFLARE_API_TOKEN environment variable with a Pages deploy token."
echo ""
echo "Deploy command:"
echo "  CLOUDFLARE_API_TOKEN=your_token npx wrangler pages deploy dist --project-name=learn-mandarin"
