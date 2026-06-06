import { booleanAttribute, Component, input, numberAttribute } from '@angular/core';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | string;
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

@Component({
  selector: 'emr-badge',
  exportAs: 'emrBadge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  host: {
    'class': 'emr-badge',
    '[class.is-dot]': 'dot()',
    '[class.is-standalone]': 'standalone()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-position]': 'position()',
  }
})
export class BadgeComponent {
  value = input<number | string | null>(null);
  max = input(99, { transform: numberAttribute });
  dot = input(false, { transform: booleanAttribute });
  standalone = input(false, { transform: booleanAttribute });
  variant = input<BadgeVariant>('default');
  position = input<BadgePosition>('top-right');

  protected get displayValue(): string {
    const v = this.value();
    if (v === null || this.dot()) return '';
    if (typeof v === 'number' && v > this.max()) return `${this.max()}+`;
    return String(v);
  }
}
