import {
  booleanAttribute,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface MultiSelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'emr-multi-select',
  exportAs: 'emrMultiSelect',
  imports: [FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MultiSelectComponent), multi: true }],
  host: {
    'class': 'emr-multi-select',
    '[class.is-open]': '_open()',
    '[class.is-disabled]': 'disabled()',
  }
})
export class MultiSelectComponent implements ControlValueAccessor {
  options = input<MultiSelectOption[]>([]);
  placeholder = input('Select options…');
  disabled = input(false, { transform: booleanAttribute });
  maxDisplay = input(3);

  readonly selectionChange = output<any[]>();

  protected _open = signal(false);
  protected _query = signal('');
  protected _selected = signal<Set<any>>(new Set());

  private _onChange: (v: any[]) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(v: any[]): void { this._selected.set(new Set(v ?? [])); }
  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected _filtered = computed(() => {
    const q = this._query().toLowerCase();
    return this.options().filter(o => !q || o.label.toLowerCase().includes(q));
  });

  protected _selectedOptions = computed(() =>
    this.options().filter(o => this._selected().has(o.value))
  );

  protected _toggle(opt: MultiSelectOption) {
    if (opt.disabled) return;
    const next = new Set(this._selected());
    next.has(opt.value) ? next.delete(opt.value) : next.add(opt.value);
    this._selected.set(next);
    const vals = [...next];
    this._onChange(vals);
    this._onTouched();
    this.selectionChange.emit(vals);
  }

  protected _remove(value: any, event: MouseEvent) {
    event.stopPropagation();
    const next = new Set(this._selected());
    next.delete(value);
    this._selected.set(next);
    const vals = [...next];
    this._onChange(vals);
    this.selectionChange.emit(vals);
  }

  protected _isChecked(opt: MultiSelectOption): boolean { return this._selected().has(opt.value); }

  protected _toggle_open() { if (!this.disabled()) this._open.update(v => !v); }
  protected _onBlur() { setTimeout(() => this._open.set(false), 150); }
}
