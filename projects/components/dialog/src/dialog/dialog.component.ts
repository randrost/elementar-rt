import {
  booleanAttribute,
  Component,
  input,
  output,
  TemplateRef,
  Type
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

@Component({
  selector: 'emr-dialog',
  exportAs: 'emrDialog',
  imports: [NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  host: {
    'class': 'emr-dialog-overlay',
    '[attr.data-size]': 'size()',
    '(click)': '_onBackdropClick($event)',
  }
})
export class DialogComponent {
  size = input<DialogSize>('md');
  disableClose = input(false, { transform: booleanAttribute });
  panelClass = input<string | string[]>('');
  contentComponent = input<Type<any> | null>(null);
  contentTemplate = input<TemplateRef<any> | null>(null);
  data = input<any>(null);

  readonly closeRequest = output<void>();

  protected _onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && !this.disableClose()) {
      this.closeRequest.emit();
    }
  }

  protected _onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && !this.disableClose()) {
      this.closeRequest.emit();
    }
  }
}
