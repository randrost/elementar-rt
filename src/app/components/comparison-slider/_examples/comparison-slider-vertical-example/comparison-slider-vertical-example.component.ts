import { Component } from '@angular/core';
import {
  ComparisonSliderComponent,
  ComparisonSliderBeforeImageDirective,
  ComparisonSliderAfterImageDirective
} from '@elementar-rt/components/comparison-slider';

@Component({
  selector: 'app-comparison-slider-vertical-example',
  imports: [ComparisonSliderComponent, ComparisonSliderBeforeImageDirective, ComparisonSliderAfterImageDirective],
  templateUrl: './comparison-slider-vertical-example.component.html',
  styleUrl: './comparison-slider-vertical-example.component.scss'
})
export class ComparisonSliderVerticalExampleComponent {}
