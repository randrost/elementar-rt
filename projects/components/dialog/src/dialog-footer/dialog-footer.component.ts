import { Component } from '@angular/core';

@Component({
  selector: 'emr-dialog-footer',
  exportAs: 'emrDialogFooter',
  template: `<ng-content/>`,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: calc(var(--spacing) * 2);
      margin-top: calc(var(--spacing) * 6);
      padding-top: calc(var(--spacing) * 4);
      border-top: 1px solid var(--color-outline-variant);
    }
  `],
  host: { 'class': 'emr-dialog-footer' }
})
export class DialogFooterComponent {}
