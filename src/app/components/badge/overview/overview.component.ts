import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicBadgesExampleComponent } from '../_examples/basic-badges-example/basic-badges-example.component';
import { BadgePositionsExampleComponent } from '../_examples/badge-positions-example/badge-positions-example.component';
import { BadgeVariantsExampleComponent } from '../_examples/badge-variants-example/badge-variants-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicBadgesExampleComponent,
    BadgePositionsExampleComponent,
    BadgeVariantsExampleComponent,
    MatDivider,
    PageComponent,
    PageContentDirective,
    PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}