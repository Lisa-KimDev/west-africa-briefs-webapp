# Deployment & Scaling Guide

## Architecture

The site uses a hybrid static + ISR approach designed to scale to hundreds of briefs without slowing down:

| Page Type | Strategy | Behaviour |
|-----------|----------|-----------|
| **Home, Archive, Calendar, Newsletter, About** | ISR (revalidate: 1h) | Pre-rebuilt every hour, always fresh |
| **Category pages** | ISR (revalidate: 1h) | Pre-rebuilt every hour, always fresh |
| **Brief reader pages** | SSG (60 most recent) + ISR (1h) for the rest | Recent briefs are instant; older briefs generated on first visit and cached |

## How It Scales

| # Briefs | Build Time | Pages at Build | On-Demand (ISR) |
|----------|-----------|----------------|-----------------|
| 7 (now) | ~10s | ~22 | 0 |
| 60 | ~15s | ~75 | 0 |
| 200 | ~20s | ~75 | 140 (generated on first visit) |
| 500 | ~25s | ~75 | 440 (generated on first visit) |

**Key point:** Build time stays roughly constant regardless of how many briefs exist. Only the 60 most recent are pre-rendered. Older briefs are generated lazily when first visited, then cached permanently.

## Auto-Rebuild Pipeline

```
New brief pushed to data repo (2:14am UTC)
  → GitHub Action detects change in briefs/ or site/data/
  → POST request to Vercel deploy hook
  → Vercel rebuilds list pages (~15-20 seconds)
  → New brief is live on Home, Archive, Calendar, Category pages
  → Brief reader page generated on first visit (ISR)
```

## One-Time Vercel Setup

1. Go to **Vercel** → New Project → Import `Webara-Studio/west-africa-briefs-webapp`
2. Framework: Next.js (auto-detected)
3. Build command: `next build` (default)
4. After first deploy, go to **Settings → Git → Deploy Hooks**
5. Create hook: Name = "New Brief Published", Branch = `main`
6. Copy the hook URL
7. Go to data repo → Settings → Secrets → Actions → New secret:
   - **Name:** `VERCEL_DEPLOY_HOOK`
   - **Value:** (paste hook URL)

## Vercel Free Tier Limits

| Limit | Free Tier | Our Usage |
|-------|-----------|-----------|
| Build time | 6,000 min/month | ~30-60 min/month (daily deploys) |
| Bandwidth | 100 GB/month | Minimal (static HTML) |
| Serverless executions | 100,000/day | Minimal (ISR only) |
| Team members | 1 | Fine for now |

**We won't hit any free tier limits even at 500+ briefs.**
