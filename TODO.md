# Elementar RT — TODO

> Last updated: 2026-05-14

---

1. `[x]` **badge** — Add a `emr-badge` component for status dots and count overlays. Variants: dot, number, icon. Support positioning on avatars and buttons.

2. `[x]` **chips** — Build `emr-chip` and `emr-chip-list`. Support input chips (removable), filter chips (toggleable), and suggestion chips (clickable presets).

3. `[x]` **table** — Full data table with column sorting, multi-row selection checkboxes, sticky header, and integration with the `paginator` component.

4. `[x]` **tabs** — Styled `emr-tabs` / `emr-tab` wrapper around Angular Material tabs. Support icon+label tabs, scrollable tab bar, and lazy content loading.

5. `[x]` **dialog** — Service-based dialog (`EmrDialog.open(...)`) with typed return value, size presets (sm/md/lg/fullscreen), and a default header/footer layout component.

6. `[x]` **snackbar** — Injectable `EmrSnackbar` service with `success`, `error`, `info`, `warning` shorthand methods. Configurable position and auto-dismiss duration.

7. `[x]` **tooltip** — Directive `emrTooltip` wrapping Angular CDK tooltip. Support plain text, rich content (ng-template), and configurable placement.

8. `[x]` **menu** — `EmrMenu` directive + `emr-menu-item`. Support dropdown menus triggered by button, context menus on right-click, nested submenus, and dividers.

9. `[x]` **card** — Base `emr-card` with named slots: `emrCardHeader`, `emrCardMedia`, `emrCardContent`, `emrCardActions`. Variants: flat, outlined, elevated.

10. `[x]` **bottom-sheet** — Service-based `EmrBottomSheet.open(component)`. Includes swipe-to-dismiss on touch, backdrop click to close, and height presets.

11. `[x]` **datepicker** — Styled date picker input with calendar popup, range mode, min/max constraints, and `ControlValueAccessor` integration.

12. `[x]` **timepicker** — Time input with clock-face popup or scroll wheels. 12h/24h modes. Integrates with Angular forms.

13. `[x]` **expansion-panel** — `emr-expansion-panel` with animated expand/collapse. Supports accordion group mode (only one open at a time) and custom header templates.

14. `[x]` **list** — `emr-list` + `emr-list-item` with avatar, title, secondary text, trailing action, and divider support. Dense and standard density modes.

15. `[x]` **paginator** — `emr-paginator` component with first/prev/next/last buttons, current page indicator, and items-per-page selector. Emits `(pageChange)` events.

16. `[x]` **progress-bar** — `emr-progress-bar` with determinate (value 0–100), indeterminate, and buffer modes. Color variants matching the theme palette.

17. `[x]` **slider** — `emr-slider` for single-value and range selection. Supports step, min/max, tick marks, and value label display. Implements `ControlValueAccessor`.

18. `[x]` **tree** — `emr-tree` with lazy children loading, checkbox selection, and drag-to-reorder. Based on Angular CDK Tree.

19. `[x]` **toolbar** — `emr-toolbar` shell with `start`, `center`, `end` projected slots. Handles mobile collapse with an overflow menu.

20. `[ ]` **number-input demo** — Add overview page with examples: basic, min/max/step, formatting (currency, percentage), disabled and readonly states. Include full API table.

21. `[ ]` **pin-input demo** — Add overview page: basic 4-digit, 6-digit OTP, masked input, auto-focus-next behavior. Include API table.

22. `[ ]` **phone-input demo** — Add overview page: country flag selector, number formatting by locale, validation feedback. Include API table.

23. `[ ]` **password-strength demo** — Add overview page: strength meter colors (weak/fair/strong), rule list, integration with a full registration form example. Include API table.

24. `[ ]` **segmented demo** — Add overview page: single-select, multi-select, with icons, stretch-to-fill mode. Include API table.

25. `[ ]` **radio-card demo** — Add overview page: basic cards, cards with icons, horizontal layout, disabled state. Include API table.

26. `[ ]` **form-renderer demo** — Add overview page showing dynamic form generation from a JSON schema. Include field types: text, select, checkbox, date. Full API table.

27. `[ ]` **micro-chart demo** — Add overview page: sparkline, mini bar, mini area variants. Show usage inside stat cards and table cells. Include API table.

28. `[ ]` **breadcrumbs demo** — Add overview page: static, router-linked, custom separator, max-items with collapse. Include API table.

29. `[ ]` **inline-text-edit demo** — Add overview page: click-to-edit field, save on blur vs. save button, validation. Include API table.

30. `[ ]` **overlay-scrollbar demo** — Add overview page: basic usage, custom track/thumb colors, auto-hide behavior. Include API table.

