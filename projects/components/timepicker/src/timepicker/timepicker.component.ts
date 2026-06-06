import {
  booleanAttribute,
  Component,
  forwardRef,
  input,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'emr-timepicker',
  exportAs: 'emrTimepicker',
  imports: [FormsModule],
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimepickerComponent), multi: true }],
  host: {
    'class': 'emr-timepicker',
    '[class.is-disabled]': 'disabled()',
    '[class.is-24h]': 'mode() === "24h"',
  }
})
export class TimepickerComponent implements ControlValueAccessor {
  placeholder = input('Select time');
  disabled = input(false, { transform: booleanAttribute });
  mode = input<'12h' | '24h'>('24h');

  protected _hours = signal(0);
  protected _minutes = signal(0);
  protected _period = signal<'AM' | 'PM'>('AM');
  protected _open = signal(false);

  private _onChange: (v: string) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(v: string): void {
    if (v) {
      const [h, m] = v.split(':').map(Number);
      this._hours.set(h);
      this._minutes.set(m);
      this._period.set(h >= 12 ? 'PM' : 'AM');
    }
  }
  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected _toggle() { if (!this.disabled()) this._open.update(v => !v); }

  protected _emit() {
    const h = this._hours();
    const m = this._minutes();
    const val = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    this._onChange(val);
    this._onTouched();
  }

  protected _changeHours(delta: number) {
    const max = this.mode() === '24h' ? 23 : 11;
    this._hours.update(h => (h + delta + max + 1) % (max + 1));
    this._emit();
  }

  protected _changeMinutes(delta: number) {
    this._minutes.update(m => (m + delta + 60) % 60);
    this._emit();
  }

  protected _togglePeriod() {
    this._period.update(p => p === 'AM' ? 'PM' : 'AM');
    this._emit();
  }

  protected _pad(n: number): string { return String(n).padStart(2, '0'); }

  protected get _displayValue(): string {
    const h = this._hours();
    const m = this._minutes();
    const hStr = String(h).padStart(2, '0');
    const mStr = String(m).padStart(2, '0');
    if (this.mode() === '12h') return `${hStr}:${mStr} ${this._period()}`;
    return `${hStr}:${mStr}`;
  }
}
