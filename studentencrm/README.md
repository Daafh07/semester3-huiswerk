# Student CRM

A small CRM to manage students, built with Next.js and Supabase. You can search, add, edit and delete students. The table and the form are separate components (`StudentTable`, `StudentModal`), and all database calls are in `lib/studentenService.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values of your own Supabase project. `.env.local` is not committed.
