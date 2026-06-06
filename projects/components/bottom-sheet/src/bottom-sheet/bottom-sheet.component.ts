import {
  booleanAttribute,
  Component,
  input,
  output,
  TemplateRef,
  Type
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

export type BottomSheetSize = 'auto' | 'half' | 'full';

@Component({
  selector: 'emr-bottom-sheet',
  exportAs: 'emrBottomSheet',
  imports: [NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
  host: {
    'class': 'emr-bottom-sheet-overlay',
    '[class.is-open]': 'open()',
    '[attr.data-size]': 'size()',
    '(click)': '_onBackdropClick($event)',
  }
})
export class BottomSheetComponent {
  open = input(false, { transform: booleanAttribute });
  size = input<BottomSheetSize>('auto');
  disableClose = input(false, { transform: booleanAttribute });
  contentComponent = input<Type<any> | null>(null);
  contentTemplate = input<TemplateRef<any> | null>(null);

  readonly closeRequest = output<void>();

  protected _onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && !this.disableClose()) {
      this.closeRequest.emit();
    }
  }
}
