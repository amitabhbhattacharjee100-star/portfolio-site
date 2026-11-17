# COMP229 Assignment 4 Testing and Deployment

## Supabase contact database

The Contact form stores messages in Supabase. The SQL setup file is `supabase/assignment4_contact_messages.sql`; the table uses row level security and only grants anonymous users insert access. Public reads are disabled.

The Vercel project needs `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in Production and Preview. Keep the key in server environment variables and do not use a service role key in the browser. Use only test data when verifying a submission.

After deployment, submit a clearly identified test message and verify that it appears in `public.assignment4_contact_messages`. Remove the test row when evidence collection is complete.

## Unit and build checks

Run:

```bash
npm install --legacy-peer-deps
npm run lint
npm test
npm run build
```

Unit tests cover Home page content and navigation, plus Contact form success and error states.

## Cypress end-to-end checks

Build and start the preview:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

In a second terminal run `npm run test:e2e`. The Cypress suite stubs the contact API, so it does not write to Supabase. Video recording and failure screenshots are enabled. GitHub Actions uploads those files as the `cypress-evidence` artifact.

## Deployment and performance

The Vercel production URL is [amitabh-portfolio-nu.vercel.app](https://amitabh-portfolio-nu.vercel.app). Verify the home page, each portfolio route, and `/api/health` or the contact endpoint after deployment. Record actual Lighthouse scores for Performance, Accessibility, Best Practices, and SEO; do not estimate them. Review mobile layout, browser console, image size, and the production build output.

## CI/CD evidence

The update branch is `assignment4/supabase-contact`. The pull request to `master` runs lint, unit tests, production build, and Cypress. After those checks pass, merge the branch and confirm Vercel deploys the new commit. Capture before and after screenshots of the home page and include the GitHub Actions test results and Cypress recording in the submission report.
