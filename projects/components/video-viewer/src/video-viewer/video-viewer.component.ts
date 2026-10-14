import {
  Component, input, signal, computed, ChangeDetectionStrategy,
  booleanAttribute, output, HostListener, effect, viewChild, ElementRef, untracked
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

  /** Accessible label of the thumbnail that opens the viewer. */
  label = input('Play video');

  /** Opens the viewer programmatically. */
  open = input(false, { transform: booleanAttribute });

  closed = output<void>();

  private _sanitizer = inject(DomSanitizer);
  private _videoEl = viewChild<ElementRef<HTMLVideoElement>>('videoEl');
  private _playerEl = viewChild<ElementRef<HTMLElement>>('playerEl');
  private _closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private _triggerEl = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');

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

  private _videoId = computed(() => {
    const s = this.src();
    switch (this._videoType()) {
      case 'youtube': return s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([^&?/]+)/)?.[1] ?? null;
      case 'vimeo': return s.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? null;
      default: return null;
    }
  });

  protected _embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this._videoId();
    if (!id) return null;
    if (this._videoType() === 'youtube') {
      return this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}?autoplay=1`);
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${id}?autoplay=1`);
  });

  /** Poster shown on the thumbnail: the `poster` input, or YouTube's own thumbnail. */
  protected _thumbnail = computed(() => {
    if (this.poster()) return this.poster();
    const id = this._videoId();
    return this._videoType() === 'youtube' && id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
  });

  constructor() {
    effect(() => {
      const open = this.open();
      untracked(() => (open ? this._show() : this._open() && this._close()));
    });

    // Move focus into the dialog when it opens.
    effect(() => {
      this._closeBtn()?.nativeElement.focus();
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (!this._open()) return;
    if (e.code === 'Escape') { this._close(); return; }
    if (this._videoType() !== 'mp4') return;
    if (e.code === 'Space') { e.preventDefault(); this._togglePlay(); }
    if (e.code === 'KeyF') this._fullscreen();
  }

  protected _show(): void {
    this._open.set(true);
  }

  protected _close(): void {
    this._videoEl()?.nativeElement.pause();
    this._open.set(false);
    this._playing.set(false);
    this._currentTime.set(0);
    this.closed.emit();
    this._triggerEl()?.nativeElement.focus();
  }

  protected _togglePlay(): void {
    const v = this._videoEl()?.nativeElement;
    if (!v) {
      this._playing.set(!this._playing());
      return;
    }
    if (v.paused) { v.play().catch(() => {}); } else { v.pause(); }
  }

  protected _toggleMute(): void {
    const v = this._videoEl()?.nativeElement;
    const muted = !this._muted();
    if (v) v.muted = muted;
    this._muted.set(muted);
  }

  protected _onTimeUpdate(e: Event): void {
    const v = e.target as HTMLVideoElement;
    this._currentTime.set(v.currentTime);
    if (isFinite(v.duration)) this._duration.set(v.duration);
  }

  protected _onSeek(e: Event): void {
    const v = this._videoEl()?.nativeElement;
    const pct = parseFloat((e.target as HTMLInputElement).value);
    if (v && this._duration() > 0) v.currentTime = (pct / 100) * this._duration();
  }

  protected _fullscreen(): void {
    const el = this._playerEl()?.nativeElement;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  }

  protected _formatTime(s: number): string {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }
}
