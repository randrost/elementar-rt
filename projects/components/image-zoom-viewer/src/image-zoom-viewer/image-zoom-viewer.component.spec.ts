import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageZoomViewerComponent } from './image-zoom-viewer.component';

describe('ImageZoomViewerComponent', () => {
  let fixture: ComponentFixture<ImageZoomViewerComponent>;
  let component: ImageZoomViewerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ImageZoomViewerComponent] }).compileComponents();
    fixture = TestBed.createComponent(ImageZoomViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should zoom in on wheel-up up to maxZoom', () => {
    (component as any)._onWheel({ deltaY: -1, preventDefault: () => {} } as WheelEvent);
    expect((component as any)._scale()).toBeCloseTo(1.2, 5);
    expect((component as any)._isZoomed()).toBe(true);
  });

  it('should zoom out on wheel-down down to minZoom and reset translation', () => {
    (component as any)._onWheel({ deltaY: -1, preventDefault: () => {} } as WheelEvent);
    (component as any)._translateX.set(50);
    (component as any)._onWheel({ deltaY: 1, preventDefault: () => {} } as WheelEvent);
    expect((component as any)._scale()).toBe(1);
    expect((component as any)._translateX()).toBe(0);
  });

  it('should pan while zoomed and dragging', () => {
    (component as any)._zoomIn();
    (component as any)._onMouseDown({ clientX: 0, clientY: 0 } as MouseEvent);
    (component as any)._onMouseMove({ clientX: 10, clientY: 5 } as MouseEvent);
    expect((component as any)._translateX()).toBe(10);
    expect((component as any)._translateY()).toBe(5);
  });

  it('should not pan when not zoomed in', () => {
    (component as any)._onMouseDown({ clientX: 0, clientY: 0 } as MouseEvent);
    (component as any)._onMouseMove({ clientX: 10, clientY: 5 } as MouseEvent);
    expect((component as any)._translateX()).toBe(0);
  });

  it('should stop panning on mouse up', () => {
    (component as any)._zoomIn();
    (component as any)._onMouseDown({ clientX: 0, clientY: 0 } as MouseEvent);
    (component as any)._onMouseUp();
    (component as any)._onMouseMove({ clientX: 10, clientY: 5 } as MouseEvent);
    expect((component as any)._translateX()).toBe(0);
  });

  it('should reset scale and translation via _reset', () => {
    (component as any)._zoomIn();
    (component as any)._translateX.set(20);
    (component as any)._reset();
    expect((component as any)._scale()).toBe(1);
    expect((component as any)._translateX()).toBe(0);
  });

  it('should compute the scale label as a whole-number percentage', () => {
    (component as any)._zoomIn();
    expect((component as any)._scaleLabel()).toBe('150');
  });

  it('should clamp zoom-in at maxZoom', () => {
    fixture.componentRef.setInput('maxZoom', 2);
    fixture.detectChanges();
    for (let i = 0; i < 10; i++) (component as any)._zoomIn();
    expect((component as any)._scale()).toBe(2);
  });
});
