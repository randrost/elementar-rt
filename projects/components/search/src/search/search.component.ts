import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  DestroyRef,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SearchItemComponent } from '../search-item/search-item.component';
import { SEARCH, SearchHost, SearchVariant } from '../types';

let nextId = 0;

/**
 * Material 3 search: a search bar that expands into a search view showing
 * suggestions or results.
 *
 * - `docked` opens the view as a panel attached below the bar.
 * - `fullscreen` expands the bar and view to cover the whole window (compact screens).
 */
@Component({
  selector: 'emr-search',
  exportAs: 'emrSearch',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SEARCH,
      useExisting: forwardRef(() => SearchComponent)
    }
  ],
  host: {
    'class': 'emr-search',
    '[class.is-open]': 'open()',
    '[class.is-docked]': 'variant() === "docked"',
    '[class.is-fullscreen]': 'variant() === "fullscreen"',
    '[class.is-disabled]': 'disabled()',
    '(focusout)': '_onFocusOut($event)',
    '(keydown.escape)': '_onEscape($event)'
  }
})
export class SearchComponent implements SearchHost {
  private _document = inject(DOCUMENT);
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** How the search view is presented when the search is open. */
  variant = input<SearchVariant>('docked');

  /** Whether the search view is open. Supports two-way binding with `[(open)]`. */
  open = model(false);

  /** Current text of the search input. Supports two-way binding with `[(query)]`. */
  query = model('');

  placeholder = input('Search');

  disabled = input(false, { transform: booleanAttribute });

  /** Accessible label of the search input. */
  ariaLabel = input('Search', { alias: 'aria-label' });

  /** Emits the query when the user submits the search (Enter without an active item). */
  readonly search = output<string>();

  /** Emits the `value` of a search item when it is selected. */
  readonly selected = output<unknown>();

  protected readonly _listId = `emr-search-view-${nextId++}`;
  protected readonly _activeItemId = signal<string | null>(null);

  private readonly _input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private readonly _items = contentChildren(SearchItemComponent, { descendants: true });
  private _keyManager: ActiveDescendantKeyManager<SearchItemComponent> | null = null;

  constructor() {
    // Rebuild the key manager whenever the rendered items change.
    effect(onCleanup => {
      const items = this._items();
      const keyManager = new ActiveDescendantKeyManager<SearchItemComponent>([...items]).withWrap();
      const subscription = keyManager.change.subscribe(() =>
        this._activeItemId.set(keyManager.activeItem?.id ?? null)
      );
      untracked(() => this._activeItemId.set(null));
      this._keyManager = keyManager;
      onCleanup(() => {
        subscription.unsubscribe();
        keyManager.destroy();
      });
    });

    // Reset the highlighted item when the search closes.
    effect(() => {
      if (!this.open()) {
        untracked(() => this._resetActiveItem());
      }
    });

    // Close the docked view when the pointer goes down outside the search.
    const onPointerDown = (event: Event) => {
      if (this.open() && this.variant() === 'docked' && !this._contains(event.target)) {
        this.close();
      }
    };
    this._document.addEventListener('pointerdown', onPointerDown, true);
    inject(DestroyRef).onDestroy(() =>
      this._document.removeEventListener('pointerdown', onPointerDown, true)
    );
  }

  /** Opens the search view and focuses the input. */
  openSearch(): void {
    if (this.disabled()) {
      return;
    }

    this.open.set(true);
    this._input().nativeElement.focus();
  }

  /** Closes the search view. */
  close(): void {
    this.open.set(false);
  }

  /** Clears the query and keeps the focus in the input. */
  clear(): void {
    this.query.set('');
    this._resetActiveItem();
    this._input().nativeElement.focus();
  }

  /** @docs-private */
  selectItem(value: unknown): void {
    this.selected.emit(value);
    this.close();
  }

  protected _onBarClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;

    // Buttons placed in the leading/trailing slots keep their own behaviour.
    if (!this.open() && !target?.closest('button:not(.emr-search-open), a')) {
      this.openSearch();
    }
  }

  protected _onFocus(): void {
    if (!this.disabled()) {
      this.open.set(true);
    }
  }

  protected _onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.open.set(true);
    this._resetActiveItem();
  }

  protected _onKeydown(event: KeyboardEvent): void {
    const keyManager = this._keyManager;

    if (event.key === 'Enter') {
      event.preventDefault();
      const active = keyManager?.activeItem;
      if (this.open() && active) {
        active._select();
      } else {
        this.search.emit(this.query());
      }
      return;
    }

    if (!keyManager || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) {
      return;
    }

    if (!this.open()) {
      this.open.set(true);
    }

    if (event.key === 'ArrowDown') {
      keyManager.setNextItemActive();
    } else {
      keyManager.setPreviousItemActive();
    }
    event.preventDefault();
  }

  protected _onSubmit(event: Event): void {
    event.preventDefault();
  }

  protected _onClear(): void {
    if (this.query()) {
      this.clear();
    } else {
      this.close();
    }
  }

  protected _onEscape(event: Event): void {
    if (this.open()) {
      event.stopPropagation();
      this.close();
    }
  }

  protected _onFocusOut(event: FocusEvent): void {
    // Keyboard users tabbing out of a docked search close the view.
    if (this.variant() === 'docked' && event.relatedTarget && !this._contains(event.relatedTarget)) {
      this.close();
    }
  }

  private _resetActiveItem(): void {
    this._keyManager?.updateActiveItem(-1);
    this._activeItemId.set(null);
  }

  private _contains(target: EventTarget | null): boolean {
    return target instanceof Node && this._elementRef.nativeElement.contains(target);
  }
}
