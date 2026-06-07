import { Directive, input, computed, HostListener, inject, Host, Optional } from '@angular/core';
import { EmrSortDirective } from './sort.directive';

@Directive({
  selector: '[emrSortHeader]',
  standalone: true,
  exportAs: 'emrSortHeader',
  host: {
    '[attr.data-sort-active]': '_isActive() || null',
    '[attr.data-sort-dir]': '_isActive() ? _sort.activeDirection() : null',
    'role': 'button',
    '[style.cursor]': '"pointer"',
    '[attr.aria-sort]': '_ariaSort()',
  }
})
export class EmrSortHeaderDirective {
  emrSortHeader = input.required<string>();

  protected _sort = inject(EmrSortDirective);

  protected _isActive = computed(() => this._sort.activeField() === this.emrSortHeader());
  protected _ariaSort = computed(() => {
    if (!this._isActive()) return 'none';
    return this._sort.activeDirection() === 'asc' ? 'ascending' : 'descending';
  });

  @HostListener('click')
  onClick(): void {
    this._sort.sort(this.emrSortHeader());
  }
}
