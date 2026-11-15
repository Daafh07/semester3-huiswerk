# Week 2, part B: data from Supabase

Replaces the hard-coded products with data from a Supabase database. All data access lives in `lib/products.ts`, so the pages only ask for products and do not know where they come from.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values of your own Supabase project. `.env.local` is not committed.
