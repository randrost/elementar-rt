import { Component, signal } from '@angular/core';
import { ContextMenuTriggerDirective, ContextMenuComponent, ContextMenuItemComponent, ContextMenuCheckboxItemComponent, ContextMenuRadioItemComponent, ContextMenuSubTriggerComponent, ContextMenuGroupComponent, ContextMenuLabelComponent, ContextMenuSeparatorComponent, ContextMenuItemIconDirective, ContextMenuShortcutDirective } from '@elementar-rt/components/context-menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-basic-context-menu-example',
  imports: [
    ContextMenuTriggerDirective,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuCheckboxItemComponent,
    ContextMenuRadioItemComponent,
    ContextMenuSubTriggerComponent,
    ContextMenuGroupComponent,
    ContextMenuLabelComponent,
    ContextMenuSeparatorComponent,
    ContextMenuItemIconDirective,
    ContextMenuShortcutDirective,
    MatIcon
  ],
  templateUrl: './basic-context-menu-example.component.html',
  styleUrl: './basic-context-menu-example.component.scss'
})
export class BasicContextMenuExampleComponent {
  showBookmarks = signal(true);
  showFullUrls = signal(false);
  person = signal('pedro');
  lastAction = signal('');
}
