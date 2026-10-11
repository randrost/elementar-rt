import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model
} from '@angular/core';
import { TOGGLE_GROUP, ToggleGroup } from '@elementar-rt/components/toggle';

export type ButtonGroupVariant = 'standard' | 'connected';

/**
 * Material 3 Expressive button group. Lays out buttons and `emrToggle` toggles
 * either with a gap (`standard`) or joined together (`connected`).
 *
 * Toggles with a `value` are selected through the group: `value` holds the selected
 * value, or an array of values when `multiple` is set.
 */
@Component({
  selector: 'emr-button-group',
  exportAs: 'emrButtonGroup',
  template: '<ng-content/>',
  styleUrl: './button-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TOGGLE_GROUP,
      useExisting: forwardRef(() => ButtonGroupComponent)
    }
  ],
  host: {
    'class': 'emr-button-group',
    'role': 'group',
    '[class.is-standard]': 'variant() === "standard"',
    '[class.is-connected]': 'variant() === "connected"'
  }
})
export class ButtonGroupComponent implements ToggleGroup {
  variant = input<ButtonGroupVariant>('standard');

  /** Allows several toggles to be selected at once. */
  multiple = input(false, { transform: booleanAttribute });

  /** Prevents deselecting the last selected toggle. */
  required = input(false, { transform: booleanAttribute });

  disabled = input(false, { transform: booleanAttribute });

  /**
   * Selected value (single selection) or values (`multiple`).
   * Supports two-way binding with `[(value)]`.
   */
  value = model<unknown>(undefined);

  isSelected(value: unknown): boolean {
    const current = this.value();
    return this.multiple()
      ? Array.isArray(current) && current.includes(value)
      : current !== undefined && current === value;
  }

  toggle(value: unknown): void {
    if (this.multiple()) {
      const current = Array.isArray(this.value()) ? (this.value() as unknown[]) : [];
      const selected = current.includes(value);
      if (selected && this.required() && current.length === 1) {
        return;
      }
      this.value.set(selected ? current.filter(v => v !== value) : [...current, value]);
      return;
    }

    if (this.value() === value) {
      if (!this.required()) {
        this.value.set(undefined);
      }
      return;
    }

    this.value.set(value);
  }
}
