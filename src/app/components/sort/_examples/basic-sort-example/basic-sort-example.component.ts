import { Component, computed, signal } from '@angular/core';
import { EmrSortDirective, EmrSortHeaderDirective, EmrSortEvent } from '@elementar-rt/components/sort';

interface User {
  name: string;
  role: string;
  joined: string;
}

@Component({
  selector: 'app-basic-sort-example',
  imports: [EmrSortDirective, EmrSortHeaderDirective],
  templateUrl: './basic-sort-example.component.html',
  styleUrl: './basic-sort-example.component.scss'
})
export class BasicSortExampleComponent {
  private _sortField = signal('');
  private _sortDir = signal<'asc' | 'desc'>('asc');

  private _data: User[] = [
    { name: 'Alice Martin', role: 'Admin', joined: '2023-01-15' },
    { name: 'Bob Chen', role: 'Developer', joined: '2022-06-20' },
    { name: 'Carol White', role: 'Designer', joined: '2024-03-05' },
    { name: 'Dan Lee', role: 'Developer', joined: '2021-11-10' },
    { name: 'Eva Brown', role: 'Manager', joined: '2023-08-22' },
  ];

  rows = computed(() => {
    const field = this._sortField();
    const dir = this._sortDir();
    if (!field) return this._data;
    return [...this._data].sort((a, b) => {
      const av = a[field as keyof User];
      const bv = b[field as keyof User];
      return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  });

  onSort(event: EmrSortEvent): void {
    this._sortField.set(event.field);
    this._sortDir.set(event.direction);
  }
}
