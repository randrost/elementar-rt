import { Component } from '@angular/core';
import { VideoPlayerComponent } from '@elementar-rt/components/video-player';

@Component({
  selector: 'app-video-player-simple-example',
  imports: [VideoPlayerComponent],
  templateUrl: './video-player-simple-example.component.html',
  styleUrl: './video-player-simple-example.component.scss'
})
export class VideoPlayerSimpleExampleComponent {}
