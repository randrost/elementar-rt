import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CdkMenuItem } from '@angular/cdk/menu';

@Component({
  selector: '[emr-context-menu-item]',
  exportAs: 'emrContextMenuItem',
  template: `
    <ng-content select="[emrContextMenuItemIcon]"/>
    <span class="label"><ng-content/></span>
    <ng-content select="[emrContextMenuShortcut]"/>
  `,
  styleUrl: './context-menu-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: CdkMenuItem,
      inputs: ['cdkMenuItemDisabled: disabled'],
      outputs: ['cdkMenuItemTriggered: triggered']
    }
  ],
  host: {
    'class': 'emr-context-menu-item',
    '[class.is-inset]': 'inset()'
  }
})
export class ContextMenuItemComponent {
  /** Aligns the label with items that show a leading icon or check mark. */
  inset = input(false, { transform: booleanAttribute });
}
