import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitPaneComponent } from './split-pane.component';

function mouseEvent(type: string, coord: number, orientation: 'horizontal' | 'vertical' = 'horizontal'): MouseEvent {
  return orientation === 'horizontal'
    ? new MouseEvent(type, { clientX: coord, bubbles: true })
    : new MouseEvent(type, { clientY: coord, bubbles: true });
}

describe('SplitPaneComponent', () => {
  let fixture: ComponentFixture<SplitPaneComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [SplitPaneComponent] }).compileComponents();
    fixture = TestBed.createComponent(SplitPaneComponent);
  });

  afterEach(() => {
    fixture.destroy();
    localStorage.clear();
  });

  it('should clamp the initial size between minSize and maxSize', () => {
    fixture.componentRef.setInput('initialSize', 5);
    fixture.componentRef.setInput('minSize', 10);
    fixture.detectChanges();

    expect((fixture.componentInstance as any)._firstSize()).toBe(10);
  });

  it('should resize the first pane as the divider is dragged horizontally', () => {
    fixture.detectChanges();
    spyOn(fixture.nativeElement, 'getBoundingClientRect').and.returnValue({ left: 0, top: 0, width: 200, height: 100 } as DOMRect);

    const emitted: number[] = [];
    fixture.componentInstance.sizeChange.subscribe(v => emitted.push(v));

    const divider = fixture.nativeElement.querySelector('.split-divider');
    divider.dispatchEvent(mouseEvent('mousedown', 0));
    document.dispatchEvent(mouseEvent('mousemove', 100));

    expect((fixture.componentInstance as any)._firstSize()).toBe(50);
    expect(emitted).toEqual([50]);
  });

  it('should clamp drag position within minSize/maxSize', () => {
    fixture.componentRef.setInput('minSize', 20);
    fixture.componentRef.setInput('maxSize', 80);
    fixture.detectChanges();
    spyOn(fixture.nativeElement, 'getBoundingClientRect').and.returnValue({ left: 0, top: 0, width: 200, height: 100 } as DOMRect);

    const divider = fixture.nativeElement.querySelector('.split-divider');
    divider.dispatchEvent(mouseEvent('mousedown', 0));
    document.dispatchEvent(mouseEvent('mousemove', 195));

    expect((fixture.componentInstance as any)._firstSize()).toBe(80);
  });

  it('should stop responding to drag after mouseup', () => {
    fixture.detectChanges();
    spyOn(fixture.nativeElement, 'getBoundingClientRect').and.returnValue({ left: 0, top: 0, width: 200, height: 100 } as DOMRect);

    const divider = fixture.nativeElement.querySelector('.split-divider');
    divider.dispatchEvent(mouseEvent('mousedown', 0));
    document.dispatchEvent(mouseEvent('mousemove', 100));
    document.dispatchEvent(new MouseEvent('mouseup'));
    document.dispatchEvent(mouseEvent('mousemove', 10));

    expect((fixture.componentInstance as any)._firstSize()).toBe(50);
  });

  it('should persist the resized value to localStorage under the given key and restore it next time', () => {
    fixture.componentRef.setInput('storageKey', 'demo');
    fixture.detectChanges();
    spyOn(fixture.nativeElement, 'getBoundingClientRect').and.returnValue({ left: 0, top: 0, width: 200, height: 100 } as DOMRect);

    const divider = fixture.nativeElement.querySelector('.split-divider');
    divider.dispatchEvent(mouseEvent('mousedown', 0));
    document.dispatchEvent(mouseEvent('mousemove', 150));

    expect(localStorage.getItem('emr-split-demo')).toBe('75');

    const fixture2 = TestBed.createComponent(SplitPaneComponent);
    fixture2.componentRef.setInput('storageKey', 'demo');
    fixture2.detectChanges();

    expect((fixture2.componentInstance as any)._firstSize()).toBe(75);
    fixture2.destroy();
  });
});
