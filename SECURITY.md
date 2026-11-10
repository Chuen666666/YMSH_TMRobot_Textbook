# Dependency Security and Accepted Risks

Last reviewed: 2026-11-10

## Policy

- Use `package-lock.json` and `npm ci` to reproduce the documentation build environment.
- GitHub Dependabot checks npm and GitHub Actions weekly. Vulnerability alerts and automated security updates are enabled.
- Do not use `npm audit fix --force`, incompatible overrides, or toolchain downgrades merely to report zero findings.
- A patched dependency set must pass Markdown checks, name-registry validation, formatting, and the complete VitePress build before an accepted risk is closed.

## Risk Snapshot on 2026-11-10

`npm audit` reported 3 affected package nodes: 2 moderate, 1 high, and 0 critical. The three nodes summarize the `vitepress` → `vite` → `esbuild` dependency path; the Vite node itself aggregates several advisories.

### esbuild Development-Server Cross-Site Reads

- Advisory: [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)
- Impact: Another website may be able to send requests to the development server and read its responses.
- Boundary: This affects the development server only. GitHub Pages does not run an esbuild server.
- Status: Temporarily accepted. `npm audit` reports `fixAvailable: false` for the current dependency path.

### Vite Development Server and launch-editor

- Advisories: [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9), [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3), [GHSA-698v-4r3x-3vcv](https://github.com/advisories/GHSA-698v-4r3x-3vcv), [GHSA-r825-w8mm-5pxw](https://github.com/advisories/GHSA-r825-w8mm-5pxw), [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm), [GHSA-9jrq-w75r-8gcw](https://github.com/advisories/GHSA-9jrq-w75r-8gcw), [GHSA-rq7h-c2jc-7f22](https://github.com/advisories/GHSA-rq7h-c2jc-7f22), and [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff).
- Impact: The findings cover optimized-dependency source-map path traversal, Windows UNC and editor-argument handling, cross-origin script execution through custom middleware, and bypasses of `server.fs.allow` or `server.fs.deny`.
- Boundary: Production is a static GitHub Pages site and has no Vite development server or launch-editor endpoint.
- Status: Temporarily accepted. VitePress 1.6.4 currently has no npm-audit-compatible path to a patched Vite version. Dependabot also could not create a security update because no compatible patched release exists.

## Existing Mitigations

- Use `npm run docs:dev` locally only. Do not bind it to a public interface or expose it to an untrusted network.
- Pull requests run documentation and build validation only. GitHub Pages deployment occurs only from protected `main`.
- Branch protection requires `markdown-quality` and prevents force-pushes and deletion of `main`.
- GitHub Pages deploys only the static `docs/.vitepress/dist` output, not Vite, VitePress, esbuild, or `node_modules`.

## Re-evaluation Triggers

Re-evaluate this register when any of the following occurs:

- VitePress publishes a stable release that supports patched Vite and esbuild versions.
- Dependabot can create the corresponding security-update pull request.
- The development server must be exposed to a LAN, the public internet, or untrusted users.
- A new advisory affects build output or the GitHub Pages runtime rather than only the development server.
- VitePress, Vite, the PWA plugin, Vue, or Node.js receives a major update.

Run the following validation during re-evaluation:

```bash
npm ci
npm audit --json
npm run check
```
