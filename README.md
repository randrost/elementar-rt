# Elementar UI

[Overview](https://elementarui.r-tulika.me) | [Live Demo](https://demo.elementarui.r-tulika.me) | [Documentation](https://docs.elementarui.r-tulika.me)

# Modern Angular UI Components & Admin Panel, based on [Angular Material 3](https://material.angular.io) components and [Tailwind](https://tailwindcss.com/) css framework

## Key features

- Based on the most popular Angular material components
- All components are designed from scratch specifically for the elementar admin
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
> git clone https://github.com/randrost/elementar-ui.git
> cd elementar-ui
> npm install
> npm run build:components:prod
> ```
> Then link the built library into your project from `dist/components/`.

## Demo Layouts

Demo layouts are coming soon. They will be available as separate repositories under this project.

