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

- Static site, no server-side code, no forms, no cookies, no analytics
- Strict Content-Security-Policy with no `unsafe-inline` for scripts or styles
- HSTS, frame denial, nosniff, referrer and permissions policies set in `public/_headers`
- Dependencies and GitHub Actions audited weekly by Dependabot
- CodeQL code scanning on every push and pull request

## Known accepted risk

`npm audit` reports advisories in the Astro/Vite build toolchain (picomatch ReDoS,
GHSA-fc5q-39xc-vjpf). There is no patched release available at the time of writing.
The affected packages run only during the build; the deployed output is static HTML,
CSS, JavaScript and PDFs with no server-side execution and no user input reaching them.
Dependabot tracks the fix and will open a pull request when one ships.

