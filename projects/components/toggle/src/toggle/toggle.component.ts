import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model
} from '@angular/core';
import { TOGGLE_GROUP, ToggleShape, ToggleSize, ToggleVariant } from '../types';

/**
 * Material 3 Expressive toggle button. Switches between selected and unselected
 * states and morphs its shape when selected (round ↔ square).
 *
 * Inside an `emr-button-group`, toggles with a `value` are selected through the group.
 */
@Component({
  selector: 'button[emrToggle], a[emrToggle]',
  exportAs: 'emrToggle',
  template: '<span class="state-layer" aria-hidden="true"></span><ng-content/>',
  styleUrl: './toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-toggle',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-shape]': 'shape()',
    '[class.is-pressed]': 'isPressed()',
    '[class.is-icon-only]': 'iconOnly()',
    '[class.is-disabled]': 'isDisabled()',
    '[attr.aria-pressed]': 'isPressed()',
    '[attr.disabled]': 'isDisabled() || null',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.type]': '"button"',
    '(click)': '_toggle($event)'
  }
})
export class ToggleComponent {
  private _group = inject(TOGGLE_GROUP, { optional: true });

  variant = input<ToggleVariant>('filled');
  size = input<ToggleSize>('sm');

  /** Resting shape. Selection morphs a round toggle to square and a square toggle to round. */
  shape = input<ToggleShape>('round');

  /** Square, icon-only layout. */
  iconOnly = input(false, { transform: booleanAttribute });

  /** Selected state of a standalone toggle. Supports two-way binding with `[(pressed)]`. */
  pressed = model(false);

  /** Identifies the toggle within an `emr-button-group`. */
  value = input<unknown>();

  disabled = input(false, { transform: booleanAttribute });

  readonly isDisabled = computed(() => this.disabled() || !!this._group?.disabled());

  readonly isPressed = computed(() => {
    const value = this.value();
    return this._group && value !== undefined ? this._group.isSelected(value) : this.pressed();
  });

  protected _toggle(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    const value = this.value();
    if (this._group && value !== undefined) {
      this._group.toggle(value);
    } else {
      this.pressed.set(!this.pressed());
    }
  }
}
