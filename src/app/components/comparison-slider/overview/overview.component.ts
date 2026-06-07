import { Component } from '@angular/core';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicComparisonSliderExampleComponent
} from '../_examples/basic-comparison-slider-example/basic-comparison-slider-example.component';
import {
  ComparisonSliderVerticalExampleComponent
} from '../_examples/comparison-slider-vertical-example/comparison-slider-vertical-example.component';

@Component({
  selector: 'app-overview',
  imports: [
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    PlaygroundComponent,
    BasicComparisonSliderExampleComponent,
    ComparisonSliderVerticalExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
