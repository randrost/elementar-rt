import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerComponent } from './video-player.component';

describe('VideoPlayerComponent', () => {
  let fixture: ComponentFixture<VideoPlayerComponent>;
  let component: VideoPlayerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [VideoPlayerComponent] }).compileComponents();
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('chapters', [
      { time: 0, label: 'Intro' },
      { time: 60, label: 'Chapter 2' },
    ]);
    fixture.detectChanges();
  });

  it('should format seconds as m:ss', () => {
    expect((component as any)._formatTime(65)).toBe('1:05');
  });

  it('should format seconds with hours as h:mm:ss', () => {
    expect((component as any)._formatTime(3665)).toBe('1:01:05');
  });

  it('should format an invalid duration as 0:00', () => {
    expect((component as any)._formatTime(NaN)).toBe('0:00');
  });

  it('should toggle play/pause based on the video element state', () => {
    const v = (component as any)._videoEl().nativeElement as HTMLVideoElement;
    spyOn(v, 'play').and.returnValue(Promise.resolve());
    spyOn(v, 'pause');
    (component as any)._togglePlay();
    expect(v.play).toHaveBeenCalled();
    (component as any)._onPlay();
    (component as any)._togglePlay();
    expect(v.pause).toHaveBeenCalled();
  });

  it('should compute progress as a percentage of duration', () => {
    (component as any)._duration.set(100);
    (component as any)._currentTime.set(25);
    expect((component as any)._progress()).toBe(25);
  });

  it('should report 0 progress when duration is unknown', () => {
    expect((component as any)._progress()).toBe(0);
  });

  it('should resolve the current chapter based on playback time', () => {
    (component as any)._currentTime.set(90);
    expect((component as any)._currentChapter()).toBe('Chapter 2');
    (component as any)._currentTime.set(10);
    expect((component as any)._currentChapter()).toBe('Intro');
  });

  it('should update volume and mute state on volume change', () => {
    const v = (component as any)._videoEl().nativeElement as HTMLVideoElement;
    (component as any)._onVolumeChange({ target: { value: '0' } } as unknown as Event);
    expect(v.muted).toBe(true);
    expect((component as any)._volume()).toBe(0);
  });

  it('should set the playback speed and close the speed menu', () => {
    (component as any)._showSpeedMenu.set(true);
    (component as any)._setSpeed(1.5);
    const v = (component as any)._videoEl().nativeElement as HTMLVideoElement;
    expect(v.playbackRate).toBe(1.5);
    expect((component as any)._speed()).toBe(1.5);
    expect((component as any)._showSpeedMenu()).toBe(false);
  });

  it('should update playing state from play/pause DOM events', () => {
    (component as any)._onPlay();
    expect((component as any)._playing()).toBe(true);
    (component as any)._onPause();
    expect((component as any)._playing()).toBe(false);
  });

  it('should show an error message when the source fails to load', () => {
    fixture.componentRef.setInput('src', 'https://example.invalid/missing.mp4');
    fixture.detectChanges();
    (component as any)._onError();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.vp-error')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.vp-big-play')).toBeNull();
  });

  it('should ignore load errors while no source is set', () => {
    (component as any)._onError();
    expect((component as any)._error()).toBeFalse();
  });

  it('should show a big play button while paused', () => {
    fixture.componentRef.setInput('src', 'https://example.com/video.mp4');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.vp-big-play')).not.toBeNull();
  });

  it('should request fullscreen on its own container', () => {
    const container = fixture.nativeElement.querySelector('.vp-container') as HTMLElement;
    const spy = spyOn(container, 'requestFullscreen').and.returnValue(Promise.resolve());
    (component as any)._toggleFullscreen();
    expect(spy).toHaveBeenCalled();
  });
});
