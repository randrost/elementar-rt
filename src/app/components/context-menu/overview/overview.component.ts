import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';
import { BasicContextMenuExampleComponent } from '../_examples/basic-context-menu-example/basic-context-menu-example.component';
import { CompactContextMenuExampleComponent } from '../_examples/compact-context-menu-example/compact-context-menu-example.component';
import { ContextMenuDataExampleComponent } from '../_examples/context-menu-data-example/context-menu-data-example.component';

@Component({
  imports: [
    PlaygroundComponent,
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    MatDivider,
    BasicContextMenuExampleComponent,
    CompactContextMenuExampleComponent,
    ContextMenuDataExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
