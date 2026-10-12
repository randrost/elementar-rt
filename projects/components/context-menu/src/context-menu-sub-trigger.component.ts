import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

/** Menu item that opens a nested `emr-context-menu`. */
@Component({
  selector: '[emrContextMenuSubTriggerFor]',
  exportAs: 'emrContextMenuSubTrigger',
  template: `
    <ng-content select="[emrContextMenuItemIcon]"/>
    <span class="label"><ng-content/></span>
    <svg class="chevron" viewBox="0 -960 960 960" aria-hidden="true">
      <path d="M517.85-480 354.92-642.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69l179.77 179.77q5.61 5.62 7.92 11.85 2.31 6.23 2.31 13.46t-2.31 13.46q-2.31 6.23-7.92 11.85L397.08-274.92q-8.31 8.3-20.89 8.5-12.57.19-21.27-8.5-8.69-8.7-8.69-21.08 0-12.38 8.69-21.08L517.85-480Z"/>
    </svg>
  `,
  styleUrl: './context-menu-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: CdkMenuItem,
      inputs: ['cdkMenuItemDisabled: disabled']
    },
    {
      directive: CdkMenuTrigger,
      inputs: ['cdkMenuTriggerFor: emrContextMenuSubTriggerFor', 'cdkMenuTriggerData: emrContextMenuSubTriggerData']
    }
  ],
  host: {
    'class': 'emr-context-menu-item emr-context-menu-sub-trigger',
    '[class.is-inset]': 'inset()'
  }
})
export class ContextMenuSubTriggerComponent {
  /** Aligns the label with items that show a leading icon or check mark. */
  inset = input(false, { transform: booleanAttribute });
}
