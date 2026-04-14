# Security Policy

## Scope

vinovonk-tasting runs entirely client-side in the browser. It stores data only in `localStorage` — no server, no database, no network requests to external services other than loading the app itself.

Security issues are most likely to involve:
- XSS vulnerabilities in rendered user input
- Unsafe handling of imported JSON (the Export/Import feature)
- Dependency vulnerabilities in bundled libraries

## Reporting a vulnerability

**Do not use the public issue tracker for security issues.**

Report vulnerabilities privately via email: **jeroen@vinovonk.com**

Include:
- A description of the issue and its potential impact
- Steps to reproduce
- Any relevant browser/OS context

Expected response within **7 days**. We will coordinate a fix and disclose responsibly.
