import {
  booleanAttribute,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ComboboxOption {
  label: string;
  value: any;
  group?: string;
  disabled?: boolean;
}

@Component({
  selector: 'emr-combobox',
  exportAs: 'emrCombobox',
  imports: [FormsModule],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ComboboxComponent), multi: true }],
  host: {
    'class': 'emr-combobox',
    '[class.is-open]': '_open()',
    '[class.is-disabled]': 'disabled()',
  }
})
export class ComboboxComponent implements ControlValueAccessor {
  options = input<ComboboxOption[]>([]);
  placeholder = input('Select or type…');
  disabled = input(false, { transform: booleanAttribute });
  allowFreeform = input(false, { transform: booleanAttribute });
  loading = input(false, { transform: booleanAttribute });

  readonly optionSelect = output<ComboboxOption>();
  readonly search = output<string>();

  protected _open = signal(false);
  protected _query = signal('');
  protected _selected = signal<ComboboxOption | null>(null);

  private _onChange: (v: any) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(v: any): void {
    const match = this.options().find(o => o.value === v) ?? null;
    this._selected.set(match);
    this._query.set(match?.label ?? '');
  }
  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected _filtered = computed(() => {
    const q = this._query().toLowerCase();
    return this.options().filter(o => !q || o.label.toLowerCase().includes(q));
  });

  protected _onInput(q: string) {
    this._query.set(q);
    this._open.set(true);
    this.search.emit(q);
    if (this.allowFreeform()) {
      this._onChange(q);
    }
  }

  protected _select(opt: ComboboxOption) {
    if (opt.disabled) return;
    this._selected.set(opt);
    this._query.set(opt.label);
    this._open.set(false);
    this._onChange(opt.value);
    this._onTouched();
    this.optionSelect.emit(opt);
  }

  protected _onFocus() { this._open.set(true); }
  protected _onBlur() { setTimeout(() => this._open.set(false), 150); }

  protected _isSelected(opt: ComboboxOption): boolean {
    return this._selected()?.value === opt.value;
  }
}
