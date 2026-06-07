import { Component, signal } from '@angular/core';
import {
  ImageResizedEvent,
  ImageResizerComponent,
  ImageResizerImageDirective
} from '@elementar-rt/components/image-resizer';

@Component({
  selector: 'app-image-resizer-constrained-example',
  imports: [
    ImageResizerComponent,
    ImageResizerImageDirective
  ],
  templateUrl: './image-resizer-constrained-example.component.html',
  styleUrl: './image-resizer-constrained-example.component.scss'
})
export class ImageResizerConstrainedExampleComponent {
  readonly maxWidth = 600;
  readonly minWidth = 200;

  currentWidth = signal(400);

  onImageResized(event: ImageResizedEvent): void {
    this.currentWidth.set(Math.round(event.width));
  }
}
