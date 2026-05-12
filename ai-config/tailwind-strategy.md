# Tailwind CSS Strategy

Tailwind CSS v4 conventions used in this project.

## Version & Setup

- **Tailwind CSS v4** — configuration is CSS-based, no `tailwind.config.js`
- PostCSS via `@tailwindcss/postcss`
- `@tailwindcss/typography` plugin for prose content
- Autoprefixer enabled

## CSS-Based Config (v4 Pattern)

Theme tokens and custom utilities are defined in SCSS/CSS files, not a config file:

```css
@import "tailwindcss";

@theme {
  --color-primary: ...;
  --color-surface: ...;
}
```

## Design Token System

This project uses **Angular Material 3 design tokens** as CSS variables alongside Tailwind utilities. Material tokens follow the `--mat-*` and `--mdc-*` naming, while custom app tokens use semantic names:

```
--color-primary           → primary action color
--color-secondary-container → surface variant
--color-on-surface        → text on surface
```

Use semantic token classes wherever they exist instead of raw color utilities.

## Class Ordering Convention

Follow this order in templates (Tailwind Prettier plugin order):

1. Layout (`flex`, `grid`, `block`, `hidden`)
2. Flexbox/Grid (`flex-col`, `items-center`, `gap-4`)
3. Spacing (`p-4`, `m-2`, `px-6`)
4. Sizing (`w-full`, `h-10`, `size-6`)
5. Typography (`text-sm`, `font-bold`, `text-primary`)
6. Colors & backgrounds (`bg-surface`, `text-neutral-500`)
7. Borders (`border`, `border-b`, `rounded-full`)
8. Effects (`shadow`, `opacity-50`)
9. Dark mode variants (`dark:bg-surface-container`)
10. Responsive variants (`md:flex-row`)
11. State variants (`hover:underline`, `focus:ring`)

## Dark Mode

Dark mode uses the `dark:` variant. Always pair light and dark color utilities:

```html
<!-- ✅ always specify dark variant for color-sensitive classes -->
<div class="text-neutral-500 dark:text-neutral-400">
<div class="bg-surface-container dark:bg-surface-container-highest">
```

## Size Utilities

Use the `size-*` shorthand for equal width + height:

```html
<!-- ✅ -->
<emr-avatar class="size-9"/>

<!-- ❌ -->
<emr-avatar class="w-9 h-9"/>
```

## Spacing Scale

Prefer Tailwind spacing for all margin/padding. Use arbitrary values (`p-[3px]`) only when necessary and unavoidable.

## Typography

- Use `text-xs`, `text-sm`, `text-md` etc. for font sizes
- Use `text-tiny`, `text-4xs` for custom extra-small sizes defined in the theme
- Use `@tailwindcss/typography` (`prose` class) only for long-form markdown/HTML content

## Component-Scoped Styles

- Use `styleUrl: './component.scss'` for component-specific styles
- Only use SCSS for things that can't be done with Tailwind (e.g., `:host` binding, complex selectors, Angular Material style overrides)
- Prefer Tailwind utilities in templates over SCSS classes

## Responsive Design

Breakpoints follow Tailwind defaults. Mobile-first approach:

```html
<!-- mobile: stacked, md+: row -->
<div class="flex flex-col md:flex-row gap-4">
```

## Do NOT

- Do not use `@apply` in component SCSS unless absolutely necessary
- Do not write custom CSS that duplicates Tailwind utilities
- Do not use inline `style=""` attributes — use Tailwind classes
