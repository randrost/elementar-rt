import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicVideoViewerExampleComponent } from '../_examples/basic-video-viewer-example/basic-video-viewer-example.component';
import { VideoViewerVimeoExampleComponent } from '../_examples/video-viewer-vimeo-example/video-viewer-vimeo-example.component';
import { VideoViewerMp4ExampleComponent } from '../_examples/video-viewer-mp4-example/video-viewer-mp4-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicVideoViewerExampleComponent,
    VideoViewerVimeoExampleComponent,
    VideoViewerMp4ExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective, MatDivider
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
