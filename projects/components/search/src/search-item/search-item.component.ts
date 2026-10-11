import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { SEARCH } from '../types';

let nextId = 0;

/** A suggestion or result row inside the open search view. */
@Component({
  selector: 'emr-search-item,[emr-search-item]',
  exportAs: 'emrSearchItem',
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-search-item',
    'role': 'option',
    '[id]': 'id',
    '[attr.aria-selected]': '_active()',
    '[attr.aria-disabled]': 'disabled || null',
    '[class.is-active]': '_active()',
    '[class.is-disabled]': 'disabled',
    '(click)': '_select()',
    '(mousedown)': '$event.preventDefault()'
  }
})
export class SearchItemComponent implements Highlightable {
  private _search = inject(SEARCH);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly id = `emr-search-item-${nextId++}`;

  /** Value emitted by the parent search's `(selected)` output. */
  value = input<unknown>();

  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });

  /** Whether the item is disabled. Disabled items are skipped by keyboard navigation. */
  get disabled(): boolean {
    return this.disabledInput();
  }

  /** Emits when the item is selected by click or keyboard. */
  selected = output<void>();

  protected readonly _active = signal(false);

  setActiveStyles(): void {
    this._active.set(true);
    this.elementRef.nativeElement.scrollIntoView?.({ block: 'nearest' });
  }

  setInactiveStyles(): void {
    this._active.set(false);
  }

  getLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() ?? '';
  }

  /** @docs-private */
  _select(): void {
    if (this.disabled) {
      return;
    }

    this.selected.emit();
    this._search.selectItem(this.value());
  }
}
