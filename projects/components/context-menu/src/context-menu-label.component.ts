import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Non-interactive heading for a section of a context menu. */
@Component({
  selector: 'emr-context-menu-label',
  template: '<ng-content/>',
  styles: `
    @reference 'tailwindcss';

    :host {
      display: flex;
      align-items: flex-end;
      min-height: --spacing(8);
      padding: 0 var(--emr-context-menu-item-padding) --spacing(1);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--emr-context-menu-muted-color);
      user-select: none;
    }

    :host.is-inset {
      padding-inline-start: var(--emr-context-menu-item-inset);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-context-menu-label',
    '[class.is-inset]': 'inset()'
  }
})
export class ContextMenuLabelComponent {
  inset = input(false, { transform: booleanAttribute });
}
