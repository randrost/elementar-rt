import { Directive } from '@angular/core';

/** Keyboard shortcut hint displayed at the end of a context menu item. */
@Directive({
  selector: '[emrContextMenuShortcut]',
  host: {
    'class': 'emr-context-menu-shortcut'
  }
})
export class ContextMenuShortcutDirective {
}
