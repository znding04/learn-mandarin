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
cfg.pop('compatibility_flags', None)
cfg.pop('legacy_env', None)
cfg.pop('dev', None)
cfg.pop('python_modules', None)
cfg.pop('triggers', None)
cfg.pop('vars', None)
cfg.pop('migrations', None)
cfg.pop('cloudchamber', None)
cfg.pop('send_email', None)
cfg.pop('vectorize', None)
cfg.pop('ai_search_namespaces', None)
cfg.pop('ai_search', None)
cfg.pop('hyperdrive', None)
cfg.pop('services', None)
cfg.pop('analytics_engine_datasets', None)
cfg.pop('dispatch_namespaces', None)
cfg.pop('mtls_certificates', None)
cfg.pop('pipelines', None)
cfg.pop('secrets_store_secrets', None)
cfg.pop('unsafe_hello_world', None)
cfg.pop('flagship', None)
cfg.pop('worker_loaders', None)
cfg.pop('ratelimits', None)
cfg.pop('vpc_services', None)
cfg.pop('vpc_networks', None)
cfg.pop('logfwdr', None)
with open('dist/wrangler.json', 'w') as f:
    json.dump(cfg, f, indent=2)
print('Cleaned dist/wrangler.json')
"
fi

echo "=== Deploying to Cloudflare Pages ==="
if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
  echo "Using CLOUDFLARE_API_TOKEN from environment"
  npx wrangler pages deploy dist --project-name=learn-mandarin --no-bundle
else
  echo "ERROR: CLOUDFLARE_API_TOKEN not set."
  echo "Set it with: export CLOUDFLARE_API_TOKEN=your_token"
  echo "Or set up GitHub Actions secrets as per DEPLOY.md"
  exit 1
fi
