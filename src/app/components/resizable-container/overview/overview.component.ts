import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicResizableContainerExampleComponent
} from '../_examples/basic-resizable-container-example/basic-resizable-container-example.component';
import {
  ResizableContainerLayoutExampleComponent
} from '../_examples/resizable-container-layout-example/resizable-container-layout-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  imports: [
    PlaygroundComponent,
    BasicResizableContainerExampleComponent,
    ResizableContainerLayoutExampleComponent,
    PageComponent,
    PageContentDirective,
    PageTitleDirective
  ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
