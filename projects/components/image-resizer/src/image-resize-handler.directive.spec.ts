import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizeHandlerDirective } from './image-resize-handler.directive';

@Component({
  standalone: true,
  imports: [ImageResizeHandlerDirective],
  // Bind directly to the #target template reference variable (resolved
  // synchronously as part of this view) rather than a ViewChild + getter,
  // which would differ between the first and second CD passes and trip
  // ExpressionChangedAfterItHasBeenChecked in dev mode.
  template: `
    <div #target style="width:200px;"></div>
    <div emrImageResizeHandler
         [maxWidth]="300"
         [minWidth]="100"
         [targetElement]="target"
         [direction]="direction"
         (dimensionsChanged)="changedCount = changedCount + 1"></div>
  `,
})
class HostComponent {
  direction: 'left' | 'right' = 'right';
  changedCount = 0;
  @ViewChild(ImageResizeHandlerDirective) directive!: ImageResizeHandlerDirective;
}

describe('ImageResizeHandlerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let handle: HTMLElement;
  let target: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    handle = fixture.nativeElement.querySelector('[emrImageResizeHandler]');
    target = fixture.nativeElement.querySelector('div');
    spyOn(target, 'getBoundingClientRect').and.returnValue({ width: 200 } as DOMRect);
  });

  afterEach(() => {
    // The directive listens on `document` for mousemove/mouseup; without an
    // explicit destroy, those subscriptions (and their closures over this
    // test's target element) would otherwise outlive the test.
    fixture.destroy();
  });

  it('should narrow the target when dragging right with direction="right"', () => {
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 }));
    expect(target.style.width).toBe('150px');
    expect(fixture.componentInstance.changedCount).toBe(1);
  });

  it('should widen the target when dragging left with direction="right"', () => {
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 50 }));
    expect(target.style.width).toBe('250px');
  });

  it('should invert the drag direction when direction="left"', () => {
    fixture.componentInstance.direction = 'left';
    fixture.detectChanges();
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 }));
    expect(target.style.width).toBe('250px');
  });

  it('should clamp the resulting width to maxWidth', () => {
    fixture.componentInstance.direction = 'left';
    fixture.detectChanges();
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 500 }));
    expect(target.style.width).toBe('300px');
  });

  it('should clamp the resulting width to minWidth', () => {
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 500 }));
    expect(target.style.width).toBe('100px');
  });

  it('should stop resizing on mouseup', () => {
    // The target starts with a static inline width:200px from the template,
    // so "resizing stopped" means it stays at 200px, not that it clears out.
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 }));
    expect(target.style.width).toBe('200px');
  });
});
