import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicRatingExampleComponent } from '../_examples/basic-rating-example/basic-rating-example.component';
import { RatingSizesExampleComponent } from '../_examples/rating-sizes-example/rating-sizes-example.component';
import { RatingReadonlyExampleComponent } from '../_examples/rating-readonly-example/rating-readonly-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicRatingExampleComponent,
    RatingSizesExampleComponent,
    RatingReadonlyExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective, MatDivider
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
