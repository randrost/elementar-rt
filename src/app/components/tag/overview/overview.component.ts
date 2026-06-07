import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicTagExampleComponent } from '../_examples/basic-tag-example/basic-tag-example.component';
import { TagColorsExampleComponent } from '../_examples/tag-colors-example/tag-colors-example.component';
import { TagVariantsExampleComponent } from '../_examples/tag-variants-example/tag-variants-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicTagExampleComponent,
    TagColorsExampleComponent,
    TagVariantsExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective, MatDivider
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
