import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicToolbarExampleComponent } from '../_examples/basic-toolbar-example/basic-toolbar-example.component';
import { ToolbarWithActionsExampleComponent } from '../_examples/toolbar-with-actions-example/toolbar-with-actions-example.component';
import { ToolbarOverflowExampleComponent } from '../_examples/toolbar-overflow-example/toolbar-overflow-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicToolbarExampleComponent,
    ToolbarWithActionsExampleComponent,
    ToolbarOverflowExampleComponent,
    MatDivider,
    PageComponent,
    PageContentDirective,
    PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}