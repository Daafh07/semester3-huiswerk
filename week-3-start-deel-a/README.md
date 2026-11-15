# Week 3, part A: authentication and an admin area

Adds login with Supabase Auth and a protected admin area where products can be created, edited and deleted with Server Actions (`app/actions`). Writes go through a server-only admin client (`lib/supabase-admin.ts`), so the secret key never reaches the browser.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values of your own Supabase project. `.env.local` is not committed.
