# DIAMOND PREDICZ 💎 — Foundation v1.0

A mobile-first football analytics platform foundation. This package is a **development starter**, not a deployed production service. It includes a Next.js frontend, sample UI fixtures clearly labelled as demo data, a deterministic Poisson-based prediction utility, and a Cloudflare deployment outline.

## Requirements
- Node.js 20+
- npm
- Supabase project (only when you enable persistence/auth)
- API-Football account/API key (only when you connect real football data)

## Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Important data-integrity rule
The dashboard currently uses clearly marked demonstration fixtures so the interface can be reviewed without pretending to have a live API connection. Replace the demo provider in `src/lib/matches.ts` with server-side API-Football calls before publishing live fixtures or predictions.

## Environment variables
Copy `.env.example` to `.env.local` and fill in values only when integrations are configured.
Never place private API keys in `NEXT_PUBLIC_*` variables.

## Project map
- `src/app/` — routes and global styling
- `src/components/` — reusable UI
- `src/lib/prediction.ts` — Poisson probability calculations
- `src/lib/matches.ts` — demo fixture provider; replace with real server-side provider
- `supabase/schema.sql` — initial database schema
- `wrangler.toml` — Cloudflare Workers/OpenNext deployment starter

## Cloudflare deployment
This starter uses Next.js. For a production Cloudflare deployment, follow the current OpenNext for Cloudflare guide and adapt `wrangler.toml` to the generated build output. Do not assume that a plain static Pages upload can run server routes.
