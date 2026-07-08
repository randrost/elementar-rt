import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crop, CropSelection } from './crop';

@Component({
  standalone: true,
  imports: [Crop],
  template: `<emr-crop style="display:block;width:200px;height:200px;" [minWidth]="20" [minHeight]="20" (selectionApplied)="last = $event"></emr-crop>`,
})
class HostComponent {
  last: CropSelection | null = null;
  @ViewChild(Crop) crop!: Crop;
}

describe('Crop', () => {
  let fixture: ComponentFixture<HostComponent>;
  let crop: Crop;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    crop = fixture.componentInstance.crop;
  });

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should start with a centered inset selection', () => {
    const sel = crop.selection();
    expect(sel.top).toBe(20);
    expect(sel.left).toBe(20);
  });

  it('should resize the selection when dragging the bottom-right handle', () => {
    crop.onDragStart({ clientX: 0, clientY: 0, preventDefault() {}, stopPropagation() {} } as MouseEvent, 'bottom-right');
    crop.onDrag({ clientX: 20, clientY: 10 } as MouseEvent);
    const sel = crop.selection();
    expect(sel.right).toBeLessThan(20);
    expect(sel.bottom).toBeLessThan(20);
  });

  it('should move the whole selection when dragging the "move" handle', () => {
    const before = crop.selection();
    crop.onDragStart({ clientX: 0, clientY: 0, preventDefault() {}, stopPropagation() {} } as MouseEvent, 'move');
    crop.onDrag({ clientX: 10, clientY: 10 } as MouseEvent);
    const after = crop.selection();
    expect(after.left).toBeGreaterThan(before.left);
    expect(after.top).toBeGreaterThan(before.top);
  });

  it('should emit selectionApplied with pixel and percentage data on drag end', () => {
    crop.onDragStart({ clientX: 0, clientY: 0, preventDefault() {}, stopPropagation() {} } as MouseEvent, 'bottom-right');
    crop.onDrag({ clientX: 20, clientY: 10 } as MouseEvent);
    crop.onDragEnd();
    expect(fixture.componentInstance.last).toBeTruthy();
    expect(fixture.componentInstance.last?.containerWidth).toBe(200);
    expect(fixture.componentInstance.last?.shape).toBe('rectangle');
  });

  it('should do nothing on drag end when no handle is active', () => {
    fixture.componentInstance.last = null;
    crop.onDragEnd();
    expect(fixture.componentInstance.last).toBeNull();
  });

  it('should not let the selection shrink below the configured minimum size', () => {
    crop.onDragStart({ clientX: 0, clientY: 0, preventDefault() {}, stopPropagation() {} } as MouseEvent, 'bottom-right');
    crop.onDrag({ clientX: -1000, clientY: -1000 } as MouseEvent);
    const sel = crop.selection();
    const width = 200 - sel.left - sel.right;
    const height = 200 - sel.top - sel.bottom;
    expect(width).toBeGreaterThanOrEqual(20 - 0.001);
    expect(height).toBeGreaterThanOrEqual(20 - 0.001);
  });
});
