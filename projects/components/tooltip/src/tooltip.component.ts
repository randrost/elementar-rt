import { Component, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TooltipPlacement } from './tooltip.directive';

@Component({
  selector: 'emr-tooltip-content',
  imports: [NgTemplateOutlet],
  template: `
    <div class="tooltip-inner" [attr.data-placement]="placement()">
      @if (templateRef()) {
        <ng-container [ngTemplateOutlet]="templateRef()!"/>
      } @else {
        {{ text() }}
      }
    </div>
  `,
  styles: [`
    @reference 'tailwindcss';
    .tooltip-inner {
      --emr-tooltip-bg: var(--color-inverse-surface);
      --emr-tooltip-color: var(--color-inverse-on-surface);
      background: var(--emr-tooltip-bg);
      color: var(--emr-tooltip-color);
      padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2.5);
      border-radius: theme(--radius-lg);
      font-size: var(--text-xs);
      font-weight: 500;
      max-width: calc(var(--spacing) * 56);
      line-height: 1.4;
      animation: tooltipIn 120ms ease;
    }
    @keyframes tooltipIn {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
  `]
})
export class TooltipComponent {
  text = input('');
  templateRef = input<TemplateRef<any> | null>(null);
  placement = input<TooltipPlacement>('top');
}
