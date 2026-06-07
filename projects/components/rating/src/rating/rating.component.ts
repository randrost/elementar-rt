import {
  Component, input, output, signal, computed,
  ChangeDetectionStrategy, booleanAttribute, numberAttribute, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'emr-rating',
  standalone: true,
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingComponent),
    multi: true
  }],
  host: {
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
  }
})
export class RatingComponent implements ControlValueAccessor {
  max = input(5, { transform: numberAttribute });
  allowHalf = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  readonly = input(false, { transform: booleanAttribute });
  size = input<'sm' | 'md' | 'lg'>('md');
  color = input<string>('');

  ratingChange = output<number>();

  protected _value = signal(0);
  protected _hovered = signal(-1);

  protected _stars = computed(() => {
    const max = this.max();
    return Array.from({ length: max }, (_, i) => i + 1);
  });

  protected _displayValue = computed(() =>
    this._hovered() >= 0 ? this._hovered() : this._value()
  );

  private _onChange = (_: number) => {};
  private _onTouched = () => {};

  writeValue(val: number): void { this._value.set(val ?? 0); }
  registerOnChange(fn: (_: number) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {}

  protected _getStarFill(star: number): 'full' | 'half' | 'empty' {
    const val = this._displayValue();
    if (val >= star) return 'full';
    if (this.allowHalf() && val >= star - 0.5) return 'half';
    return 'empty';
  }

  protected _onMouseMove(star: number, event: MouseEvent): void {
    if (this.disabled() || this.readonly()) return;
    if (this.allowHalf()) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const half = event.clientX < rect.left + rect.width / 2;
      this._hovered.set(half ? star - 0.5 : star);
    } else {
      this._hovered.set(star);
    }
  }

  protected _onMouseLeave(): void { this._hovered.set(-1); }

  protected _onSelect(star: number, event: MouseEvent): void {
    if (this.disabled() || this.readonly()) return;
    let val = star;
    if (this.allowHalf()) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      val = event.clientX < rect.left + rect.width / 2 ? star - 0.5 : star;
    }
    this._value.set(val);
    this._onChange(val);
    this._onTouched();
    this.ratingChange.emit(val);
  }
}
