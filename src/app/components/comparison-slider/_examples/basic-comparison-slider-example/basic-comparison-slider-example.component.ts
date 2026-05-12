import { Component } from '@angular/core';
import {
  ComparisonSliderAfterImageDirective,
  ComparisonSliderBeforeImageDirective,
  ComparisonSliderComponent
} from '@elementar-rt/components/comparison-slider';

@Component({
  selector: 'app-basic-comparison-slider-example',
  imports: [
    ComparisonSliderComponent,
    ComparisonSliderBeforeImageDirective,
    ComparisonSliderAfterImageDirective
  ],
  templateUrl: './basic-comparison-slider-example.component.html',
  styleUrl: './basic-comparison-slider-example.component.scss'
})
export class BasicComparisonSliderExampleComponent {

}
