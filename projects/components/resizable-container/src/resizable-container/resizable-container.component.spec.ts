import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableContainerComponent } from './resizable-container.component';

function mouseEvent(type: string, clientX: number): MouseEvent {
  return new MouseEvent(type, { clientX, bubbles: true });
}

describe('ResizableContainerComponent', () => {
  let fixture: ComponentFixture<ResizableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ResizableContainerComponent] }).compileComponents();
    fixture = TestBed.createComponent(ResizableContainerComponent);
    fixture.componentRef.setInput('minWidth', 50);
    fixture.detectChanges();

    spyOn(fixture.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 300 } as DOMRect);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should widen or narrow the container as the handler is dragged', () => {
    const handler = fixture.nativeElement.querySelector('.handler');
    handler.dispatchEvent(mouseEvent('mousedown', 200));
    document.dispatchEvent(mouseEvent('mousemove', 150));

    // width = maxWidth(300) - (startX(200) - currentX(150)) = 300 - 50 = 250
    expect(fixture.nativeElement.style.width).toBe('250px');
  });

  it('should clamp the width at the original maxWidth when dragging far to the right', () => {
    const handler = fixture.nativeElement.querySelector('.handler');
    handler.dispatchEvent(mouseEvent('mousedown', 200));
    document.dispatchEvent(mouseEvent('mousemove', 500));

    expect(fixture.nativeElement.style.width).toBe('300px');
  });

  it('should clamp the width at minWidth when dragging far to the left', () => {
    const handler = fixture.nativeElement.querySelector('.handler');
    handler.dispatchEvent(mouseEvent('mousedown', 200));
    document.dispatchEvent(mouseEvent('mousemove', -500));

    expect(fixture.nativeElement.style.width).toBe('50px');
  });

  it('should stop resizing on mouseup', () => {
    const handler = fixture.nativeElement.querySelector('.handler');
    handler.dispatchEvent(mouseEvent('mousedown', 200));
    document.dispatchEvent(mouseEvent('mousemove', 150));
    document.dispatchEvent(new MouseEvent('mouseup'));

    document.dispatchEvent(mouseEvent('mousemove', 100));

    // Width should not change further since resizing stopped after mouseup.
    expect(fixture.nativeElement.style.width).toBe('250px');
  });
});
