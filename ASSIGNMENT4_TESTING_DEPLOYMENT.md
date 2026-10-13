# COMP229 Assignment 4 — Testing and Deployment

This checklist supports the portfolio testing and deployment assignment. Record your own screenshots after running each step; do not submit screenshots that were not actually captured from your environment.

## 1. Install and verify

```bash
npm install
npm run lint
npm test
npm run build
``

Expected unit tests: the Home page renders the mission statement and featured-work section, and its About/Projects links point to the expected routes.

## 2. Run Cypress end-to-end tests

Install dependencies first, then start the production preview in one terminal:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
``

In a second terminal, run:

```bash
npm run test:e2e
``

Cypress checks navigation from Home to Projects and submits the Contact form. Cypress video recording and failure screenshots are configured in `cypress.config.js`. Capture screenshots of the passing test results for the assignment report.

## 3. Performance review

The app is a static Vite site. Run a production build and inspect the generated files in `dist/`. Use Chrome DevTools Lighthouse on the deployed URL and record the actual Performance, Accessibility, Best Practices, and SEO scores. Do not invent scores. Review oversized images, unused assets, console errors, and mobile layout issues.

## 4. Cloud deployment

The repository README lists the existing Vercel URL: https://amitabh-portfolio-nu.vercel.app. Open the URL and verify the pages and Contact form manually. In Vercel, confirm the project is connected to this GitHub repository, the build command is `npm run build`, and the output directory is `dist`. If the site does not redeploy automatically, inspect the Vercel deployment logs.

## 5. Branch and CI/CD evidence

This work is being prepared on branch `assignment4/testing-deployment`. Review the changes, open a pull request to `master`, and merge it after checks pass. To demonstrate a later code change, make a small content update on a new branch, merge it through a pull request, then capture the deployed site before and after the deployment.

## Important limitation

The existing Contact form only displays a local confirmation message. It does not persist submissions to a database. A cloud NoSQL database requirement (for example, Firebase or MongoDB Atlas) is not complete until the database is configured with credentials/secrets and the application is connected to it. Never commit database passwords, API keys, or other secrets to GitHub.
