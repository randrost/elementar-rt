import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewerComponent } from './video-viewer.component';

describe('VideoViewerComponent', () => {
  let fixture: ComponentFixture<VideoViewerComponent>;
  let component: VideoViewerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [VideoViewerComponent] }).compileComponents();
    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should detect a YouTube source and build a sanitized embed URL', () => {
    fixture.componentRef.setInput('src', 'https://www.youtube.com/watch?v=abc123');
    fixture.detectChanges();
    expect((component as any)._videoType()).toBe('youtube');
    expect((component as any)._embedUrl()).toBeTruthy();
  });

  it('should detect a Vimeo source', () => {
    fixture.componentRef.setInput('src', 'https://vimeo.com/76979871');
    fixture.detectChanges();
    expect((component as any)._videoType()).toBe('vimeo');
  });

  it('should treat any other source as a plain mp4 with no embed URL', () => {
    fixture.componentRef.setInput('src', 'https://example.com/video.mp4');
    fixture.detectChanges();
    expect((component as any)._videoType()).toBe('mp4');
    expect((component as any)._embedUrl()).toBeNull();
  });

  it('should open and emit closed when explicitly closed', () => {
    (component as any)._show();
    expect((component as any)._open()).toBe(true);
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push(undefined));
    (component as any)._close();
    expect((component as any)._open()).toBe(false);
    expect(emitted.length).toBe(1);
  });

  it('should ignore keyboard shortcuts while closed', () => {
    (component as any)._togglePlay = jasmine.createSpy('togglePlay');
    component.onKey({ code: 'Space', preventDefault: () => {} } as unknown as KeyboardEvent);
    expect((component as any)._togglePlay).not.toHaveBeenCalled();
  });

  it('should toggle play on Space while open', () => {
    (component as any)._show();
    component.onKey({ code: 'Space', preventDefault: () => {} } as unknown as KeyboardEvent);
    expect((component as any)._playing()).toBe(true);
  });

  it('should close on Escape while open', () => {
    (component as any)._show();
    component.onKey({ code: 'Escape', preventDefault: () => {} } as unknown as KeyboardEvent);
    expect((component as any)._open()).toBe(false);
  });

  it('should format seconds as m:ss', () => {
    expect((component as any)._formatTime(75)).toBe('1:15');
  });

  it('should compute progress from currentTime/duration via onTimeUpdate', () => {
    (component as any)._onTimeUpdate({ target: { currentTime: 30, duration: 60 } } as unknown as Event);
    expect((component as any)._progress()).toBe(50);
  });
});
