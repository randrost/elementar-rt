import { Component } from '@angular/core';

@Component({
  selector: 'emr-card-actions',
  exportAs: 'emrCardActions',
  template: `<ng-content/>`,
  styles: [`:host { display: flex; align-items: center; gap: calc(var(--spacing) * 2); padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4); border-top: 1px solid var(--color-outline-variant); }`],
  host: { 'class': 'emr-card-actions' }
})
export class CardActionsComponent {}
