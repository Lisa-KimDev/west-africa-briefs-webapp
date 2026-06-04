# Deployment Setup

## Vercel Deploy Hook (Required for Auto-Rebuilds)

The site is fully static — all pages are pre-rendered at build time. When a new brief is pushed to the data repo, the site needs to be rebuilt.

### One-Time Setup

1. Go to your Vercel project dashboard: `https://vercel.com/webara-studio/west-africa-briefs-webapp`
2. Navigate to **Settings → Git → Deploy Hooks**
3. Create a new deploy hook:
   - **Name:** `New Brief Published`
   - **Branch:** `main`
   - **Build command:** (leave default)
4. Copy the generated hook URL (looks like `https://api.vercel.com/v1/integrations/deploy/...`)
5. Go to the **data repo** on GitHub: `https://github.com/Oswald-Benjamin/west-africa-daily-briefs/settings/secrets/actions`
6. Add a new repository secret:
   - **Name:** `VERCEL_DEPLOY_HOOK`
   - **Value:** (paste the hook URL from step 4)

### How It Works

```
New brief pushed to data repo
  → GitHub Action detects change in briefs/ or site/data/
  → POST request to Vercel deploy hook
  → Vercel rebuilds the webapp (all 22+ pages pre-rendered)
  → New brief is live on the site in ~60 seconds
```

### Manual Deploy (First Time)

Until the deploy hook is set up, you can trigger the first deploy manually:

```bash
cd west-africa-briefs-webapp
vercel --prod
```

Or push to the `main` branch — if Vercel is already connected to the GitHub repo, it will auto-deploy on push.
