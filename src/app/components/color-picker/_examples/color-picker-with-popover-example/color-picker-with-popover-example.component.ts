import { Component } from '@angular/core';
import {
  ColorPickerComponent,
  ColorPickerThumbnailComponent,
  ColorPickerTriggerForDirective
} from '@elementar-rt/components/color-picker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-picker-with-popover-example',
  imports: [
    ColorPickerThumbnailComponent,
    ColorPickerComponent,
    ColorPickerTriggerForDirective,
    FormsModule
  ],
  templateUrl: './color-picker-with-popover-example.component.html',
  styleUrl: './color-picker-with-popover-example.component.scss'
})
export class ColorPickerWithPopoverExampleComponent {
  color = 'green';
}
