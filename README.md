# Elementar RT

[Overview](https://elementar-rt.tulikas.de) | [Live Demo](https://admin.elementar-rt.tulikas.de)

# Modern Angular UI Components & Admin Panel, based on [Angular Material 3](https://material.angular.io) components and [Tailwind](https://tailwindcss.com/) css framework

## Key features

- Based on the most popular Angular material components
- All components are designed from scratch specifically for the Elementar RT
- It has a large number of components aimed at creating real projects
- Free and Open Source for personal and commercial purposes

## What's included:

- Angular 21+ & Typescript
- Tailwind 4+ & SCSS
- High resolution
- Flexibly configurable themes (3 themes included)
- Light & dark color schemes in each theme
- 50+ Angular Components

## Install

If you don't have a project yet, just create a new project (sass styles are mandatory):

```bash
npx @angular/cli@21 new elementar-project-name --style=scss 
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

Every component in the library is documented with live examples at
**[docs.elementar-rt.tulikas.de](https://docs.elementar-rt.tulikas.de)**.

The following templates are built on `@elementar-rt/components`, each in its
own repository and deployed as a live demo:

| Template | Live demo | Source | What it is |
|---|---|---|---|
| **Elementar Admin** | [admin.elementar-rt.tulikas.de](https://admin.elementar-rt.tulikas.de) | [randrost/elementar-admin](https://github.com/randrost/elementar-admin) | Open-source admin template: seven dashboards, sixteen application areas, a twelve-widget catalog, and the settings, account and UI-gallery pages an admin product needs |
| **Elementar Minimalistic** | [minimalistic.elementar-rt.tulikas.de](https://minimalistic.elementar-rt.tulikas.de) | [randrost/elementar-minimalistic](https://github.com/randrost/elementar-minimalistic) | Open-source starter: app shell and auth pages, ready for a new Angular project |
| **FinTrack** (finance) | [finance.elementar-rt.tulikas.de](https://finance.elementar-rt.tulikas.de) | private | Personal-finance app: accounts, transactions, monthly budgets, savings goals and charts |
| **FitLog** (fitness) | [fitlog.elementar-rt.tulikas.de](https://fitlog.elementar-rt.tulikas.de) | private | Health and fitness tracker: workout log, exercise library, nutrition, progress analytics and goals |
| **FreelanceHQ** (freelance CRM) | [freelance.elementar-rt.tulikas.de](https://freelance.elementar-rt.tulikas.de) | private | CRM for freelancers: clients, projects (Kanban), time tracking and invoices |

The finance, fitlog and freelance-crm templates are frontend-only and run on
generated demo data, so every screen can be explored without a backend.

## Author

Elementar RT is developed and maintained by **Rostyslav Tulika**.

