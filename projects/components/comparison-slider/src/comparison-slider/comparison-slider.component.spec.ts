import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonSliderComponent } from './comparison-slider.component';

describe('ComparisonSliderComponent', () => {
  let fixture: ComponentFixture<ComparisonSliderComponent>;
  let component: ComparisonSliderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ComparisonSliderComponent] }).compileComponents();
    fixture = TestBed.createComponent(ComparisonSliderComponent);
    document.body.appendChild(fixture.nativeElement);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('initialPosition', 30);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should clamp and apply the initial position', () => {
    expect(component.sliderPosition()).toBe(30);
    expect(component.handleLeftStyle()).toBe('30%');
  });

  it('should clamp an out-of-range initial position to [0, 100]', () => {
    fixture.componentRef.setInput('initialPosition', 150);
    fixture.detectChanges();
    expect(component.sliderPosition()).toBe(100);
  });

  it('should compute the after-image clip style from the slider position', () => {
    expect(component.afterImageClipStyle()).toBe('inset(0 70% 0 0)');
  });

  it('should update the slider position on mouse drag within the container', () => {
    spyOn((component as any).sliderContainerRef().nativeElement, 'getBoundingClientRect')
      .and.returnValue({ left: 0, width: 200 } as DOMRect);
    component.onMouseDown({ clientX: 0 } as MouseEvent);
    expect(component.isDragging()).toBe(true);
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    expect(component.sliderPosition()).toBe(50);
  });

  it('should stop dragging on mouseup', () => {
    spyOn((component as any).sliderContainerRef().nativeElement, 'getBoundingClientRect')
      .and.returnValue({ left: 0, width: 200 } as DOMRect);
    component.onMouseDown({ clientX: 0 } as MouseEvent);
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(component.isDragging()).toBe(false);
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 }));
    expect(component.sliderPosition()).toBe(30);
  });

  it('should prevent default on drag start (disabling native image drag)', () => {
    const event = new MouseEvent('dragstart', { cancelable: true });
    component.onDragStart(event);
    expect(event.defaultPrevented).toBe(true);
  });
});
