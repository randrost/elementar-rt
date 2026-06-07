import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicSkeletonExampleComponent } from '../_examples/basic-skeleton-example/basic-skeleton-example.component';
import { SkeletonCardExampleComponent } from '../_examples/skeleton-card-example/skeleton-card-example.component';
import { SkeletonListExampleComponent } from '../_examples/skeleton-list-example/skeleton-list-example.component';
import { MatDivider } from '@angular/material/divider';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  imports: [
    PlaygroundComponent,
    BasicSkeletonExampleComponent,
    SkeletonCardExampleComponent,
    SkeletonListExampleComponent,
    MatDivider,
    PageComponent,
    PageContentDirective,
    PageTitleDirective
  ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
