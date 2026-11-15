# Week 4: product images with Supabase Storage

Adds product images. Admins upload an image per product to a Supabase Storage bucket. The upload is checked on the server (`lib/product-images.ts`): only JPEG, PNG or WebP, and at most 5 MB.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values of your own Supabase project. `.env.local` is not committed.
