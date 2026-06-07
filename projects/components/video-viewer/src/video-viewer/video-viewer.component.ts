import {
  Component, input, signal, computed, ChangeDetectionStrategy,
  booleanAttribute, output, HostListener
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';

type VideoType = 'mp4' | 'youtube' | 'vimeo';

@Component({
  selector: 'emr-video-viewer',
  standalone: true,
  templateUrl: './video-viewer.component.html',
  styleUrl: './video-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-open]': '_open() || null',
  }
})
export class VideoViewerComponent {
  src = input('');
  poster = input('');
  open = input(false, { transform: booleanAttribute });

  closed = output<void>();

  private _sanitizer = inject(DomSanitizer);

  protected _open = signal(false);
  protected _playing = signal(false);
  protected _muted = signal(false);
  protected _volume = signal(1);
  protected _currentTime = signal(0);
  protected _duration = signal(0);
  protected _progress = computed(() =>
    this._duration() > 0 ? (this._currentTime() / this._duration()) * 100 : 0
  );

  protected _videoType = computed<VideoType>(() => {
    const s = this.src();
    if (/youtube\.com|youtu\.be/.test(s)) return 'youtube';
    if (/vimeo\.com/.test(s)) return 'vimeo';
    return 'mp4';
  });

  protected _embedUrl = computed<SafeResourceUrl | null>(() => {
    const s = this.src();
    const type = this._videoType();
    if (type === 'youtube') {
      const id = s.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      if (id) return this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}?autoplay=1`);
    }
    if (type === 'vimeo') {
      const id = s.match(/vimeo\.com\/(\d+)/)?.[1];
      if (id) return this._sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${id}?autoplay=1`);
    }
    return null;
  });

  @HostListener('keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (!this._open()) return;
    if (e.code === 'Space') { e.preventDefault(); this._togglePlay(); }
    if (e.code === 'Escape') this._close();
    if (e.code === 'KeyF') this._fullscreen();
  }

  protected _show(): void { this._open.set(true); }
  protected _close(): void { this._open.set(false); this.closed.emit(); }

  protected _togglePlay(): void { this._playing.set(!this._playing()); }
  protected _toggleMute(): void { this._muted.set(!this._muted()); }

  protected _onTimeUpdate(e: Event): void {
    const v = e.target as HTMLVideoElement;
    this._currentTime.set(v.currentTime);
    this._duration.set(v.duration);
  }

  protected _onSeek(e: Event): void {
    const v = (e.target as HTMLInputElement);
    const video = document.querySelector('.vv-video') as HTMLVideoElement;
    if (video) video.currentTime = (parseFloat(v.value) / 100) * this._duration();
  }

  protected _fullscreen(): void {
    const el = document.querySelector('.vv-player') as HTMLElement;
    if (el?.requestFullscreen) el.requestFullscreen();
  }

  protected _formatTime(s: number): string {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }
}
