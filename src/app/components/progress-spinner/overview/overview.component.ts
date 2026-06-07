import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicProgressSpinnerExampleComponent } from '../_examples/basic-progress-spinner-example/basic-progress-spinner-example.component';
import { ConfigurableSpinnerExampleComponent } from '../_examples/configurable-spinner-example/configurable-spinner-example.component';
import { ProgressSpinnerSizesExampleComponent } from '../_examples/progress-spinner-sizes-example/progress-spinner-sizes-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicProgressSpinnerExampleComponent,
    ConfigurableSpinnerExampleComponent,
    ProgressSpinnerSizesExampleComponent,
    MatDivider,
    PageComponent,
    PageContentDirective,
    PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}