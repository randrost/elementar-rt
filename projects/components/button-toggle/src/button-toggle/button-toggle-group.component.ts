import {
  Component, input, output, signal, computed,
  ChangeDetectionStrategy, booleanAttribute, forwardRef, model
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type ButtonToggleVariant = 'default' | 'pill' | 'segmented';

@Component({
  selector: 'emr-button-toggle-group',
  standalone: true,
  template: `<ng-content />`,
  styles: [`
    @reference 'tailwindcss';

    :host {
      display: inline-flex;
      border-radius: theme(--radius-lg);
      border: 1px solid var(--color-outline-variant);
      overflow: hidden;
      background: var(--color-surface-container);

      &[data-variant="pill"] {
        border-radius: 9999px;
        background: var(--color-surface-container-low);
        padding: --spacing(0.5);
        gap: --spacing(0.5);
        border: none;
      }

      &[data-variant="segmented"] {
        border-radius: theme(--radius-xl);
        background: var(--color-surface-variant);
        padding: --spacing(0.5);
        gap: 0;
        border: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonToggleGroupComponent),
    multi: true
  }],
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-multi]': 'multiple() || null',
    'role': 'group',
  }
})
export class ButtonToggleGroupComponent implements ControlValueAccessor {
  variant = input<ButtonToggleVariant>('default');
  multiple = input(false, { transform: booleanAttribute });

  value = model<unknown>(null);
  valueChange = output<unknown>();

  private _onChange = (_: unknown) => {};
  private _onTouched = () => {};

  writeValue(val: unknown): void { this.value.set(val); }
  registerOnChange(fn: (_: unknown) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }

  _select(val: unknown): void {
    if (this.multiple()) {
      const cur = Array.isArray(this.value()) ? [...this.value() as unknown[]] : [];
      const idx = cur.indexOf(val);
      if (idx >= 0) cur.splice(idx, 1); else cur.push(val);
      this.value.set(cur);
      this._onChange(cur);
    } else {
      this.value.set(val);
      this._onChange(val);
    }
    this._onTouched();
    this.valueChange.emit(this.value());
  }

  _isActive(val: unknown): boolean {
    if (this.multiple()) {
      return Array.isArray(this.value()) && (this.value() as unknown[]).includes(val);
    }
    return this.value() === val;
  }
}
