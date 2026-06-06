import {
  booleanAttribute,
  Component,
  forwardRef,
  input,
  model,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'emr-datepicker',
  exportAs: 'emrDatepicker',
  imports: [FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerComponent), multi: true }],
  host: {
    'class': 'emr-datepicker',
    '[class.is-open]': '_open()',
    '[class.is-disabled]': 'disabled()',
  }
})
export class DatepickerComponent implements ControlValueAccessor {
  placeholder = input('Select date');
  disabled = input(false, { transform: booleanAttribute });
  min = input<string>('');
  max = input<string>('');
  rangeMode = input(false, { transform: booleanAttribute });

  protected _open = signal(false);
  protected _value = signal<string>('');
  protected _viewDate = signal(new Date());

  private _onChange: (v: string) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(v: string): void { this._value.set(v ?? ''); }
  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(d: boolean): void {}

  protected _toggle() {
    if (!this.disabled()) this._open.update(v => !v);
  }

  protected _selectDay(date: Date) {
    const iso = date.toISOString().split('T')[0];
    this._value.set(iso);
    this._onChange(iso);
    this._onTouched();
    this._open.set(false);
  }

  protected get _displayValue(): string {
    return this._value() || this.placeholder();
  }

  protected get _calendarDays(): (Date | null)[] {
    const d = new Date(this._viewDate());
    d.setDate(1);
    const firstDay = d.getDay();
    const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const days: (Date | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(d.getFullYear(), d.getMonth(), i));
    }
    return days;
  }

  protected get _monthLabel(): string {
    return this._viewDate().toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  protected _prevMonth() {
    this._viewDate.update(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  protected _nextMonth() {
    this._viewDate.update(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  protected _isSelected(day: Date | null): boolean {
    if (!day) return false;
    return day.toISOString().split('T')[0] === this._value();
  }

  protected _isToday(day: Date | null): boolean {
    if (!day) return false;
    return day.toDateString() === new Date().toDateString();
  }
}
