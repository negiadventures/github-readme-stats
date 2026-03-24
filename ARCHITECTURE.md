# Architecture

This document describes the system design, component structure, and data flow of GitHub Readme Stats.

## Table of Contents

- [Overview](#overview)
- [Component Descriptions](#component-descriptions)
- [Data Flow](#data-flow)
- [Directory Structure](#directory-structure)
- [Scalability Considerations](#scalability-considerations)

---

## Overview

GitHub Readme Stats is a serverless application deployed on [Vercel](https://vercel.com). It exposes a set of API endpoints that fetch data from the GitHub GraphQL API and WakaTime REST API, then render the data as SVG cards suitable for embedding in GitHub profile READMEs.

```
Browser/GitHub CDN
       │
       ▼
 Vercel Serverless Functions (api/*.js)
       │
       ├──► GitHub GraphQL API  (github.com/graphql)
       └──► WakaTime REST API   (wakatime.com/api)
```

---

## Component Descriptions

### `api/` — Serverless Endpoints

Each file in `api/` corresponds to a Vercel serverless function:

| File | Endpoint | Description |
|------|----------|-------------|
| `api/index.js` | `GET /api` | GitHub Stats Card |
| `api/pin.js` | `GET /api/pin` | Repository Pin Card |
| `api/top-langs.js` | `GET /api/top-langs` | Top Languages Card |
| `api/wakatime.js` | `GET /api/wakatime` | WakaTime Stats Card |
| `api/status/pat-info.js` | `GET /api/status/pat-info` | PAT token diagnostics |

### `src/` — Core Library

| File/Directory | Description |
|----------------|-------------|
| `src/cards/` | Card rendering logic (stats, repo, top-langs, wakatime) |
| `src/common/` | Shared utilities: Card base class, i18n, retryer, utils |
| `src/fetchers/` | Data fetching from GitHub/WakaTime APIs |
| `src/calculateRank.js` | Rank calculation using cumulative distribution function |
| `src/getStyles.js` | CSS and animation generation for cards |
| `src/translations.js` | Locale strings for all supported languages |
| `src/config.js` | Centralized configuration constants |
| `src/logger.js` | Structured logging utility |
| `src/cache.js` | In-memory TTL cache for API responses |

### `themes/` — Theme Definitions

Contains the theme index (`index.js`) with all color scheme definitions, and a generated `README.md` showing theme previews.

### `scripts/` — Build/Maintenance Scripts

Node.js scripts for tasks like generating theme documentation, previewing themes, and managing stale PRs.

---

## Data Flow

### Stats Card Request

```
1. Request arrives at /api?username=...
2. api/index.js validates query params
3. fetchStats() calls GitHub GraphQL API via retryer (with token rotation)
4. Response is parsed and rank is calculated (calculateRank.js)
5. renderStatsCard() generates SVG markup with styles
6. SVG is returned with Cache-Control headers
```

### Token Rotation (Retryer)

The `src/common/retryer.js` module rotates through `PAT_1` to `PAT_10` environment variables on rate-limit errors, enabling higher throughput:

```
Request → PAT_1 → [rate limited?] → PAT_2 → [rate limited?] → PAT_3 → ...
```

### Caching Strategy

HTTP responses include `Cache-Control` headers so GitHub's CDN and browsers cache the SVG:

```
Cache-Control: max-age=14400, s-maxage=14400
```

The `src/cache.js` module provides an optional in-memory cache layer for deduplicating requests within the same serverless function instance.

---

## Directory Structure

```
github-readme-stats/
├── api/                    # Vercel serverless function entry points
│   ├── index.js            # GitHub Stats Card
│   ├── pin.js              # Repository Pin Card
│   ├── top-langs.js        # Top Languages Card
│   ├── wakatime.js         # WakaTime Stats Card
│   └── status/
│       └── pat-info.js     # PAT diagnostics
├── src/
│   ├── cards/              # SVG card renderers
│   ├── common/             # Shared utilities and base classes
│   ├── fetchers/           # GitHub/WakaTime API clients
│   ├── calculateRank.js    # Rank calculation
│   ├── cache.js            # In-memory cache
│   ├── config.js           # Constants and defaults
│   ├── getStyles.js        # CSS generation
│   ├── index.js            # Library entry point (exports)
│   ├── logger.js           # Logging utility
│   └── translations.js     # i18n strings
├── tests/                  # Jest unit and e2e tests
├── themes/                 # Theme color definitions
├── scripts/                # Maintenance and generation scripts
├── docs/                   # Documentation
│   ├── API.md              # API reference
│   ├── CHANGELOG.md        # Version history
│   └── readme_*.md         # Translated READMEs
├── .github/
│   ├── workflows/          # GitHub Actions CI/CD pipelines
│   └── ISSUE_TEMPLATE/     # Issue form templates
├── .env.example            # Environment variable template
├── vercel.json             # Vercel deployment configuration
└── package.json            # Project metadata and scripts
```

---

## Scalability Considerations

### Rate Limiting

- **Multiple PATs** — Up to 10 GitHub PAT tokens can be configured (`PAT_1`–`PAT_10`), each providing 5,000 requests/hour, yielding up to 50,000 requests/hour total.
- **Response caching** — `Cache-Control` headers prevent repeated requests for the same data within the cache window.

### Serverless Architecture

- **Cold starts** — Vercel serverless functions may have cold start latency on the first request. Subsequent requests within the warm window are faster.
- **Stateless design** — Each function invocation is independent; the in-memory cache (`src/cache.js`) is per-instance only.
- **Auto-scaling** — Vercel automatically scales serverless functions to handle concurrent requests.

### GitHub CDN

GitHub re-hosts SVG images through its CDN, which means:
- Images are served from GitHub's infrastructure, not your Vercel instance
- This reduces direct load on your deployment for profile README viewers
- Cache headers are respected by GitHub's CDN
