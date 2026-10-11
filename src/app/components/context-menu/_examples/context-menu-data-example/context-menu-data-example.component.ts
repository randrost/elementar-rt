import { Component, signal } from '@angular/core';
import { ContextMenuTriggerDirective, ContextMenuComponent, ContextMenuItemComponent, ContextMenuItemIconDirective } from '@elementar-rt/components/context-menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-context-menu-data-example',
  imports: [
    ContextMenuTriggerDirective,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuItemIconDirective,
    MatIcon
  ],
  templateUrl: './context-menu-data-example.component.html',
  styleUrl: './context-menu-data-example.component.scss'
})
export class ContextMenuDataExampleComponent {
  files = signal(['Quarterly report.pdf', 'Team photo.png', 'Roadmap.xlsx']);
  message = signal('Right click a file');

  open(file: string): void {
    this.message.set(`Opened ${file}`);
  }

  remove(file: string): void {
    this.files.update(files => files.filter(f => f !== file));
    this.message.set(`Deleted ${file}`);
  }
}
