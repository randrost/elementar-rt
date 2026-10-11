import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';
import { BasicLoadingIndicatorExampleComponent } from '../_examples/basic-loading-indicator-example/basic-loading-indicator-example.component';
import { LoadingIndicatorSizesExampleComponent } from '../_examples/loading-indicator-sizes-example/loading-indicator-sizes-example.component';
import { LoadingIndicatorInContextExampleComponent } from '../_examples/loading-indicator-in-context-example/loading-indicator-in-context-example.component';

@Component({
  imports: [
    PlaygroundComponent,
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    MatDivider,
    BasicLoadingIndicatorExampleComponent,
    LoadingIndicatorSizesExampleComponent,
    LoadingIndicatorInContextExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
