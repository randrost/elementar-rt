import { Component } from '@angular/core';

@Component({
  selector: 'emr-chip-list',
  exportAs: 'emrChipList',
  templateUrl: './chip-list.component.html',
  styleUrl: './chip-list.component.scss',
  host: {
    'class': 'emr-chip-list',
    'role': 'listbox',
  }
})
export class ChipListComponent {}
