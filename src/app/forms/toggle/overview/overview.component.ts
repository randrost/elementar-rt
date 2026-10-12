import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';
import { BasicToggleExampleComponent } from '../_examples/basic-toggle-example/basic-toggle-example.component';
import { ToggleSizesExampleComponent } from '../_examples/toggle-sizes-example/toggle-sizes-example.component';
import { ToggleBindingExampleComponent } from '../_examples/toggle-binding-example/toggle-binding-example.component';

@Component({
  imports: [
    PlaygroundComponent,
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    MatDivider,
    BasicToggleExampleComponent,
    ToggleSizesExampleComponent,
    ToggleBindingExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
