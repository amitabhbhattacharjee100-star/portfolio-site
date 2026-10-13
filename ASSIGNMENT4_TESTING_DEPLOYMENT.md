# COMP229 Assignment 4 — Testing and Deployment

## 1. MongoDB Atlas setup

1. Create a MongoDB Atlas project and a database named `portfolio`.
2. Create a database user with a strong password. Give it read/write access only to the `portfolio` database.
3. Configure Atlas Network Access for the deployment. Prefer restricted trusted IP access where available. For Vercel serverless functions without a fixed outbound IP, Atlas may require an IP access-list entry that permits Vercel access; understand the exposure before using a broad entry and use a strong, least-privilege database user.
4. In Vercel Project → Settings → Environment Variables, add `MONGODB_URI` (Atlas connection string with database-user credentials) and `MONGODB_DB` (`portfolio`).
5. Apply variables to Production and Preview as needed, then redeploy. Never place credentials in React code, commit them to GitHub, or paste them into the report.
6. In Atlas Data Explorer, verify a test submission appears in `portfolio.contactMessages`.

The API is in `api/contact.js`. It validates the form and stores a timestamp. It does not return database connection details to visitors. Use test data and do not submit other people's personal information without permission.

## 2. Install and verify

```bash
npm install
npm run lint
npm test
npm run build
```

Unit tests cover Home page content/navigation and Contact form success/error states.

## 3. Run Cypress end-to-end tests

Build and start the preview in one terminal:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

In a second terminal, run `npm run test:e2e`. Cypress stubs the contact API, so E2E tests do not need real Atlas credentials. Cypress video recording and failure screenshots are configured in `cypress.config.js`. Capture actual passing test results for the report.

## 4. Deployment and performance

The README lists the existing Vercel URL: https://amitabh-portfolio-nu.vercel.app. Confirm Vercel is connected to this GitHub repository, uses `npm run build`, and publishes `dist`. Vercel supports the `api/contact.js` serverless endpoint when deployed with its Node.js runtime. After adding environment variables, test the API and inspect Vercel logs.

Run Lighthouse on the deployed URL and record the actual Performance, Accessibility, Best Practices, and SEO scores. Do not invent scores. Review mobile layout, console errors, image sizes, and production build output.

## 5. CI/CD and evidence

The branch `assignment4/testing-deployment` contains the assignment changes. Wait for GitHub Actions checks, resolve any failures, then merge the pull request to `master`. Verify that Vercel deploys the new version. Capture real screenshots of unit tests, Cypress results/video, Lighthouse, the live URL, and before/after content for the Word report.

## Important

The MongoDB integration will not store messages until the Atlas database user, network access, and Vercel environment variables are configured. Keep the database secret in the serverless API environment, never in browser code.
