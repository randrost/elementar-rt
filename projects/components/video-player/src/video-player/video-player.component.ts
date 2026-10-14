import {
  Component, input, signal, computed, ChangeDetectionStrategy,
  booleanAttribute, viewChild, ElementRef, AfterViewInit, OnDestroy, effect,
  inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface VideoChapter {
  time: number;
  label: string;
}

@Component({
  selector: 'emr-video-player',
  standalone: true,
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  src = input('');
  poster = input('');
  autoplay = input(false, { transform: booleanAttribute });
  loop = input(false, { transform: booleanAttribute });
  chapters = input<VideoChapter[]>([]);

  protected _videoEl = viewChild<ElementRef<HTMLVideoElement>>('videoEl');
  private _containerEl = viewChild<ElementRef<HTMLElement>>('containerEl');

  protected _playing = signal(false);
  protected _muted = signal(false);
  protected _volume = signal(1);
  protected _currentTime = signal(0);
  protected _duration = signal(0);
  protected _buffered = signal(0);
  protected _speed = signal(1);
  protected _showSpeedMenu = signal(false);
  protected _fullscreen = signal(false);
  protected _error = signal(false);
  protected _loading = signal(false);

  protected _progress = computed(() =>
    this._duration() > 0 ? (this._currentTime() / this._duration()) * 100 : 0
  );

  protected _bufferedPct = computed(() =>
    this._duration() > 0 ? (this._buffered() / this._duration()) * 100 : 0
  );

  protected _currentChapter = computed(() => {
    const t = this._currentTime();
    const chapters = [...this.chapters()].sort((a, b) => b.time - a.time);
    return chapters.find(c => t >= c.time)?.label ?? '';
  });

  protected readonly _speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  private _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private _onFullscreenChange = () =>
    this._fullscreen.set(document.fullscreenElement === this._containerEl()?.nativeElement);

  constructor() {
    // A new source starts from a clean state.
    effect(() => {
      this.src();
      this._error.set(false);
      this._playing.set(false);
      this._currentTime.set(0);
      this._duration.set(0);
      this._buffered.set(0);
    });
  }

  ngAfterViewInit(): void {
    if (!this._isBrowser) return;
    document.addEventListener('fullscreenchange', this._onFullscreenChange);
    const v = this._videoEl()?.nativeElement;
    if (v && this.autoplay()) { v.play().catch(() => {}); }
  }

  ngOnDestroy(): void {
    if (!this._isBrowser) return;
    document.removeEventListener('fullscreenchange', this._onFullscreenChange);
  }

  protected _togglePlay(): void {
    const v = this._video();
    if (!v || this._error()) return;
    if (this._playing()) {
      v.pause();
    } else {
      this._loading.set(v.readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
      v.play().catch(() => this._loading.set(false));
    }
  }

  protected _toggleMute(): void {
    const v = this._video();
    if (!v) return;
    v.muted = !v.muted;
    this._muted.set(v.muted);
  }

  protected _onVolumeChange(e: Event): void {
    const v = this._video();
    if (!v) return;
    const vol = parseFloat((e.target as HTMLInputElement).value);
    v.volume = vol;
    v.muted = vol === 0;
    this._volume.set(vol);
    this._muted.set(v.muted);
  }

  protected _onSeek(e: Event): void {
    const v = this._video();
    if (!v) return;
    const pct = parseFloat((e.target as HTMLInputElement).value);
    v.currentTime = (pct / 100) * this._duration();
  }

  protected _setSpeed(s: number): void {
    const v = this._video();
    if (!v) return;
    v.playbackRate = s;
    this._speed.set(s);
    this._showSpeedMenu.set(false);
  }

  protected _togglePiP(): void {
    const v = this._video();
    if (!v) return;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {});
    } else {
      v.requestPictureInPicture().catch(() => {});
    }
  }

  protected _toggleFullscreen(): void {
    const el = this._containerEl()?.nativeElement;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  }

  protected _onTimeUpdate(): void {
    const v = this._video();
    if (!v) return;
    this._currentTime.set(v.currentTime);
    if (v.buffered.length > 0) this._buffered.set(v.buffered.end(v.buffered.length - 1));
  }

  protected _onPlay(): void { this._playing.set(true); }
  protected _onPlaying(): void { this._loading.set(false); }
  protected _onWaiting(): void { this._loading.set(true); }
  protected _onError(): void {
    if (!this.src()) return;
    this._error.set(true);
    this._loading.set(false);
    this._playing.set(false);
  }
  protected _onPause(): void { this._playing.set(false); }
  protected _onLoadedMetadata(): void {
    const v = this._video();
    if (v && isFinite(v.duration)) this._duration.set(v.duration);
  }

  protected _formatTime(s: number): string {
    if (!s || isNaN(s)) return '0:00';
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  protected _chapterOffset(chapter: VideoChapter): number {
    return this._duration() > 0 ? (chapter.time / this._duration()) * 100 : 0;
  }

  private _video(): HTMLVideoElement | null {
    return this._videoEl()?.nativeElement ?? null;
  }
}
