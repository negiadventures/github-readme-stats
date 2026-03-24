# Security Policy

## Supported Versions

The following versions of GitHub Readme Stats are currently supported with security updates:

| Version | Supported |
| ------- | --------- |
| latest  | ✅        |

## Reporting a Vulnerability

We take the security of GitHub Readme Stats seriously. If you believe you have found a security vulnerability, please report it responsibly.

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by:

1. Opening a [GitHub Security Advisory](https://github.com/negiadventures/github-readme-stats/security/advisories/new) (preferred)
2. Emailing the maintainer directly

### What to Include

When reporting a vulnerability, please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Any proof-of-concept code (if applicable)
- Suggested fix (if you have one)

### Response Timeline

- **Initial acknowledgement:** Within 48 hours
- **Status update:** Within 7 days
- **Fix and disclosure:** Dependent on severity and complexity

## Security Best Practices

When using or deploying GitHub Readme Stats:

### For Self-Hosted Instances

1. **Keep PAT scoped** — Only grant the minimum required permissions to your Personal Access Token
2. **Rotate tokens regularly** — Refresh your PAT periodically
3. **Use environment variables** — Never hardcode tokens in source code
4. **Keep dependencies updated** — Run `npm audit` and update dependencies regularly
5. **Restrict Vercel access** — Use environment variable restrictions in your Vercel project settings

### For GitHub Profile Usage

1. **Use the official hosted instance** at `https://github-readme-stats.vercel.app` or a trusted fork
2. **Review third-party forks** before using them on your profile — ensure they are trustworthy
3. **Do not pass sensitive information** in query parameters

## Security Update Schedule

- **Critical vulnerabilities:** Patched as soon as possible
- **High severity:** Patched within 7 days
- **Medium severity:** Patched within 30 days
- **Low severity:** Addressed in the next scheduled release

## Acknowledgements

We appreciate security researchers who responsibly disclose vulnerabilities and help improve the security of this project.
