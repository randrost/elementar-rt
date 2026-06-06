import { booleanAttribute, Component, input, output } from '@angular/core';

export type ChipVariant = 'input' | 'filter' | 'suggestion';

@Component({
  selector: 'emr-chip',
  exportAs: 'emrChip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  host: {
    'class': 'emr-chip',
    '[class.is-selected]': 'selected()',
    '[class.is-disabled]': 'disabled()',
    '[attr.data-variant]': 'variant()',
    '(click)': '_onClick()',
  }
})
export class ChipComponent {
  variant = input<ChipVariant>('input');
  selected = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  removable = input(true, { transform: booleanAttribute });

  readonly removed = output<void>();
  readonly selectedChange = output<boolean>();

  protected _onClick() {
    if (this.disabled()) return;
    if (this.variant() === 'filter') {
      this.selectedChange.emit(!this.selected());
    }
  }

  protected _onRemove(event: MouseEvent) {
    event.stopPropagation();
    if (!this.disabled()) this.removed.emit();
  }
}
