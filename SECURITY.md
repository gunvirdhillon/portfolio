# Security

This is a static marketing site (no accounts, forms, or API routes). Attack surface is intentionally small.

## Reporting

If you believe you have found a security issue, please message via [LinkedIn](https://linkedin.com/in/gunvirdhillon) with enough detail to reproduce. Do not open a public issue for undisclosed vulnerabilities.

## Deployment

- Host on **HTTPS** only (Vercel does this by default).
- **HSTS** is provided by the hosting platform; do not disable TLS at the edge.
- **DNS**: Prefer Vercel’s documented records; use Cloudflare **DNS only** (grey cloud) if certificate issuance stalls, as in your runbook.

## Headers

Production responses set baseline headers and a **Content-Security-Policy** (see `next.config.mjs`). CSP is applied only when `NODE_ENV=production` so local `next dev` is not blocked.

## Dependencies

Run `npm audit` periodically and upgrade within the supported **Next.js 14** line when patch releases address advisories. Avoid `npm audit fix --force` if it jumps to an unsupported major without testing.
