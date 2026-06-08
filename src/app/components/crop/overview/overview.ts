import { Component, model, signal } from '@angular/core';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { Crop, CropSelection } from '@elementar-rt/components/crop';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { JsonPipe } from '@angular/common';
import { ImageCropCircleExample } from '../_examples/image-crop-circle-example/image-crop-circle-example';

@Component({
  imports: [
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    PlaygroundComponent,
    Crop,
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    JsonPipe,
    ImageCropCircleExample
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview {
  cropShape = model<'rectangle' | 'circle'>('rectangle');
  selection = signal<CropSelection | null>(null);

  onSelectionApplied(selection: CropSelection) {
    console.log(selection);
    this.selection.set(selection);
  }
}
