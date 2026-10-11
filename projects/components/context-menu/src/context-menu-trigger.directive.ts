import { Directive } from '@angular/core';
import { CdkContextMenuTrigger } from '@angular/cdk/menu';

/**
 * Opens an `emr-context-menu` at the pointer position when the host element is
 * right-clicked (or receives the `contextmenu` event from the keyboard).
 *
 * ```html
 * <div [emrContextMenuTriggerFor]="menu">Right click here</div>
 * <ng-template #menu>
 *   <emr-context-menu>...</emr-context-menu>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[emrContextMenuTriggerFor]',
  exportAs: 'emrContextMenuTrigger',
  hostDirectives: [
    {
      directive: CdkContextMenuTrigger,
      inputs: [
        'cdkContextMenuTriggerFor: emrContextMenuTriggerFor',
        'cdkContextMenuTriggerData: emrContextMenuTriggerData',
        'cdkContextMenuDisabled: emrContextMenuDisabled'
      ],
      outputs: [
        'cdkContextMenuOpened: emrContextMenuOpened',
        'cdkContextMenuClosed: emrContextMenuClosed'
      ]
    }
  ],
  host: {
    'class': 'emr-context-menu-trigger'
  }
})
export class ContextMenuTriggerDirective {
}
