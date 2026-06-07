import { Component, input, ChangeDetectionStrategy, numberAttribute } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[emrTileFeatured]',
  standalone: true,
  host: { '[style.grid-column]': '"span 2"' }
})
export class TileFeaturedDirective {}

@Component({
  selector: 'emr-tiles',
  standalone: true,
  template: `<ng-content />`,
  styles: [`
    @reference 'tailwindcss';

    :host {
      display: grid;
      grid-template-columns: repeat(var(--emr-tiles-cols, 3), 1fr);
      gap: var(--emr-tiles-gap, --spacing(4));
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--emr-tiles-cols]': 'columns()',
    '[style.--emr-tiles-gap]': 'gap() || null',
  }
})
export class TilesComponent {
  columns = input(3, { transform: numberAttribute });
  gap = input<string>('');
}
