import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicFilterBuilderExampleComponent
} from '../_examples/basic-filter-builder-example/basic-filter-builder-example.component';
import {
  FilterBuilderCustomersExampleComponent
} from '../_examples/filter-builder-customers-example/filter-builder-customers-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
    selector: 'app-overview',
  imports: [
    PlaygroundComponent,
    BasicFilterBuilderExampleComponent,
    FilterBuilderCustomersExampleComponent,
    PageComponent,
    PageContentDirective,
    PageTitleDirective
  ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
