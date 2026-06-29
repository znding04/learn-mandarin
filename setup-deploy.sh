#!/bin/bash
# Learn Mandarin — One-Time Cloudflare Setup for Deploy
# Run this ONCE on your local Mac to enable auto-deploy
# After running this, GitHub Actions will auto-deploy on every push to main

set -e

echo "=== Learn Mandarin — Cloudflare Deploy Setup ==="
echo ""

# Check if already authenticated
echo "1. Checking wrangler authentication..."
if npx wrangler whoami &>/dev/null; then
    echo "   ✓ Already authenticated with Cloudflare"
else
    echo "   → Opening browser to authenticate with Cloudflare..."
    npx wrangler login
fi

# Get account ID
echo ""
echo "2. Getting Cloudflare Account ID..."
ACCOUNT_ID=$(npx wrangler whoami 2>/dev/null | grep -oP '(?<=account_id:\s)[a-f0-9-]+' | head -1 || echo "")
if [ -z "$ACCOUNT_ID" ]; then
    echo "   ERROR: Could not get account ID. Make sure you're logged in."
    exit 1
fi
echo "   Account ID: $ACCOUNT_ID"

# Get API token info
echo ""
echo "3. API Token for GitHub Actions..."
echo "   GitHub Actions needs a CLOUDFLARE_API_TOKEN (not OAuth token)."
echo "   → Create a token at: https://dash.cloudflare.com/profile/api-tokens"
echo "   → Click 'Create Token' → 'Edit Cloudflare Pages' template"
echo "   → Account: select your account, Zone: don't include"
echo "   → Copy the token (starts with 'Cf...')"

echo ""
read -p "Paste your Cloudflare API Token (starts with Cf...): " API_TOKEN

if [ -z "$API_TOKEN" ] || [ ${#API_TOKEN} -lt 20 ]; then
    echo "   ERROR: Invalid token"
    exit 1
fi

# Set GitHub secrets
echo ""
echo "4. Setting GitHub secrets..."
gh secret set CLOUDFLARE_API_TOKEN --body "$API_TOKEN"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "$ACCOUNT_ID"

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "Your app will now auto-deploy to https://learn-mandarin.pages.dev"
echo "on every push to the main branch."
echo ""
echo "Test it now with:"
echo "   cd ~/Work/learn-mandarin"
echo "   git push origin main"
