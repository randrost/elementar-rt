import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicFilterSelectExampleComponent } from '../_examples/basic-filter-select-example/basic-filter-select-example.component';
import { FilterSelectTableExampleComponent } from '../_examples/filter-select-table-example/filter-select-table-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  imports: [
    PlaygroundComponent,
    BasicFilterSelectExampleComponent,
    FilterSelectTableExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
