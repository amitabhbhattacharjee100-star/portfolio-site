# Amitabh Bhattacharjee Portfolio

A React and Vite portfolio for COMP229 Web Application Development. The Contact page saves submitted messages through a Vercel serverless API to Supabase.

## Pages

| Page | Route | Content |
| --- | --- | --- |
| Home | `/` | Welcome, mission statement, featured projects |
| About Me | `/about` | Bio, headshot, resume |
| Projects | `/projects` | Projects and outcomes |
| Education | `/education` | Academic history and certifications |
| Services | `/services` | Services offered |
| Contact Me | `/contact` | Contact information and message form |

## Stack

- React 19, Vite, and React Router
- Vercel serverless function at `api/contact.js`
- Supabase Postgres via the REST Data API
- Vitest, Testing Library, and Cypress

## Local development

Install dependencies and start Vite:

```bash
npm install --legacy-peer-deps
npm run dev
```

The Vite server runs at `http://localhost:5173`. Contact submissions require `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the Vercel function environment. The publishable key is kept server-side in this app. The serverless API returns a configuration message if these values are absent.

## Tests and build

```bash
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
npm run test:e2e
```

The Cypress suite stubs the contact API and records a video. It does not create test messages in the live database.

## Supabase contact table

The SQL setup is in `supabase/assignment4_contact_messages.sql`. It creates `public.assignment4_contact_messages` with row level security enabled. Anonymous visitors may insert a contact message; they cannot read, update, or delete messages. The API validates each field before writing.

In Vercel, set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` for Production and Preview. Never add a service role key to browser code or commit database credentials.

## Deployment

Vercel builds with `npm run build` and serves `dist`. The `api/contact.js` function stores messages in Supabase. The configured production URL is [amitabh-portfolio-nu.vercel.app](https://amitabh-portfolio-nu.vercel.app).
