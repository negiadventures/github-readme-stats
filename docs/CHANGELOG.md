# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- GitHub Actions workflows: `lint-and-test.yml`, `publish.yml`, `update-demo.yml`, `security-scan.yml`
- Comprehensive API documentation (`docs/API.md`)
- Security policy (`SECURITY.md`)
- Environment variables template (`.env.example`)
- Deployment guide (`DEPLOYMENT.md`)
- Architecture documentation (`ARCHITECTURE.md`)
- Editor config (`.editorconfig`)
- Configuration module (`src/config.js`)
- Logger utility (`src/logger.js`)
- Caching module (`src/cache.js`)
- Changelog (`docs/CHANGELOG.md`)

### Changed
- Enhanced `.gitignore` with additional patterns for build artifacts, IDE files, and environment files
- Updated `README.md` with installation instructions, badges, and troubleshooting section

---

## [1.0.0] - Initial Release

### Added
- GitHub Stats Card (`/api`)
- Repository Pin Card (`/api/pin`)
- Top Languages Card (`/api/top-langs`)
- WakaTime Stats Card (`/api/wakatime`)
- Multiple built-in themes
- Responsive card themes (dark/light mode support)
- Customization via URL parameters (colors, borders, layout)
- Vercel deployment support
- Multi-language README documentation
- Rank calculation using cumulative distribution function
- Icon support for stats cards
- Gradient background support
- Locale/i18n support

### Features
- `hide` parameter to hide individual stats
- `show_icons` parameter for icon display
- `include_all_commits` for total commit counts
- `count_private` for private contribution counts
- `cache_seconds` for custom cache duration
- `border_radius` for rounded corners
- `theme=transparent` for transparent backgrounds

---

[Unreleased]: https://github.com/negiadventures/github-readme-stats/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/negiadventures/github-readme-stats/releases/tag/v1.0.0