31. `[x]` **empty-state** — New `emr-empty-state` component for zero-data views. Slots for illustration/icon, title, description, and a primary CTA button. Prebuilt presets: no results, no data, error, offline.

32. `[x]` **stat-card** — New `emr-stat-card` for KPI tiles. Displays metric value, label, trend indicator (up/down + percentage), and an optional inline micro-chart.

33. `[x]` **combobox** — New `emr-combobox`: searchable `<select>` replacement with freeform text entry, async option loading, grouped options, and `ControlValueAccessor`.

34. `[x]` **multi-select** — New `emr-multi-select`: chip-based multi-value selector with search/filter. Selected items shown as removable chips inside the input.

35. `[x]` **toast** — New `EmrToast` service with support for stacking toasts, progress bar auto-dismiss, manual close, action buttons, and 4 placement positions.

36. `[x]` **tag / label** — New `emr-tag` for display-only colored labels. Variants: filled, soft, outlined. Support dot prefix and icon prefix.

37. `[x]` **calendar** — New `emr-calendar` with month, week, and day views. Supports event objects with color and title. Click/drag to create events.

38. `[x]` **data-grid** — New `emr-data-grid` with virtual scroll for large datasets, resizable and reorderable columns, frozen columns, inline cell editing, and row grouping.

39. `[x]` **rating** — New `emr-rating` input. Star rating with half-star support and emoji-mode. Implements `ControlValueAccessor`. Configurable max value and icon.

40. `[x]` **clipboard-copy** — New `emrCopyToClipboard` directive and `emr-copy-button` component. Shows visual feedback (icon swap + tooltip) on successful copy.

41. `[ ]` **Live examples on all pages** — Every component demo page must have at least 3 runnable code examples progressing from basic usage to a realistic real-world scenario.

42. `[ ]` **API tables on all pages** — Every component page must document all `@Input()`, `@Output()`, public methods, and CSS custom properties in a formatted table.

43. `[ ]` **Dark mode toggle** — Add a light/dark mode switcher to every example block so users can preview components in both themes without changing the global app theme.

44. `[ ]` **Copy-code button** — Add a one-click copy button to every code snippet in the demo app. Show a brief "Copied!" confirmation state on click.

45. `[ ]` **Component gallery page** — Add a `/components` overview page with a thumbnail grid of every component. Include search/filter by category and quick links to each demo page.

46. `[ ]` **Admin dashboard layout** — Full demo layout: collapsible sidebar, top header with user menu and notifications, main content grid with stat cards, charts, and a data table.

47. `[ ]` **Auth pages layout** — Demo set: login, register, forgot-password, reset-password, 2FA verification. Responsive with left-side illustration and right-side form.

48. `[ ]` **Publish to npm** — Configure ng-packagr output, add `publishConfig` to `package.json`, set up `.npmignore`, verify peer deps, and publish `@elementar-rt/components` to the public npm registry.

49. `[ ]` **CI/CD pipeline** — GitHub Actions workflow: install → lint → test → build library → build demo app → publish to npm on `v*.*.*` tag → deploy demo app to production.

50. `[ ]` **Getting Started guide** — Write a clear installation and setup guide covering: npm install, `provideAnimations`, importing components, adding the stylesheet, and a first working example.

51. `[x]` **digit-roller** — Animated `emr-digit-roller` for rolling number transitions. Animates individual digit columns slot-machine style when the value changes. Inputs: `value`, `duration`, `easing`. Supports comma-formatted and currency values. Use inside stat cards and dashboards.

52. `[x]` **filter-select** — `emr-filter-select` dropdown with a built-in search input that filters options client-side in real time. Supports grouped options, multi-select mode, async option loading with a loading skeleton, clear button, and full `ControlValueAccessor` integration.

53. `[x]` **grid** — `emr-grid` layout component wrapping CSS Grid. Inputs: `columns` (number or breakpoint map e.g. `{sm:1, md:2, lg:3}`), `gap`, `rowGap`, `align`, `justify`. Produces semantic markup with no JavaScript layout logic. Useful for card grids and dashboard panels.

54. `[x]` **guided-tour** — Service-based `EmrGuidedTour.start(steps[])` for step-by-step onboarding. Each step targets a CSS selector, renders a positioned tooltip with title + description + back/next/skip controls, and highlights the element with a transparent cutout overlay. Emits `(tourComplete)` and `(tourSkipped)` events. Persists completion state to localStorage.

55. `[x]` **headless-stepper** — `EmrHeadlessStepperService` with no UI — pure state management for custom stepper implementations. Tracks `currentStep`, `visitedSteps`, per-step `valid` flags. API: `next()`, `prev()`, `goTo(n)`, `reset()`, `isFirst`, `isLast`, `canProceed`. Pair with `emr-step-tracker` for the visual layer.

