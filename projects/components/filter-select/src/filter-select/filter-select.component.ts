import {
  Component, input, output, signal, computed,
  ChangeDetectionStrategy, booleanAttribute, forwardRef, model
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';

export interface FilterSelectOption {
  value: unknown;
  label: string;
  group?: string;
}

@Component({
  selector: 'emr-filter-select',
  standalone: true,
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './filter-select.component.html',
  styleUrl: './filter-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilterSelectComponent),
    multi: true
  }],
  host: {
    '[attr.data-open]': '_open() || null',
    '[attr.data-disabled]': 'disabled() || null',
  }
})
export class FilterSelectComponent implements ControlValueAccessor {
  options = input<FilterSelectOption[]>([]);
  placeholder = input('Select…');
  multiple = input(false, { transform: booleanAttribute });
  loading = input(false, { transform: booleanAttribute });
  clearable = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });

  valueChange = output<unknown>();

  protected _open = signal(false);
  protected _search = signal('');
  private _value = signal<unknown>(null);

  protected _selected = computed(() => {
    const v = this._value();
    if (this.multiple()) return Array.isArray(v) ? v : [];
    return v;
  });

  protected _hasValue = computed(() => {
    const s = this._selected();
    if (this.multiple()) return Array.isArray(s) && (s as unknown[]).length > 0;
    return s !== null && s !== undefined;
  });

  protected _displayLabel = computed(() => {
    const v = this._value();
    if (this.multiple()) {
      const arr = Array.isArray(v) ? v : [];
      if (!arr.length) return this.placeholder();
      const labels = arr.map(val => this.options().find(o => o.value === val)?.label ?? val);
      return labels.length <= 2 ? labels.join(', ') : `${labels.slice(0, 2).join(', ')} +${labels.length - 2}`;
    }
    const opt = this.options().find(o => o.value === v);
    return opt?.label ?? this.placeholder();
  });

  protected _filtered = computed(() => {
    const q = this._search().toLowerCase();
    return this.options().filter(o => o.label.toLowerCase().includes(q));
  });

  protected _groups = computed(() => {
    const grouped = new Map<string, FilterSelectOption[]>();
    for (const o of this._filtered()) {
      const g = o.group ?? '';
      if (!grouped.has(g)) grouped.set(g, []);
      grouped.get(g)!.push(o);
    }
    return grouped;
  });

  private _onChange = (_: unknown) => {};
  private _onTouched = () => {};

  writeValue(val: unknown): void { this._value.set(val); }
  registerOnChange(fn: (_: unknown) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected _toggle(): void {
    if (this.disabled()) return;
    this._open.set(!this._open());
    if (this._open()) this._search.set('');
  }

  protected _select(opt: FilterSelectOption): void {
    let newVal: unknown;
    if (this.multiple()) {
      const arr = Array.isArray(this._value()) ? [...this._value() as unknown[]] : [];
      const idx = arr.indexOf(opt.value);
      if (idx >= 0) arr.splice(idx, 1); else arr.push(opt.value);
      newVal = arr;
    } else {
      newVal = opt.value;
      this._open.set(false);
    }
    this._value.set(newVal);
    this._onChange(newVal);
    this._onTouched();
    this.valueChange.emit(newVal);
  }

  protected _isSelected(opt: FilterSelectOption): boolean {
    if (this.multiple()) {
      return Array.isArray(this._value()) && (this._value() as unknown[]).includes(opt.value);
    }
    return this._value() === opt.value;
  }

  protected _clear(e: MouseEvent): void {
    e.stopPropagation();
    const v = this.multiple() ? [] : null;
    this._value.set(v);
    this._onChange(v);
    this._onTouched();
  }
}
