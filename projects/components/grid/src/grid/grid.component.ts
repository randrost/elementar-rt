import { Component, input, computed, ChangeDetectionStrategy, numberAttribute } from '@angular/core';

export type GridColumns = number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };

@Component({
  selector: 'emr-grid',
  standalone: true,
  template: `<ng-content />`,
  styles: [`
    @reference 'tailwindcss';

    :host {
      display: grid;
      grid-template-columns: var(--emr-grid-cols, repeat(1, 1fr));
      gap: var(--emr-grid-gap, --spacing(4));
      row-gap: var(--emr-grid-row-gap, var(--emr-grid-gap, --spacing(4)));
      align-items: var(--emr-grid-align, start);
      justify-items: var(--emr-grid-justify, stretch);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--emr-grid-cols]': '_colsStyle()',
    '[style.--emr-grid-gap]': '_gapStyle()',
    '[style.--emr-grid-row-gap]': '_rowGapStyle()',
    '[style.--emr-grid-align]': 'align()',
    '[style.--emr-grid-justify]': 'justify()',
  }
})
export class GridComponent {
  columns = input<GridColumns>(1);
  gap = input<string>('');
  rowGap = input<string>('');
  align = input<string>('start');
  justify = input<string>('stretch');

  protected _colsStyle = computed(() => {
    const c = this.columns();
    if (typeof c === 'number') return `repeat(${c}, 1fr)`;
    return `repeat(${c.xs ?? 1}, 1fr)`;
  });

  protected _gapStyle = computed(() => this.gap() || null);
  protected _rowGapStyle = computed(() => this.rowGap() || null);
}
