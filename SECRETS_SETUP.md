# Cloudflare Pages — Enable Auto-Deploy

The GitHub Actions workflow at `.github/workflows/deploy.yml` will automatically build and deploy your app to Cloudflare Pages on every push to `main`. To enable it, you need to add two secrets to your GitHub repo.

---

## Step 1: Get Your Cloudflare Account ID

Your Account ID is visible in the Cloudflare dashboard URL:
- Look at: `https://dash.cloudflare.com/<ACCOUNT_ID>/...`
- Or on the Workers & Pages overview page (right sidebar)

Copy this ID — you'll need it in Step 3.

---

## Step 2: Create a Cloudflare API Token

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token** → **Create Custom Token**
3. Configure the token:
   - **Token name**: `learn-mandarin-deploy` (or any name you like)
   - **Permissions**: Account → Cloudflare Pages → **Edit**
   - **Account Resources**: Select your specific account
4. Click **Continue to summary** → **Create Token**
5. **Copy the token value immediately** — you cannot see it again after leaving this page

---

## Step 3: Add Secrets to GitHub

1. Go to your repo: https://github.com/znding04/learn-mandarin/settings/secrets-and-variables/actions
2. Click **New repository secret** (top right)
3. Add two secrets:

| Name | Value |
|------|-------|
| `CLOUDFLARE_API_TOKEN` | The token from Step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID from Step 1 |

4. Click **Add secret** for each

---

## Step 4: Trigger First Deploy

Once the secrets are set, push any commit (or go to the **Actions** tab → find the deploy workflow → click **Run workflow**).

The deploy takes ~30-60 seconds. On success, your app will be live at:
```
https://learn-mandarin.pages.dev
```

---

## Troubleshooting

- **"Authentication error"**: Double-check the API token has "Account → Cloudflare Pages → Edit" permission.
- **"Project not found"**: The first deploy creates the `learn-mandarin` Pages project. If it fails, verify your Account ID is correct.
- **Build fails locally**: Run `npm run build` locally first to verify the build works before pushing.