56. `[x]` **image-placeholder** — `emr-image-placeholder` shown while an `<img>` is loading or on error. Supports three modes: `skeleton` (pulsing grey block), `blur` (low-res src blurred up to full), and `icon` (configurable placeholder icon). Inputs: `src`, `alt`, `mode`, `errorSlot`. Integrates with the `crop` and `image-resizer` components.

57. `[x]` **image-zoom-viewer** — `emr-image-zoom-viewer` with pinch-to-zoom (touch), scroll-wheel zoom (desktop), and pan via drag. Displays a minimap thumbnail in the corner when zoomed in. Inputs: `src`, `minZoom`, `maxZoom`, `showMinimap`. Distinct from `image-viewer` (which is a lightbox gallery).

58. `[x]` **keyboard** — `emr-keyboard` component that renders keyboard shortcut combinations as styled `<kbd>` chip sequences (e.g. `Ctrl + K`, `⌘ + Shift + P`). Inputs: `keys` (string array), `platform` (`mac` | `win` | `auto`). Use inside command-bar hints, help dialogs, and tooltip content.

59. `[x]` **progress-spinner** — `emr-progress-spinner` with `determinate` (value 0–100) and `indeterminate` modes. Inputs: `diameter`, `strokeWidth`, `value`, `color`. Shows an optional percentage label in the centre. Matches `progress-bar` variants and theme palette tokens.

60. `[ ]` **sidenav** — `emr-sidenav-container` + `emr-sidenav` wrapping Angular Material `MatSidenav`. Adds responsive auto-open above a configurable breakpoint, `mode` variants (`side` / `push` / `overlay`), and a `emr-sidenav-content` slot. Integrates with the existing `layout` component.

61. `[x]` **sort** — `emrSort` host directive on a table/list container and `emrSortHeader` on column headers. Tracks active sort `field` and `direction` (`asc` | `desc`). Emits typed `(sortChange): { field, direction }` event. Designed to compose with `emr-table` and `data-view`.

62. `[x]` **split-pane** — `emr-split-pane` with two resizable panels separated by a draggable divider handle. Inputs: `orientation` (`horizontal` | `vertical`), `initialSize` (px or %), `minSize`, `maxSize`. Emits `(sizeChange)`. Optionally persists split position to localStorage via a `storageKey` input.

63. `[x]` **step-tracker** — `emr-step-tracker` visual progress indicator for multi-step flows. Renders steps as numbered circles connected by a progress line with `completed` / `active` / `upcoming` states. Inputs: `steps` (label array), `currentStep`, `orientation` (`horizontal` | `vertical`). Pairs with `headless-stepper` service for state.

64. `[x]` **tiles** — `emr-tiles` CSS-Grid-based tile layout for equal-height blocks. Inputs: `columns`, `gap`. Supports a `featured` directive on the first tile to span two columns. Useful for app launchers, feature grids, and icon dashboards. Lighter alternative to `emr-grid` for uniform tile UIs.

65. `[x]` **video-viewer** — `emr-video-viewer` modal lightbox for playing video. Supports MP4/WebM file URLs, YouTube, and Vimeo embed URLs (auto-detected from the `src` input). Controls: play/pause, seek bar, volume, mute, fullscreen. Keyboard shortcuts: Space (play/pause), `F` (fullscreen), Esc (close).

66. `[x]` **button-toggle** — `emr-button-toggle-group` and `emr-button-toggle` wrapping Angular Material `MatButtonToggle`. Adds icon-only mode, pill/segmented visual style, and `ControlValueAccessor` for reactive forms. Supports single-select and multi-select modes with `value` and `(valueChange)` bindings.

---

## Libraries (advanced, complex components)

67. `[ ]` **image-designer** — Advanced `emr-image-designer` canvas editor. Features: crop, rotate, flip, brightness/contrast/saturation sliders, text overlay with font controls, sticker/shape layer, layer reordering, undo/redo history, and export as PNG/JPEG at configurable quality. Built on the HTML Canvas 2D API.

68. `[ ]` **video-player** — Full-featured `emr-video-player` with custom control bar: play/pause, seek, current time / duration, volume, mute, playback speed selector, picture-in-picture, and fullscreen. Supports MP4/WebM, HLS (via hls.js), and chapter markers from a `chapters` input.

69. `[ ]` **visual-builder** — Drag-and-drop `emr-visual-builder` for composing page layouts from a palette of component blocks. Features: 12-column grid system, component sidebar, live canvas, property inspector panel, responsive preview (desktop/tablet/mobile), and JSON schema export/import.

70. `[ ]` **content-editor** — Block-based `emr-content-editor` for structured long-form content. Block types: heading, paragraph, image, code, quote, list, divider, embed. Built on the existing TipTap core integration with a redesigned floating toolbar and slash-command block picker.
