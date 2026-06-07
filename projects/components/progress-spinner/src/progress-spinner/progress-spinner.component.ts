import { Component, input, computed, ChangeDetectionStrategy, numberAttribute } from '@angular/core';

export type SpinnerMode = 'determinate' | 'indeterminate';

@Component({
  selector: 'emr-progress-spinner',
  standalone: true,
  template: `
    <svg
      class="spinner-svg"
      [attr.viewBox]="'0 0 ' + _diameter() + ' ' + _diameter()"
      [attr.width]="_diameter()"
      [attr.height]="_diameter()"
      [attr.role]="mode() === 'determinate' ? 'progressbar' : 'status'"
      [attr.aria-valuenow]="mode() === 'determinate' ? value() : null"
      [attr.aria-valuemin]="mode() === 'determinate' ? 0 : null"
      [attr.aria-valuemax]="mode() === 'determinate' ? 100 : null"
    >
      <circle
        class="spinner-track"
        [attr.cx]="_center()"
        [attr.cy]="_center()"
        [attr.r]="_radius()"
        fill="none"
        [attr.stroke-width]="strokeWidth()"
      />
      <circle
        class="spinner-fill"
        [attr.cx]="_center()"
        [attr.cy]="_center()"
        [attr.r]="_radius()"
        fill="none"
        [attr.stroke-width]="strokeWidth()"
        [attr.stroke-dasharray]="_circumference()"
        [attr.stroke-dashoffset]="_dashOffset()"
      />
    </svg>
  `,
  styles: [`
    @reference 'tailwindcss';

    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      --emr-spinner-color: var(--color-primary);
      --emr-spinner-track-color: var(--color-surface-container-high);
    }

    .spinner-svg {
      transform: rotate(-90deg);
    }

    .spinner-track {
      stroke: var(--emr-spinner-track-color);
    }

    .spinner-fill {
      stroke: var(--emr-spinner-color);
      stroke-linecap: round;
      transition: stroke-dashoffset 250ms ease;

      :host([mode="indeterminate"]) & {
        animation: spinner-rotate 1.4s linear infinite, spinner-dash 1.4s ease-in-out infinite;
      }
    }

    @keyframes spinner-rotate {
      100% { transform: rotate(360deg); }
    }

    @keyframes spinner-dash {
      0%   { stroke-dashoffset: var(--emr-spinner-dashoffset-start, 80%); }
      50%  { stroke-dashoffset: var(--emr-spinner-dashoffset-mid, 20%); }
      100% { stroke-dashoffset: var(--emr-spinner-dashoffset-start, 80%); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.mode]': 'mode()',
  }
})
export class ProgressSpinnerComponent {
  mode = input<SpinnerMode>('indeterminate');
  value = input(0, { transform: numberAttribute });
  diameter = input(40, { transform: numberAttribute });
  strokeWidth = input(4, { transform: numberAttribute });

  protected _diameter = computed(() => this.diameter());
  protected _center = computed(() => this.diameter() / 2);
  protected _radius = computed(() => (this.diameter() - this.strokeWidth()) / 2);
  protected _circumference = computed(() => 2 * Math.PI * this._radius());
  protected _dashOffset = computed(() => {
    if (this.mode() === 'indeterminate') return this._circumference() * 0.2;
    const pct = Math.min(100, Math.max(0, this.value()));
    return this._circumference() * (1 - pct / 100);
  });
}
