# Angular Strategy

Conventions and patterns used in this project. Follow these when generating or modifying Angular code.

## Component Architecture

- **Standalone components only** — never use NgModules
- **Inline imports** — every component declares its own `imports: []` array
- Component files: `<name>.component.ts`, `<name>.component.html`, `<name>.component.scss`
- Directive files: `<name>.directive.ts`
- Store files: `<name>.store.ts` (NgRx signals store)

## Naming Conventions

| Type | Prefix | Example |
|------|--------|---------|
| Library component selector | `emr-` | `<emr-sidebar>` |
| Demo app component selector | `app-` | `<app-sidebar>` |
| Component class | PascalCase + `Component` | `SidebarComponent` |
| Directive class | PascalCase + `Directive` | `SidebarCompactViewModeDirective` |
| Signal store | PascalCase + `Store` | `SidebarStore` |

## Signals & State

- Use `input()`, `output()`, `model()` signal-based APIs — not `@Input()`, `@Output()`
- Use `computed()` for derived state
- Use `@ngrx/signals` `signalStore` for feature-level state
- Prefer `signal()` + `.set()` / `.update()` over subjects/observables where possible

```typescript
// ✅ correct
count = signal(0);
doubled = computed(() => this.count() * 2);

// ❌ avoid
@Input() count = 0;
```

## Component Shell

```typescript
import { Component, input, output, signal, computed } from '@angular/core';

@Component({
  selector: 'emr-example',
  imports: [],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  // inputs
  label = input<string>('');

  // outputs
  clicked = output<void>();

  // internal state
  active = signal(false);
}
```

## Template Patterns

- Use `@if` / `@for` / `@switch` — not `*ngIf` / `*ngFor`
- Use `@let` for local template variables

```html
@if (active()) {
  <span>Active</span>
}

@for (item of items(); track item.id) {
  <li>{{ item.label }}</li>
}
```

## Routing

- Lazy-loaded routes via `loadComponent` — never `loadChildren` with modules
- Route files: `*.routes.ts`

```typescript
{
  path: 'sidebar',
  loadComponent: () => import('./sidebar/sidebar.component').then(m => m.SidebarComponent)
}
```

## Library Structure (`projects/components/`)

Each feature is a separate secondary entry point:

```
<feature>/
  src/
    <feature>.component.ts
    <feature>.component.html
    <feature>.component.scss
  index.ts           # re-exports public API
  ng-package.json    # entry point config
  public-api.ts      # explicit public surface
```

Import from secondary entry points:

```typescript
import { SidebarComponent } from '@elementar-rt/components/sidebar';
```

## Examples Convention

Demo examples live at `src/app/components/<name>/_examples/<example-name>/`.
Each example is a standalone component that can be shown live and as source code.

## Testing

- Jasmine + Karma
- Spec files co-located: `<name>.component.spec.ts`
- Use `TestBed.configureTestingModule` with standalone component pattern
