import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { CdkMenuGroup } from '@angular/cdk/menu';

/**
 * Groups related items. Each group is rendered as its own segment of the menu,
 * and radio items inside a group are mutually exclusive.
 */
@Component({
  selector: 'emr-context-menu-group',
  exportAs: 'emrContextMenuGroup',
  template: '<ng-content/>',
  styles: `
    @reference 'tailwindcss';

    :host {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: --spacing(1);
      border-radius: --spacing(1);
      background: var(--emr-context-menu-bg);
      box-shadow: var(--emr-context-menu-shadow);
    }

    :host:first-child {
      border-top-left-radius: var(--emr-context-menu-radius);
      border-top-right-radius: var(--emr-context-menu-radius);
    }

    :host:last-child {
      border-bottom-left-radius: var(--emr-context-menu-radius);
      border-bottom-right-radius: var(--emr-context-menu-radius);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [CdkMenuGroup],
  host: {
    'class': 'emr-context-menu-group',
    'role': 'group'
  }
})
export class ContextMenuGroupComponent {
  /** Value of the selected radio item in this group. Supports `[(value)]`. */
  value = model<unknown>();
}
