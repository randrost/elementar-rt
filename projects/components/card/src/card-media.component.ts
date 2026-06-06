import { Component } from '@angular/core';

@Component({
  selector: 'emr-card-media',
  exportAs: 'emrCardMedia',
  template: `<ng-content/>`,
  styles: [`:host { display: block; overflow: hidden; img, video { width: 100%; display: block; object-fit: cover; } }`],
  host: { 'class': 'emr-card-media' }
})
export class CardMediaComponent {}
