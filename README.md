# Naresh OS — Static Developer Portfolio

A terminal-first portfolio built with React, TypeScript and Vite. It runs entirely in the browser; commands are simulated and never execute on a server or local shell.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repository is configured as an account-level GitHub Pages site for `Nareshganesan10.github.io`.

1. Create a **public** GitHub repository named exactly `Nareshganesan10.github.io`.
2. Push the contents of this folder to the repository's `main` branch.
3. In GitHub, open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys the site on every push to `main`.
5. The site will be available at `https://Nareshganesan10.github.io` after the workflow succeeds.

## Personalize before publishing

- `src/data/profile.ts`: add your LinkedIn URL and verify contact details.
- `src/data/projects.tsx`: add only projects and claims you can substantiate. GE, HDFC Insurance and CME Group entries currently reflect the supplied resume. STOQO is labelled as a personal project in development.
- `public/resume.pdf`: replace with your final resume when ready.
- Update the experience timeline in `src/data/experience.ts` if your employment dates or responsibilities change.

## Notes

- No backend, database, serverless function or paid API is required.
- GitHub Pages free-tier terms and quotas are controlled by GitHub and can change; hosting is not contractually guaranteed free forever.
- This project uses Google Fonts when network access is available; system monospace fallbacks remain available offline.
