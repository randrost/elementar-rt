import { Component } from '@angular/core';
import { ContextMenuTriggerDirective, ContextMenuComponent, ContextMenuItemComponent, ContextMenuItemIconDirective, ContextMenuShortcutDirective, ContextMenuSeparatorComponent } from '@elementar-rt/components/context-menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-compact-context-menu-example',
  imports: [
    ContextMenuTriggerDirective,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuItemIconDirective,
    ContextMenuShortcutDirective,
    ContextMenuSeparatorComponent,
    MatIcon
  ],
  templateUrl: './compact-context-menu-example.component.html',
  styleUrl: './compact-context-menu-example.component.scss'
})
export class CompactContextMenuExampleComponent {}
