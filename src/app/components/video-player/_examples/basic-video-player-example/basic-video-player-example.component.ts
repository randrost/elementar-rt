import { Component } from '@angular/core';
import { VideoPlayerComponent } from '@elementar-rt/components/video-player';

@Component({
  selector: 'app-basic-video-player-example',
  imports: [VideoPlayerComponent],
  templateUrl: './basic-video-player-example.component.html',
  styleUrl: './basic-video-player-example.component.scss'
})
export class BasicVideoPlayerExampleComponent {
  chapters = [
    { label: 'Introduction', time: 0 },
    { label: 'Getting started', time: 30 },
    { label: 'Advanced usage', time: 90 },
  ];
}
