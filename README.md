# COMP229 Portfolio

React frontend with Express APIs and Supabase authentication and storage.

Run `npm install`, copy `.env.example` to `.env`, then run `npm run build` and
`npm start`. Open http://localhost:5000.

For Vercel, configure `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.
The portfolio database schema is in `server/data/schema.sql`.

The administrator manages projects, education, and contact messages.
Regular accounts can read the portfolio and send contact messages.
