import { Component, input, output } from '@angular/core';

export type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'emr-snackbar',
  exportAs: 'emrSnackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  host: {
    'class': 'emr-snackbar',
    '[attr.data-variant]': 'variant()',
  }
})
export class SnackbarComponent {
  message = input('');
  action = input('');
  variant = input<SnackbarVariant>('default');

  readonly dismissed = output<void>();
  readonly actionClick = output<void>();
}
