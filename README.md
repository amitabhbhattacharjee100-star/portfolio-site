# Amitabh Bhattacharjee — Personal Portfolio

A six-page personal portfolio built with **React** (Vite) for COMP229 — Web Application
Development, Assignment 1.

## Pages

| Page | Route | Content |
| --- | --- | --- |
| Home | `/` | Welcome message, mission statement, quick links |
| About Me | `/about` | Legal name, headshot, bio, resume PDF link |
| Projects | `/projects` | 4 highlighted projects with role & outcome |
| Education | `/education` | Academic timeline + certifications |
| Services | `/services` | Services offered |
| Contact Me | `/contact` | Contact panel + interactive message form |

## Tech Stack

- React 19 + Vite
- `react-router-dom` for client-side routing/navigation
- Plain CSS with shared design tokens (`src/index.css`)

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

## Build

```bash
npm run build
npm run preview
```

## Linting

```bash
npm run lint
```

## Project Structure

```
src/
  assets/        Profile photo and other images
  components/    Navbar, Logo, Footer (shared UI)
  data/          portfolioData.js — single source of truth for content
  pages/         Home, About, Projects, Education, Services, Contact
public/
  resume.pdf     Resume linked from the About page
```

## Deployment

This project is a static Vite build and can be deployed to any static host:

- **Netlify**: connect the GitHub repo, build command `npm run build`, publish directory `dist`.
- **Vercel**: import the GitHub repo — Vercel auto-detects the Vite framework preset.
- **Render**: create a Static Site, build command `npm run build`, publish directory `dist`.

Live site: _add your deployed URL here after publishing_.

## Notes

- The logo is an original hexagon monogram (`src/components/Logo.jsx`) — not affiliated with any
  brand.
- The Contact form captures First Name, Last Name, Contact Number, Email, and Message, then
  redirects to Home with a confirmation banner (no backend required for this assignment).
