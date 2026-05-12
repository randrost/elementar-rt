# TypeScript Strategy

TypeScript conventions used in this project.

## Compiler Settings

- `strict: true` — full strict mode enabled
- `target: ES2022`
- `moduleResolution: bundler`
- No implicit `any`, strict null checks, strict function types

## Type Patterns

### Prefer `type` over `interface` for unions and mapped types

```typescript
// ✅ union / mapped
type ColorScheme = 'light' | 'dark' | 'system';
type ItemMap = Record<string, NavItem>;

// ✅ interface for object shapes that may be extended
interface NavItem {
  label: string;
  route: string;
  icon?: string;
}
```

### Explicit return types on public methods

```typescript
// ✅
getLabel(): string {
  return this.label();
}

// ❌ avoid implicit return type on public API
getLabel() {
  return this.label();
}
```

### Signal types

```typescript
import { signal, Signal, WritableSignal } from '@angular/core';

// typed signals
count: WritableSignal<number> = signal(0);
readonly label: Signal<string>;
```

## File Naming

| File type | Convention |
|-----------|------------|
| Component | `<name>.component.ts` |
| Directive | `<name>.directive.ts` |
| Service | `<name>.service.ts` |
| Store | `<name>.store.ts` |
| Types | `types.ts` (per feature folder) |
| Pipes | `<name>.pipe.ts` |
| Guard | `<name>.guard.ts` |
| Public API | `index.ts` / `public-api.ts` |

## Imports

- Use path aliases defined in `tsconfig.json`
- Import Angular Material components individually (tree-shakeable)
- Do NOT use barrel imports that pull in entire modules

```typescript
// ✅
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

// ❌
import { MatButtonModule } from '@angular/material/button';
```

## NgRx Signals Store Pattern

```typescript
import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

type State = {
  open: boolean;
  items: NavItem[];
};

export const SidebarStore = signalStore(
  { providedIn: 'root' },
  withState<State>({ open: true, items: [] }),
  withComputed(({ items }) => ({
    itemCount: computed(() => items().length),
  })),
  withMethods((store) => ({
    toggle() {
      store.open.update((v) => !v);
    },
  }))
);
```

## Avoiding Common Pitfalls

- Never use `any` — use `unknown` and narrow with type guards
- Never cast with `as` unless unavoidable (e.g., template refs)
- Prefer `readonly` for properties that don't change after init
- Use `satisfies` to validate literal objects against a type without widening

```typescript
const config = {
  theme: 'material',
  version: 3,
} satisfies AppConfig;
```
