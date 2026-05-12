import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { UploadFileState } from '../types';
import { GaugeComponent, GaugeValueComponent } from '@elementar-rt/components/gauge';

@Component({
  selector: 'emr-grid-file',
  exportAs: 'emrGridFile',
  imports: [
    GaugeValueComponent,
    GaugeComponent
  ],
  templateUrl: './grid-file.component.html',
  styleUrl: './grid-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-grid-file',
    '[class.has-error]': "state() === 'error'"
  }
})
export class GridFileComponent {
  name = input.required();
  size = input();
  progress = input(0, {
    transform: numberAttribute
  });
  progressingMessage = input();
  errorMessage = input();
  remainingTime = input();
  state = input<UploadFileState>('uploading');
}
