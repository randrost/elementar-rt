import { Component, computed, input, numberAttribute } from '@angular/core';

export type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer';
export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'emr-progress-bar',
  exportAs: 'emrProgressBar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  host: {
    'class': 'emr-progress-bar',
    '[attr.data-mode]': 'mode()',
    '[attr.data-color]': 'color()',
    'role': 'progressbar',
    '[attr.aria-valuenow]': 'mode() === "determinate" ? value() : null',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
  }
})
export class ProgressBarComponent {
  value = input(0, { transform: numberAttribute });
  bufferValue = input(0, { transform: numberAttribute });
  mode = input<ProgressBarMode>('determinate');
  color = input<ProgressBarColor>('primary');

  protected _fillWidth = computed(() => `${Math.min(100, Math.max(0, this.value()))}%`);
  protected _bufferWidth = computed(() => `${Math.min(100, Math.max(0, this.bufferValue()))}%`);
}
