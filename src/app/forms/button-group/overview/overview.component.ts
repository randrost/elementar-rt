import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';
import { BasicButtonGroupExampleComponent } from '../_examples/basic-button-group-example/basic-button-group-example.component';
import { ButtonGroupActionsExampleComponent } from '../_examples/button-group-actions-example/button-group-actions-example.component';
import { ConnectedButtonGroupExampleComponent } from '../_examples/connected-button-group-example/connected-button-group-example.component';
import { ConnectedButtonGroupLabelsExampleComponent } from '../_examples/connected-button-group-labels-example/connected-button-group-labels-example.component';

@Component({
  imports: [
    PlaygroundComponent,
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    MatDivider,
    BasicButtonGroupExampleComponent,
    ButtonGroupActionsExampleComponent,
    ConnectedButtonGroupExampleComponent,
    ConnectedButtonGroupLabelsExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
