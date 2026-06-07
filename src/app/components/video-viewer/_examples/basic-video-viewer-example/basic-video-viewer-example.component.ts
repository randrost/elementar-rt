import { Component } from '@angular/core';
import { VideoViewerComponent } from '@elementar-rt/components/video-viewer';

@Component({
  selector: 'app-basic-video-viewer-example',
  imports: [VideoViewerComponent],
  templateUrl: './basic-video-viewer-example.component.html',
  styleUrl: './basic-video-viewer-example.component.scss'
})
export class BasicVideoViewerExampleComponent {}
