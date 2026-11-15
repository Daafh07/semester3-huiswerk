# Week 3, part B: security with Row Level Security

Same admin area as part A, but without the secret admin key: every request uses the logged-in user's session, and the database decides with Row Level Security who may read and change products.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values of your own Supabase project. `.env.local` is not committed.
