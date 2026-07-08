import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';

import { PopoverTriggerForDirective } from './popover-trigger-for.directive';

@Component({
  standalone: true,
  imports: [OverlayModule, PopoverTriggerForDirective],
  template: `
    <button [emrPopoverTriggerFor]="tpl" [trigger]="trigger" [delay]="delay">Open</button>
    <ng-template #tpl>Popover content</ng-template>
  `,
})
class HostComponent {
  trigger: 'click' | 'hover' = 'click';
  delay = 500;
  @ViewChild(PopoverTriggerForDirective) directive!: PopoverTriggerForDirective;
}

describe('PopoverTriggerForDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let button: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  afterEach(() => {
    fixture.componentInstance.directive.api.close();
  });

  it('should open the overlay on click and emit opened', () => {
    const emitted: void[] = [];
    fixture.componentInstance.directive.opened.subscribe(() => emitted.push(undefined));
    button.click();
    expect(fixture.componentInstance.directive.api.isOpen()).toBe(true);
    expect(emitted.length).toBe(1);
    expect(document.querySelector('.cdk-overlay-container')?.textContent).toContain('Popover content');
  });

  it('should close the overlay on a second click and emit closed', () => {
    button.click();
    const emitted: void[] = [];
    fixture.componentInstance.directive.closed.subscribe(() => emitted.push(undefined));
    button.click();
    expect(fixture.componentInstance.directive.api.isOpen()).toBe(false);
    expect(emitted.length).toBe(1);
  });

  it('should open after a delay on hover when trigger is "hover"', fakeAsync(() => {
    fixture.componentInstance.trigger = 'hover';
    fixture.componentInstance.delay = 300;
    fixture.detectChanges();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    expect(fixture.componentInstance.directive.api.isOpen()).toBe(false);
    tick(300);
    expect(fixture.componentInstance.directive.api.isOpen()).toBe(true);
  }));

  it('should cancel a pending hover-open if the pointer leaves before the delay elapses', fakeAsync(() => {
    fixture.componentInstance.trigger = 'hover';
    fixture.componentInstance.delay = 300;
    fixture.detectChanges();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    button.dispatchEvent(new MouseEvent('mouseleave'));
    tick(300);
    expect(fixture.componentInstance.directive.api.isOpen()).toBe(false);
  }));

  it('should not react to clicks when the trigger is "hover"', () => {
    fixture.componentInstance.trigger = 'hover';
    fixture.detectChanges();
    button.click();
    expect(fixture.componentInstance.directive.api.isOpen()).toBe(false);
  });
});
