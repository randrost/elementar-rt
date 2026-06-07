import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicSortExampleComponent } from '../_examples/basic-sort-example/basic-sort-example.component';
import { SortProductsExampleComponent } from '../_examples/sort-products-example/sort-products-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  imports: [
    PlaygroundComponent,
    BasicSortExampleComponent,
    SortProductsExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
