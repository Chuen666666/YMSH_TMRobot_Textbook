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
  and keyboard navigation.
- `.github/workflows/deploy.yml`: GitHub Pages deployment.
- `name-translations.json`: authoritative bilingual personal-name spellings,
  display forms, sources, and confirmation status.
- `schemas/name-translations.schema.json`: JSON Schema for the name registry.
- `scripts/validate-name-translations.js`: schema and semantic validation for
  registered names and their referenced pages.

## Editing Rules

- Preserve the existing language and tone of the page being edited. Use
  Traditional Chinese for the root locale and English for `docs/en/`.
- Use Traditional Chinese as the primary authoring language for new or shared
  textbook content. After drafting or revising the Traditional Chinese page,
  create or update the matching English page by translating it into natural
  English that follows the established lesson style.
- Every textbook and supporting content page must have matching Traditional
  Chinese and English versions. When one locale is missing, do not leave the
  pair incomplete or ask the contributor to translate ordinary prose: use the
  existing page as the source and create the missing translation yourself.
- Before translating or checking a personal name, look it up by its exact
  Traditional Chinese spelling in `name-translations.json`. Reuse the registered
  `english.default` value, or `english.award` on the English award page, exactly;
  an accepted entry is authoritative and must not be repeatedly re-derived or
  reformatted from the Chinese name.
- When the user requests a different personal-name translation or display form,
  update `name-translations.json` first, record the new source and status, and
  then update every repository occurrence to match it.
- Add previously unregistered names to `name-translations.json` as part of the
  same bilingual change. Record where the English value came from. Use
  `status: "accepted"` for a project-approved value and
  `status: "needs-confirmation"` for an agent-generated draft.
- When changing shared lesson content, always update the matching page in the
  other locale in the same change.
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
- Keep PWA updates automatic. Do not add an update prompt unless the update
  strategy is intentionally changed back from `autoUpdate`; ordinary releases
  should update the service worker and caches without user confirmation.
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
- On `docs/home/award.md` and `docs/en/home/award.md`, render Chinese personal
  names through `name-translations.json` with this strict priority: (1) if the
  person supplied an anonymous
  display name, reproduce it exactly without translating, reordering, changing
  case, or changing punctuation; (2) if the person supplied a romanized name,
  preserve that spelling and change only its presentation to the Republic of
  China passport format `SURNAME, GIVEN-NAME`, with the family name first, a
  comma after it, uppercase letters, and a hyphen between given-name syllables;
  (3) if no romanization was supplied, use the Bureau of Consular Affairs
  name-translation standard and passport format to prepare a draft, then tell
  the contributor that confirmation is required. Never present an unconfirmed
  draft as the person's verified passport name.
- Keep paired Traditional Chinese and English lessons equivalent in technical
  meaning, safety warnings, and task requirements. A translation may adapt
  wording, but it must not add or omit operating behavior.

## Markdown Tooling

- The `lint:md`, `format:md`, and `format:md:check` scripts apply only to
  `docs/**/*.md`, `README.md`, and `AGENTS.md`. Do not apply these commands or
  infer markdownlint rules for Vue, TypeScript, JavaScript, CSS, YAML, JSON, or
  any other non-Markdown file type.
- Use `npm run format:md` to format Markdown intentionally. Do not run an
  unscoped repository-wide formatter as a substitute.
- After every authorized push, regardless of which file types changed, monitor
  every triggered GitHub Actions run until it completes. If any run fails,
  report the failing workflow, job, step, file when applicable, and diagnostic
  to the user instead of claiming the push succeeded.
- If `Lint Markdown` fails, or `Check formatting` fails for a Markdown file,
  explain the exact Markdown issue and ask whether the user wants it fixed
  before editing and pushing another commit. Do not automatically rewrite lesson
  content after a push solely to clear those checks.

## Other Formatting

- `npm run format` and `npm run format:check` use the repository Prettier config
  for Markdown, JavaScript, TypeScript, Vue, JSON, JSONC, and YAML. They do not
  impose markdownlint rules on non-Markdown files.
- The repository Prettier options mirror the maintainer's VS Code preferences:
  four-space TypeScript/JavaScript and JSON, 120-column lines, single-quoted
  JavaScript, semicolons, and no trailing commas. Vue, Markdown, and YAML retain
  two-space indentation; Markdown also preserves existing prose wrapping.
- Standalone CSS uses VS Code's built-in CSS formatter with two-space
  indentation. It is not currently part of the Prettier check; do not run the
  Markdown scripts on CSS.
- Do not introduce ESLint, Stylelint, or another general-purpose semantic linter
  unless the repository adopts corresponding rules and editor support. Ajv and
  `npm run validate:names` are intentionally scoped only to
  `name-translations.json`.

## Validation

Use the smallest relevant checks while editing. Before finishing changes that
can affect rendering or configuration, run:

```bash
npm run check
```

Before considering any textbook or supporting-page change complete, perform a
bilingual content check:

- Confirm that both the Traditional Chinese page and its matching `docs/en/`
  page exist. If one is missing, translate the existing page and create it.
- Compare both pages for equivalent section order, procedures, warnings, task
  requirements, links, and technical meaning; correct omissions yourself.
- Compare every translated personal name with `name-translations.json`. Add any
  missing entry with its source and status, and reject page-specific spelling or
  formatting that differs from the registered display value.

Run `npm run validate:names` after changing the name registry, its schema, or a
page referenced by a registry entry. The command must pass before committing.

For interactive checks, run:

```bash
npm run docs:dev
```

There is currently no automated test suite. Do not use `npm test` as validation
because that script intentionally exits with an error.
