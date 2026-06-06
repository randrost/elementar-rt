import { Component } from '@angular/core';

@Component({
  selector: 'emr-card-header',
  exportAs: 'emrCardHeader',
  template: `<ng-content/>`,
  styles: [`:host { display: flex; align-items: center; gap: calc(var(--spacing) * 3); padding: calc(var(--spacing) * 4) calc(var(--spacing) * 5) 0; }`],
  host: { 'class': 'emr-card-header' }
})
export class CardHeaderComponent {}
