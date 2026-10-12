import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';
import { BasicSearchExampleComponent } from '../_examples/basic-search-example/basic-search-example.component';
import { FullscreenSearchExampleComponent } from '../_examples/fullscreen-search-example/fullscreen-search-example.component';
import { SearchSubmitExampleComponent } from '../_examples/search-submit-example/search-submit-example.component';

@Component({
  imports: [
    PlaygroundComponent,
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    MatDivider,
    BasicSearchExampleComponent,
    FullscreenSearchExampleComponent,
    SearchSubmitExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
