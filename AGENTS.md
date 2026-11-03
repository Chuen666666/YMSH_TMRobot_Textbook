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
  PWA settings, and password hash injection.
- `docs/.vitepress/theme/`: custom theme components, including the password gate
  keyboard navigation, and PWA update prompt.
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
- The production URL is `https://tm.chuen666666.com/` and the deployment base is
  `/`. Keep theme code, PWA settings, and constructed URLs aligned with that base.
- The legacy path `https://chuen666666.com/YMSH_TMRobot_Textbook/` is redirected
  by the `Chuen666666.github.io` repository; do not use it as the canonical URL.
- Keep the PWA manifest `id`, `start_url`, and `scope` aligned with the deployment
  base. After changing `docs/public/logo.png`, run `npm run pwa:assets` and commit
  the regenerated icons in `docs/public/`.
- Keep the Node.js requirement in `package.json`, `.github/workflows/deploy.yml`,
  and `README.md` synchronized. PWA 2.x requires Node.js 22.14 or newer.
- Do not expose real passwords or repository secrets. `VITE_SITE_PASSWORD` is
  supplied by the deployment workflow; the local fallback is only for
  development.
- If password hashing is changed, update both `generateSHA256` in
  `docs/.vitepress/config.mts` and the matching logic in `PageLock.vue`.
- Do not edit generated or vendored content in `node_modules/`,
  `docs/.vitepress/cache/`, or `docs/.vitepress/dist/`.
- Keep `package-lock.json` in sync when dependencies change.

## Lesson Writing Style

- Write for students who may be operating a robot arm for the first time. State
  what a feature is for before giving the clicks or motions needed to use it.
- Keep each lesson focused on one stage of the course. Introduce prerequisite
  concepts before advanced variations, and link to an earlier lesson instead of
  repeating a full explanation.
- Use a single numbered H1 for lesson pages, matching the chapter number and
  title in the sidebar. Organize concepts as H2 sections and use H3/H4 only when
  a concept genuinely needs purpose, setup, or variant subsections.
- Use ordered lists for procedures that must be followed in sequence and bullet
  lists for checklists, options, or feature summaries. Each action should name
  the control, expected result, and any condition for skipping the step.
- Reproduce TMflow node names, buttons, menu labels, variables, values, and keys
  exactly as shown in the interface and wrap them in inline code. Show menu
  sequences in click order; distinguish old and new interface behavior when it
  changes the instructions.
- Put safety-critical behavior, collision risks, and recovery constraints in a
  VitePress `warning` or `danger` container. Put optional shortcuts and helpful
  extensions in a `tip` container; do not hide required steps in tips.
- Place each screenshot immediately after the text it supports. Use a normal
  Markdown image for figures and an inline HTML image only for a small control
  icon inside a sentence. Alt text should identify the control or scene rather
  than say only "image".
- Structure self-practice material as Task, Verification, and Answer sections
  (`題目／驗證／答案` in Traditional Chinese). In answers, follow the
  TMflow execution order and explain the purpose of each node, not just its name.
- Traditional Chinese lessons should be direct and approachable, using `我們` or
  `你` when guiding an action while keeping safety statements unambiguous. English
  lessons should read naturally and use the same established technical terms,
  not mirror Chinese sentence structure word for word.
- Keep paired Traditional Chinese and English lessons equivalent in technical
  meaning, safety warnings, task requirements, and image references. A
  translation may adapt wording, but it must not add or omit operating behavior.

## Markdown Tooling

- The `lint:md`, `format:md`, and `format:md:check` scripts apply only to
  `docs/**/*.md`, `README.md`, and `AGENTS.md`. Do not apply these commands or
  infer their style rules for Vue, TypeScript, JavaScript, CSS, YAML, JSON, or
  any other non-Markdown file type.
- Use `npm run format:md` to format Markdown intentionally. Do not run an
  unscoped repository-wide formatter as a substitute.
- After every authorized push, regardless of which file types changed, monitor
  every triggered GitHub Actions run until it completes. If any run fails,
  report the failing workflow, job, step, file when applicable, and diagnostic
  to the user instead of claiming the push succeeded.
- If the failure is specifically from `Lint Markdown` or
  `Check Markdown formatting`, explain the exact Markdown issue and ask whether
  the user wants it fixed before editing and pushing another commit. Do not
  automatically rewrite lesson content after a push solely to clear those two
  checks.

## Validation

Use the smallest relevant checks while editing. Before finishing changes that
can affect rendering or configuration, run:

```bash
npm run check
```

For interactive checks, run:

```bash
npm run docs:dev
```

There is currently no automated test suite. Do not use `npm test` as validation
because that script intentionally exits with an error.
