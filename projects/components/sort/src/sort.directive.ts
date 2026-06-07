import { Directive, output, signal } from '@angular/core';

export interface EmrSortEvent {
  field: string;
  direction: 'asc' | 'desc';
}

@Directive({
  selector: '[emrSort]',
  standalone: true,
  exportAs: 'emrSort',
})
export class EmrSortDirective {
  sortChange = output<EmrSortEvent>();

  readonly activeField = signal('');
  readonly activeDirection = signal<'asc' | 'desc'>('asc');

  sort(field: string): void {
    if (this.activeField() === field) {
      this.activeDirection.set(this.activeDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.activeField.set(field);
      this.activeDirection.set('asc');
    }
    this.sortChange.emit({ field: this.activeField(), direction: this.activeDirection() });
  }
}
