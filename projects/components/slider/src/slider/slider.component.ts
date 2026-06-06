import {
  booleanAttribute,
  Component,
  ElementRef,
  forwardRef,
  input,
  model,
  numberAttribute,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'emr-slider',
  exportAs: 'emrSlider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SliderComponent), multi: true }],
  host: {
    'class': 'emr-slider',
    '[class.is-disabled]': 'disabled()',
    '[class.is-range]': 'range()',
  }
})
export class SliderComponent implements ControlValueAccessor {
  min = input(0, { transform: numberAttribute });
  max = input(100, { transform: numberAttribute });
  step = input(1, { transform: numberAttribute });
  disabled = input(false, { transform: booleanAttribute });
  showValue = input(false, { transform: booleanAttribute });
  showTicks = input(false, { transform: booleanAttribute });
  range = input(false, { transform: booleanAttribute });

  value = model(0);
  valueHigh = model(100);

  private _onChange: (v: number | [number, number]) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(v: number | [number, number]): void {
    if (Array.isArray(v)) { this.value.set(v[0]); this.valueHigh.set(v[1]); }
    else this.value.set(v ?? 0);
  }
  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected _onInput(event: Event, which: 'low' | 'high' = 'low') {
    const v = Number((event.target as HTMLInputElement).value);
    if (which === 'low') this.value.set(v);
    else this.valueHigh.set(v);
    const emit = this.range() ? [this.value(), this.valueHigh()] as [number, number] : this.value();
    this._onChange(emit);
    this._onTouched();
  }

  protected get _fillStyle(): Record<string, string> {
    const pct = (v: number) => ((v - this.min()) / (this.max() - this.min())) * 100;
    if (this.range()) {
      const lo = pct(Math.min(this.value(), this.valueHigh()));
      const hi = pct(Math.max(this.value(), this.valueHigh()));
      return { left: `${lo}%`, width: `${hi - lo}%` };
    }
    return { left: '0%', width: `${pct(this.value())}%` };
  }
}
