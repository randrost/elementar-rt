import { Component, signal } from '@angular/core';
import { Crop, CropSelection } from '@elementar-rt/components/crop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-image-crop-circle-example',
  imports: [Crop, JsonPipe],
  templateUrl: './image-crop-circle-example.html',
  styleUrl: './image-crop-circle-example.scss'
})
export class ImageCropCircleExample {
  selection = signal<CropSelection | null>(null);

  onSelectionApplied(selection: CropSelection) {
    this.selection.set(selection);
  }
}
