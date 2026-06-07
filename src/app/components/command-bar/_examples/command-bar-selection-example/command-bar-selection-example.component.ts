import { Component, computed, signal } from '@angular/core';
import {
  CommandBarCommandComponent,
  CommandBarComponent,
  CommandBarDividerComponent
} from '@elementar-rt/components/command-bar';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

interface Item {
  id: number;
  name: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-command-bar-selection-example',
  imports: [
    CommandBarComponent,
    CommandBarCommandComponent,
    CommandBarDividerComponent,
    MatCheckbox,
    FormsModule
  ],
  templateUrl: './command-bar-selection-example.component.html',
  styleUrl: './command-bar-selection-example.component.scss'
})
export class CommandBarSelectionExampleComponent {
  items: Item[] = [
    { id: 1, name: 'Alice Johnson', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Carol White', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'David Brown', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Eva Green', role: 'Viewer', status: 'Active' }
  ];

  selected = signal<number[]>([]);
  selectionCount = computed(() => this.selected().length);
  isOpen = computed(() => this.selectionCount() > 0);

  isSelected(id: number): boolean {
    return this.selected().includes(id);
  }

  toggleItem(id: number): void {
    const current = this.selected();
    if (current.includes(id)) {
      this.selected.set(current.filter(i => i !== id));
    } else {
      this.selected.set([...current, id]);
    }
  }

  clearSelection(): void {
    this.selected.set([]);
  }
}
