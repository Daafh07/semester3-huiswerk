# Semester 3 – Homework

Homework and workshop assignments for the Front-end Development semester (Fontys ICT, semester 3). Each folder is a separate project with its own README.

| # | Folder | Topic | Stack |
|---|---|---|---|
| 1 | [`acme-to-nextjs`](acme-to-nextjs) | Rebuilding a static site in Next.js with components | Next.js, TypeScript, Tailwind |
| 2 | [`week-2-deel-a`](week-2-deel-a) | Dynamic routes, loading, error and not-found pages | Next.js |
| 3 | [`week-2-deel-b`](week-2-deel-b) | Fetching data from a database | Next.js, Supabase |
| 4 | [`week-3-start-deel-a`](week-3-start-deel-a) | Authentication, admin area, Server Actions | Next.js, Supabase Auth |
| 5 | [`week-3-start-deel-b`](week-3-start-deel-b) | Securing data with Row Level Security | Next.js, Supabase |
| 6 | [`week-4-start`](week-4-start) | Image uploads with server-side validation | Next.js, Supabase Storage |
| 7 | [`studentencrm`](studentencrm) | CRUD app to manage students | Next.js, Supabase |
| 8 | [`bibliotheek-app`](bibliotheek-app) | Model-View-Controller in React | React, Vite |

## Running a project

```bash
cd <folder>
npm install
npm run dev
```

Projects that use Supabase have a `.env.example`. Copy it to `.env.local` and fill in your own project's values. Secrets and `node_modules` are not committed.
