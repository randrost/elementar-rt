import { Component } from '@angular/core';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicActionRequiredExampleComponent
} from '../_examples/basic-action-required-example/basic-action-required-example.component';
import {
  ActionRequiredCustomExampleComponent
} from '../_examples/action-required-custom-example/action-required-custom-example.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  imports: [
    PageComponent,
    PageContentDirective,
    PlaygroundComponent,
    BasicActionRequiredExampleComponent,
    ActionRequiredCustomExampleComponent,
    MatTab,
    MatTabGroup,
    PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
