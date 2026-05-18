# Deploying Learn Mandarin to Cloudflare Pages

This app auto-deploys via GitHub Actions on every push to `main`. Before that works, you need to set up two secrets in your GitHub repo.

## Step 1: Create a Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token** → **Create Custom Token**
3. Configure the token:
   - **Token name**: `learn-mandarin-deploy` (or any name you like)
   - **Permissions**: Account → Cloudflare Pages → Edit
   - **Account Resources**: Select your specific account
4. Click **Continue to summary** → **Create Token**
5. **Copy the token value** — you won't be able to see it again

## Step 2: Find Your Cloudflare Account ID

Your Account ID is visible in:
- The Cloudflare dashboard URL: `https://dash.cloudflare.com/<ACCOUNT_ID>/...`
- Or on the **Workers & Pages** overview page in the right sidebar

## Step 3: Add Secrets to GitHub

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:

   | Name | Value |
   |------|-------|
   | `CLOUDFLARE_API_TOKEN` | The token from Step 1 |
   | `CLOUDFLARE_ACCOUNT_ID` | The account ID from Step 2 |

## Step 4: Deploy

Push to `main` or manually trigger the workflow from the **Actions** tab. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will build and deploy automatically.

## Troubleshooting

- **"Authentication error"**: Double-check your API token has the correct permissions (Account → Cloudflare Pages → Edit).
- **"Project not found"**: The first deploy creates the project `learn-mandarin` on Cloudflare Pages. If it fails, ensure your account ID is correct.
- **Build fails locally**: Run `npm run build` to verify the build works before pushing.
