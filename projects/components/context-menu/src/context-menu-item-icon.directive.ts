import { Directive } from '@angular/core';

/** Leading icon of a context menu item. */
@Directive({
  selector: '[emrContextMenuItemIcon]',
  host: {
    'class': 'emr-context-menu-item-icon',
    'aria-hidden': 'true'
  }
})
export class ContextMenuItemIconDirective {
}
