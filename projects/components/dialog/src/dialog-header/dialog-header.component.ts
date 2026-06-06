import { Component } from '@angular/core';

@Component({
  selector: 'emr-dialog-header',
  exportAs: 'emrDialogHeader',
  template: `<ng-content/>`,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: calc(var(--spacing) * 4);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--color-on-surface);
    }
  `],
  host: { 'class': 'emr-dialog-header' }
})
export class DialogHeaderComponent {}
