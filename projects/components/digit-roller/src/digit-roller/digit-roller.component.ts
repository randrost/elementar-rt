import {
  Component, input, OnChanges, SimpleChanges, signal, computed,
  ChangeDetectionStrategy, numberAttribute
} from '@angular/core';

@Component({
  selector: 'emr-digit-roller',
  standalone: true,
  templateUrl: './digit-roller.component.html',
  styleUrl: './digit-roller.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitRollerComponent implements OnChanges {
  value = input(0, { transform: numberAttribute });
  duration = input(600, { transform: numberAttribute });
  format = input<'none' | 'comma' | 'currency'>('none');
  currency = input('$');
  decimals = input(0, { transform: numberAttribute });

  protected _chars = signal<string[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['format'] || changes['decimals']) {
      this._chars.set(this._toChars(this.value()));
    }
  }

  private _toChars(v: number): string[] {
    const fixed = v.toFixed(this.decimals());
    let str = fixed;
    if (this.format() === 'comma' || this.format() === 'currency') {
      const [int, dec] = fixed.split('.');
      str = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (dec !== undefined ? '.' + dec : '');
    }
    if (this.format() === 'currency') str = this.currency() + str;
    return str.split('');
  }

  protected _isDigit(c: string): boolean { return /\d/.test(c); }
}
