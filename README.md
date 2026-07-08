# Elementar RT

[Overview](https://elementar-rt.r-tulika.me) | [Live Demo](https://demo.elementar-rt.r-tulika.me) | [Documentation](https://docs.elementar-rt.r-tulika.me)

# Modern Angular UI Components & Admin Panel, based on [Angular Material 3](https://material.angular.io) components and [Tailwind](https://tailwindcss.com/) css framework

## Key features

- Based on the most popular Angular material components
- All components are designed from scratch specifically for the Elementar RT
- It has a large number of components aimed at creating real projects
- Free and Open Source for personal and commercial purposes

## What's included:

- Angular 20+ & Typescript
- Tailwind 4+ & SCSS
- High resolution
- Flexibly configurable themes (3 themes included)
- Light & dark color schemes in each theme
- 50+ Angular Components

## Install

If you don't have a project yet, just create a new project (sass styles are mandatory):

```bash
npx @angular/cli@20 new elementar-project-name --style=scss 
```

Go to directory `elementar-project-name` (or your project folder name) and run the command:

```bash
ng add @elementar-rt/components
```

> **Note:** The npm package is currently being republished. If `ng add` fails, build the library locally:
> ```bash
> git clone https://github.com/randrost/elementar-rt.git
> cd elementar-rt
> npm install
> npm run build:components:prod
> ```
> Then link the built library into your project from `dist/components/`.

## Development

Common scripts:

```bash
npm start                       # serve the demo app (dev)
npm run build:components:prod   # build the component library
npm run build:prod              # build the demo app
```

## Testing

The repository has two unit-test suites — one for the component library
(`components`) and one for the demo app (`elementar-rt`). Both run headless with
Karma + Jasmine.

```bash
npm run test:components   # library suite (headless)
npm run test:app          # demo app suite (headless)
npm run test:ci           # both suites, sequentially — what CI runs
```

`npm test` (i.e. `ng test`) still runs the default project in watch mode for
local, interactive work.

Headless runs use the `ChromeHeadlessNoSandbox` launcher defined in
`karma.conf.js`, so they work in CI and inside containers that run as `root`.
CI (`.github/workflows/ci.yml`) runs `npm run test:ci` on every push and pull
request and **fails the build if any spec fails** — the suites are green and
must stay that way. A release (`.github/workflows/publish.yml`) is likewise
gated on the tests.

## Keeping dependencies up to date

Angular ships migration schematics, so **prefer `ng update` over editing
`package.json` by hand or a bare `npm install`.** `ng update` bumps the
packages *and* runs the code-mods that fix breaking changes, which is what keeps
the build and the test suites green across major versions.

Check what can be updated:

```bash
npm run update:check      # alias for `ng update`
```

Apply an update (example: Angular + CDK/Material):

```bash
ng update @angular/core @angular/cli
ng update @angular/cdk @angular/material
```

### Resolving issues on an existing branch

When a branch is failing because of an out-of-date or freshly bumped dependency
— most commonly a Dependabot bump under `.github/dependabot.yml`, or an old
feature branch — run the update **on that branch** so the migrations are applied
in context, then re-run the suites:

```bash
git checkout <your-branch>
npm ci --legacy-peer-deps        # install the branch's locked deps
ng update                        # list what needs bumping
ng update @angular/core @angular/cli   # apply bumps + migrations
npm run test:ci                  # confirm both suites are green
git add -A && git commit -m "chore(deps): apply ng update migrations"
```

`ng update` requires a clean git working tree (commit or stash first) and writes
the migration changes directly into the branch. If a plain `npm update` /
`npm install` pulls in a newer Angular package without its migrations, run the
matching `ng update` afterwards to reconcile — otherwise the app may compile but
fail at runtime or in tests.

## Demo Layouts

Demo layouts are coming soon. They will be available as separate repositories under this project.

