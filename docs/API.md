# API Documentation

This document describes all available API endpoints, parameters, and response formats for GitHub Readme Stats.

## Base URL

The public hosted instance is available at:

```
https://github-readme-stats.vercel.app
```

You can also [deploy your own instance](../readme.md#deploy-on-your-own-vercel-instance).

---

## Endpoints

### 1. GitHub Stats Card

Generates a card displaying a user's GitHub statistics.

**Endpoint:** `GET /api`

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | **required** | GitHub username |
| `hide` | string | `""` | Comma-separated list of stats to hide (`stars`, `commits`, `prs`, `issues`, `contribs`) |
| `hide_title` | boolean | `false` | Hides the card title |
| `hide_rank` | boolean | `false` | Hides the rank badge |
| `show_icons` | boolean | `false` | Shows icons next to stats |
| `include_all_commits` | boolean | `false` | Counts all commits instead of only current year |
| `count_private` | boolean | `false` | Counts private contributions |
| `line_height` | number | `25` | Line height between stats |
| `card_width` | number | `500` | Card width in pixels |
| `custom_title` | string | `"<username> GitHub Stats"` | Custom title for the card |
| `text_bold` | boolean | `true` | Use bold text |
| `disable_animations` | boolean | `false` | Disables all animations |
| `ring_color` | string | theme default | Hex color for the rank ring |
| `exclude_repo` | string | `""` | Comma-separated list of repos to exclude from stars count |

**Example:**

```
https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark
```

**Markdown usage:**

```md
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME)
```

---

### 2. Repository Pin Card

Generates a card for pinning a repository on your profile.

**Endpoint:** `GET /api/pin`

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | **required** | GitHub username |
| `repo` | string | **required** | Repository name |
| `show_owner` | boolean | `false` | Shows the repository owner's username |

**Example:**

```
https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats
```

**Markdown usage:**

```md
[![Repo Card](https://github-readme-stats.vercel.app/api/pin/?username=YOUR_USERNAME&repo=YOUR_REPO)](https://github.com/YOUR_USERNAME/YOUR_REPO)
```

---

### 3. Top Languages Card

Generates a card showing the most used programming languages.

**Endpoint:** `GET /api/top-langs`

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | **required** | GitHub username |
| `hide` | string | `""` | Comma-separated list of languages to hide |
| `hide_title` | boolean | `false` | Hides the card title |
| `layout` | string | `"default"` | Card layout: `default` or `compact` |
| `card_width` | number | `300` | Card width in pixels |
| `langs_count` | number | `5` | Number of languages to show (1–10) |
| `exclude_repo` | string | `""` | Comma-separated list of repos to exclude |
| `custom_title` | string | `"Most Used Languages"` | Custom title for the card |
| `disable_animations` | boolean | `false` | Disables all animations |

**Example:**

```
https://github-readme-stats.vercel.app/api/top-langs?username=anuraghazra&layout=compact&langs_count=8
```

**Markdown usage:**

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_USERNAME)](https://github.com/anuraghazra/github-readme-stats)
```

---

### 4. WakaTime Stats Card

Generates a card displaying coding activity from WakaTime.

**Endpoint:** `GET /api/wakatime`

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | **required** | WakaTime username |
| `hide` | string | `""` | Comma-separated list of languages to hide |
| `hide_title` | boolean | `false` | Hides the card title |
| `hide_progress` | boolean | `false` | Hides the progress bar and percentage |
| `line_height` | number | `25` | Line height between stats |
| `layout` | string | `"default"` | Card layout: `default` or `compact` |
| `langs_count` | number | all | Number of languages to display |
| `api_domain` | string | `"wakatime.com"` | Custom WakaTime API domain (e.g. Wakapi) |
| `range` | string | `"all_time"` | Time range: `last_7_days`, `last_30_days`, `last_6_months`, `last_year`, `all_time` |
| `custom_title` | string | `"WakaTime Stats"` | Custom title for the card |

**Example:**

```
https://github-readme-stats.vercel.app/api/wakatime?username=YOUR_WAKATIME_USERNAME&layout=compact
```

---

## Common Parameters

These parameters apply to all card endpoints:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title_color` | string | `"2f80ed"` | Card title hex color |
| `text_color` | string | `"434d58"` | Body text hex color |
| `icon_color` | string | `"4c71f2"` | Icons hex color |
| `border_color` | string | `"e4e2e2"` | Card border hex color |
| `bg_color` | string | `"fffefe"` | Card background hex color or gradient |
| `hide_border` | boolean | `false` | Hides the card border |
| `theme` | string | `"default"` | Theme name (see [available themes](../themes/README.md)) |
| `cache_seconds` | number | `14400` | Cache duration in seconds (min: 14400, max: 86400) |
| `locale` | string | `"en"` | Card language locale |
| `border_radius` | number | `4.5` | Corner rounding radius |

### Gradient Background

You can set a gradient background using this format:

```
&bg_color=DEG,COLOR1,COLOR2,...COLOR10
```

**Example:**

```
&bg_color=30,e96443,904e95
```

---

## Rate Limiting

The GitHub API allows 5,000 requests per hour per token. To avoid rate-limiting:

- Cards are cached for 4 hours by default (`cache_seconds=14400`)
- Maximum cache duration is 24 hours (`cache_seconds=86400`)
- For high-traffic usage, [deploy your own instance](../readme.md#deploy-on-your-own-vercel-instance)

---

## Error Codes

| HTTP Status | Description |
|-------------|-------------|
| `200` | Success |
| `400` | Bad request — missing or invalid parameters |
| `404` | User or repository not found |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

**Common error messages in the card:**

| Error | Cause |
|-------|-------|
| `"Something went wrong"` | Generic error, usually a network issue |
| `"User not found"` | The provided username does not exist |
| `"Repo not found"` | The provided repository does not exist |

---

## Best Practices

1. **Use your own instance** for production use to avoid shared rate limits.
2. **Increase cache duration** using `cache_seconds` to reduce API calls.
3. **Use themes** instead of individual color params for consistency.
4. **URI-encode** language names with special characters (e.g., `C++` → `c%2B%2B`).
5. **Use `hide_border=true`** for a cleaner look on profile READMEs.

---

## Self-Hosting

See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment instructions, including:

- Vercel deployment
- Environment variable configuration
- PAT setup for private stats
