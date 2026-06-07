import { Component } from '@angular/core';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicScreenLoaderExampleComponent
} from '../_examples/basic-screen-loader-example/basic-screen-loader-example.component';
import {
  ScreenLoaderTriggeredExampleComponent
} from '../_examples/screen-loader-triggered-example/screen-loader-triggered-example.component';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  imports: [
    PageComponent,
    PageContentDirective,
    PlaygroundComponent,
    BasicScreenLoaderExampleComponent,
    ScreenLoaderTriggeredExampleComponent,
    PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
