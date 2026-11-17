# Security policy

## Reporting a vulnerability

Email **kamranali.k47@gmail.com** with a description, the affected URL or file, and
reproduction steps. Please do not open a public issue for a suspected vulnerability.

Expect an acknowledgement within 72 hours. If the report is valid, a fix and a
disclosure timeline will follow.

## Scope

In scope:

- https://kamranhashmi.pages.dev and its subpaths
- The build and deployment configuration in this repository

Out of scope:

- Denial of service or volumetric testing
- Reports produced only by an automated scanner with no demonstrated impact
- Third-party services linked from the site (GitHub, LinkedIn, Medium)

## Posture

- Static site, no server-side code, no forms, no cookies
- Cloudflare Web Analytics only: one edge-injected script with SRI, allowed by exact URL in `script-src`, reporting to `cloudflareinsights.com`
- Strict Content-Security-Policy with no `unsafe-inline` for scripts or styles
- HSTS, frame denial, nosniff, referrer and permissions policies set in `public/_headers`
- Dependencies and GitHub Actions audited weekly by Dependabot
- CodeQL code scanning on every push and pull request

## OWASP Top 10:2025 review

| Category | Applies to this site | Control and evidence |
| --- | --- | --- |
| A01 Broken Access Control | Partly | No accounts or privileged routes. Probes for `.git`, `.env`, `package.json`, source and build directories return 404; path traversal returns 400; writes and `TRACE` return 405; CORS pinned to the canonical origin; no directory listing |
| A02 Security Misconfiguration | Yes | Strict CSP, HSTS, frame denial, nosniff, COOP/CORP, restrictive Permissions-Policy; custom 404; no source maps; no `X-Powered-By`; HTTP redirects to HTTPS; TLS 1.3 |
| A03 Software Supply Chain Failures | Yes | Lockfile with integrity hashes, Dependabot with a 5-day cooldown, CodeQL, SBOM generated in CI, secret scanning with push protection, branch protection |
| A04 Cryptographic Failures | Partly | TLS 1.3 only at the edge, HSTS for one year, no mixed content, no cookies, no secrets in client code |
| A05 Injection | No runtime input | Static HTML with no interpreter, no database, and no query reflection. DOM updates use `textContent` and `classList`; JSON-LD escapes `<` |
| A06 Insecure Design | Minimised | No authentication, transactions, uploads or business logic to attack; single static surface |
| A07 Authentication Failures | Not applicable | Nothing authenticates. Repository access uses SSH keys plus MFA on the GitHub account |
| A08 Software or Data Integrity Failures | Yes | Dependencies come from the npm registry with lockfile hashes; the only third-party script is Cloudflare's beacon, allowed by exact URL with SRI; fonts self-hosted; security scans on every commit |
| A09 Security Logging and Alerting Failures | Limited by platform | No server to log. GitHub Actions retains build and deploy logs; Cloudflare Web Analytics and edge analytics provide visit and performance data. No PII is logged by the site |
| A10 Mishandling of Exceptional Conditions | Yes | Custom 404 for unknown paths, no server-side state to corrupt, unknown routes fail closed |

## Known accepted risk

`npm audit` reports advisories in the Astro/Vite build toolchain (picomatch ReDoS,
GHSA-fc5q-39xc-vjpf). There is no patched release available at the time of writing.
The affected packages run only during the build; the deployed output is static HTML,
CSS, JavaScript and PDFs with no server-side execution and no user input reaching them.
Dependabot tracks the fix and will open a pull request when one ships.

