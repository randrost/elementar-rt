import { Component } from '@angular/core';
import { MchartLineComponent } from '@elementar-rt/components/micro-chart';
import { ShuffleArrayPipe } from '@meta/shuffle-array.pipe';

@Component({
  selector: 'app-mchart-line-custom-curve-example',
  imports: [
    MchartLineComponent,
    ShuffleArrayPipe
  ],
  templateUrl: './mchart-line-custom-curve-example.component.html',
  styleUrl: './mchart-line-custom-curve-example.component.scss'
})
export class MchartLineCustomCurveExampleComponent {

}
