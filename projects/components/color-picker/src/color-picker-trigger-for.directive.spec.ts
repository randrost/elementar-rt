import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { ColorPickerTriggerForDirective } from './color-picker-trigger-for.directive';

@Component({
  imports: [ColorPickerTriggerForDirective],
  template: `
    <button [emrColorPickerTriggerFor]="tpl" (opened)="onOpened()" (closed)="onClosed()">open</button>
    <ng-template #tpl>picker content</ng-template>
  `
})
class HostComponent {
  openedCount = 0;
  closedCount = 0;
  onOpened() { this.openedCount++; }
  onClosed() { this.closedCount++; }
}

describe('ColorPickerTriggerForDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let overlayContainerEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    overlayContainerEl = TestBed.inject(OverlayContainer).getContainerElement();
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.inject(OverlayContainer).ngOnDestroy();
  });

  it('should set type="button" on a native button trigger to avoid form submission', () => {
    expect(fixture.nativeElement.querySelector('button').getAttribute('type')).toBe('button');
  });

  it('should open the overlay with the projected template on click, and close on a second click', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    expect(overlayContainerEl.textContent).toContain('picker content');
    expect(fixture.componentInstance.openedCount).toBe(1);

    button.click();
    expect(overlayContainerEl.textContent).not.toContain('picker content');
    expect(fixture.componentInstance.closedCount).toBe(1);
  });
});
