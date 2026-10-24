# Repository Guidelines

## Scope

These instructions apply to the entire repository.

## Project Overview

This repository contains a bilingual VitePress textbook for the YMSH AI
program's TM Robot courses. Traditional Chinese pages live directly under
`docs/`; English pages live under `docs/en/`.

## Important Paths

- `docs/index.md`: Traditional Chinese home page.
- `docs/en/index.md`: English home page.
- `docs/basic/`, `docs/intermediate/`, `docs/advanced/`: Traditional Chinese lessons.
- `docs/en/basic/`, `docs/en/intermediate/`, `docs/en/advanced/`: English lessons.
- `docs/home/` and `docs/en/home/`: supporting pages for each locale.
- `docs/public/`: static assets served from the site root.
- `docs/.vitepress/config.mts`: locales, navigation, sidebars, base path, and
  password hash injection.
- `docs/.vitepress/theme/`: custom theme components, including the password gate
  and keyboard navigation.
- `.github/workflows/deploy.yml`: GitHub Pages deployment.

## Editing Rules

- Preserve the existing language and tone of the page being edited. Use
  Traditional Chinese for the root locale and English for `docs/en/`.
- When changing shared lesson content, check whether the matching page in the
  other locale also needs an equivalent update.
- Keep navigation and sidebar entries in `docs/.vitepress/config.mts`
  synchronized with added, removed, or renamed pages.
- Put images and other static files in `docs/public/`. Reference them from
  Markdown with root-relative paths such as `/robot_arm.png`.
- Preserve the configured deployment base, `/YMSH_TMRobot_Textbook/`, when
  writing theme code or constructing URLs.
- Do not expose real passwords or repository secrets. `VITE_SITE_PASSWORD` is
  supplied by the deployment workflow; the local fallback is only for
  development.
- If password hashing is changed, update both `generateSHA256` in
  `docs/.vitepress/config.mts` and the matching logic in `PageLock.vue`.
- Do not edit generated or vendored content in `node_modules/`,
  `docs/.vitepress/cache/`, or `docs/.vitepress/dist/`.
- Keep `package-lock.json` in sync when dependencies change.

## Validation

Use the smallest relevant checks while editing. Before finishing changes that
can affect rendering or configuration, run:

```bash
npm run docs:build
```

For interactive checks, run:

```bash
npm run docs:dev
```

There is currently no automated test suite. Do not use `npm test` as validation
because that script intentionally exits with an error.
