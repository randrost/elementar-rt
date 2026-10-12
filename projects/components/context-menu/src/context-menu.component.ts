import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CdkMenu } from '@angular/cdk/menu';

/**
 * Menu panel opened by `emrContextMenuTriggerFor` or `emrContextMenuSubTriggerFor`.
 * Must be placed inside an `<ng-template>`.
 */
@Component({
  selector: 'emr-context-menu',
  exportAs: 'emrContextMenu',
  template: '<ng-content/>',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: CdkMenu,
      outputs: ['closed']
    }
  ],
  host: {
    'class': 'emr-context-menu',
    '[class.is-compact]': 'compact()'
  }
})
export class ContextMenuComponent {
  /** Denser items for menus with many entries. */
  compact = input(false, { transform: booleanAttribute });
}
