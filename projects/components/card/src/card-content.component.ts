import { Component } from '@angular/core';

@Component({
  selector: 'emr-card-content',
  exportAs: 'emrCardContent',
  template: `<ng-content/>`,
  styles: [`:host { display: block; padding: calc(var(--spacing) * 4) calc(var(--spacing) * 5); flex: 1; }`],
  host: { 'class': 'emr-card-content' }
})
export class CardContentComponent {}
