# Claude AI Configuration

This file tells Claude how to work with this project.

## Strategy References

- [Angular Patterns & Conventions](./ai-config/angular-strategy.md)
- [TypeScript Patterns & Conventions](./ai-config/typescript-strategy.md)
- [Tailwind CSS Patterns & Conventions](./ai-config/tailwind-strategy.md)

## Project Overview

**Elementar RT** is an Angular UI component library and admin panel demo, built on top of Angular Material 3 and Tailwind CSS 4.

| Area | Details |
|------|---------|
| Library source | `projects/components/` |
| Library package | `@elementar-rt/components` |
| Demo app source | `src/` |
| Component prefix | `emr-` (library), `app-` (demo app) |
| Styles | SCSS + Tailwind CSS 4 |
| State management | `@ngrx/signals`, `@ngrx/store` |
| Angular version | 20+ (standalone components only) |

## Key Commands

```bash
npm start                       # serve demo app (dev)
npm run build:components:prod   # build the component library
npm run build:prod              # build the demo app
npm test                        # run unit tests (default project, watch mode)
npm run test:components         # library unit suite (headless)
npm run test:app                # demo app unit suite (headless)
npm run test:ci                 # both suites, sequentially — what CI runs
npm run update:check            # `ng update` — list dependency updates/migrations
```

See the README's "Testing" and "Keeping dependencies up to date" sections for
how tests are wired and how to run `ng update` to resolve issues on a branch.

## Project Structure

```
projects/
  components/          # The publishable library (ng-packagr)
    <feature>/
      src/             # Component implementation
      index.ts         # Public API re-exports
      ng-package.json

src/
  app/
    @store/            # Shared layout pieces (sidebar, header, etc.)
    @app/              # App-level config/services
    components/        # Per-component demo pages
      <name>/
        _examples/     # Live code examples shown in the docs
        overview/      # Main demo page
    forms/             # Form demo pages
```

## Rules for Claude

- Always use standalone components — no NgModules
- Always respect the `emr-` prefix for library components
- Place component examples in `_examples/` subfolders
- Read strategy files before generating Angular, TypeScript, or Tailwind code
