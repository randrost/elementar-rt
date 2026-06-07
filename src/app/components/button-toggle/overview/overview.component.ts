import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicButtonToggleExampleComponent } from '../_examples/basic-button-toggle-example/basic-button-toggle-example.component';
import { ButtonToggleVariantsExampleComponent } from '../_examples/button-toggle-variants-example/button-toggle-variants-example.component';
import { ButtonToggleMultiExampleComponent } from '../_examples/button-toggle-multi-example/button-toggle-multi-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicButtonToggleExampleComponent,
    ButtonToggleVariantsExampleComponent,
    ButtonToggleMultiExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective, MatDivider
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
