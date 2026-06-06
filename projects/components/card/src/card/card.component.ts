import { booleanAttribute, Component, input } from '@angular/core';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

@Component({
  selector: 'emr-card',
  exportAs: 'emrCard',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  host: {
    'class': 'emr-card',
    '[attr.data-variant]': 'variant()',
    '[class.is-interactive]': 'interactive()',
  }
})
export class CardComponent {
  variant = input<CardVariant>('elevated');
  interactive = input(false, { transform: booleanAttribute });
}
