import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicImageZoomViewerExampleComponent } from '../_examples/basic-image-zoom-viewer-example/basic-image-zoom-viewer-example.component';
import { ImageZoomViewerNoMinimapExampleComponent } from '../_examples/image-zoom-viewer-no-minimap-example/image-zoom-viewer-no-minimap-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  imports: [
    PlaygroundComponent,
    BasicImageZoomViewerExampleComponent,
    ImageZoomViewerNoMinimapExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
