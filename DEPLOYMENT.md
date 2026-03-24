# Deployment Guide

This guide covers all deployment options for GitHub Readme Stats.

## Table of Contents

- [Deploy to Vercel (Recommended)](#deploy-to-vercel-recommended)
- [Environment Configuration](#environment-configuration)
- [Local Development](#local-development)
- [Monitoring](#monitoring)
- [Rollback Procedures](#rollback-procedures)

---

## Deploy to Vercel (Recommended)

Vercel is the recommended hosting platform for GitHub Readme Stats.

### Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [GitHub Personal Access Token (PAT)](https://github.com/settings/tokens/new) with `read:user` and `repo` scopes

### Quick Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/negiadventures/github-readme-stats)

### Step-by-Step

1. **Fork the repository** on GitHub.

2. **Set the `maxDuration`** in `vercel.json`:
   - Free (hobby) plan: set `maxDuration` to `10`
   - Pro plan: keep at `30`

3. **Import the project** in your Vercel dashboard:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select your forked repository

4. **Add environment variables** in Vercel project settings:
   - `PAT_1` — Your GitHub Personal Access Token

5. **Deploy** — Vercel will automatically build and deploy your instance.

6. **Access your API** at your Vercel project URL, e.g.:
   ```
   https://your-project.vercel.app/api?username=YOUR_USERNAME
   ```

---

## Environment Configuration

Copy `.env.example` to `.env` and fill in your values:

```sh
cp .env.example .env
```

### Required Variables

| Variable | Description |
|----------|-------------|
| `PAT_1` | GitHub Personal Access Token with `read:user` and `repo` scopes |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `PAT_2` ... `PAT_10` | Additional PAT tokens for load balancing (reduces rate-limit risk) |
| `WAKATIME_API_KEY` | WakaTime API key (only needed for WakaTime card) |

### Generating a PAT

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens/new)
2. Give it a descriptive name (e.g., `github-readme-stats`)
3. Select scopes:
   - `read:user` — to read profile stats
   - `repo` — to include private repository stats (optional)
4. Click **Generate token** and copy the value

---

## Local Development

### Prerequisites

- Node.js 16+ (18+ recommended)
- [Vercel CLI](https://vercel.com/download): `npm install -g vercel`

### Setup

```sh
# Clone the repository
git clone https://github.com/negiadventures/github-readme-stats.git
cd github-readme-stats

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and set PAT_1=your_token

# Start the Vercel development server
vercel dev
```

The API will be available at `http://localhost:3000`.

### Testing

```sh
# Run unit tests
npm test

# Run e2e tests (requires PAT_1 in environment)
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

---

## Monitoring

### Health Check

Vercel provides automatic health monitoring. To manually test your deployment:

```sh
curl "https://your-project.vercel.app/api?username=anuraghazra"
```

A successful response returns an SVG card.

### Rate Limiting

Monitor your GitHub API rate limit usage:

```sh
curl -H "Authorization: token YOUR_PAT" \
  https://api.github.com/rate_limit
```

### Logs

View deployment logs in the Vercel dashboard:
1. Go to your project in [Vercel](https://vercel.com/dashboard)
2. Click on a deployment
3. Select the **Functions** tab to view serverless function logs

---

## Rollback Procedures

### Vercel Rollback

1. Go to your Vercel project dashboard
2. Navigate to **Deployments**
3. Find the last working deployment
4. Click **...** → **Promote to Production**

### Git Rollback

To revert to a previous commit:

```sh
# Find the commit to revert to
git log --oneline

# Revert changes
git revert HEAD~1

# Push the revert
git push origin master
```

Vercel will automatically redeploy when you push to master.

---

## Scaling

For high-traffic scenarios:

1. **Add multiple PAT tokens** (`PAT_1` through `PAT_10`) to distribute requests across different GitHub accounts and increase your effective rate limit.
2. **Increase `cache_seconds`** in API requests to reduce backend calls.
3. **Upgrade your Vercel plan** for higher serverless function concurrency limits.
