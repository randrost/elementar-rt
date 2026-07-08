import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineItemIndicatorDirective } from './timeline-item-indicator.directive';

@Component({
  imports: [TimelineItemIndicatorDirective],
  template: `<ng-template emrTimelineItemIndicator>custom</ng-template>`
})
class HostComponent {
  @ViewChild(TimelineItemIndicatorDirective) directive!: TimelineItemIndicatorDirective;
}

describe('TimelineItemIndicatorDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should expose the injected templateRef', () => {
    expect(fixture.componentInstance.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
