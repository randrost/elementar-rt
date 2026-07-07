import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineItemComponent } from './timeline-item.component';
import { TimelineItemIndicatorDirective } from '../timeline-item-indicator.directive';

@Component({
  imports: [TimelineItemComponent, TimelineItemIndicatorDirective],
  template: `
    <emr-timeline-item>
      <ng-template emrTimelineItemIndicator>custom</ng-template>
    </emr-timeline-item>
  `
})
class HostComponent {
  @ViewChild(TimelineItemComponent) item!: TimelineItemComponent;
}

describe('TimelineItemComponent', () => {
  it('should apply its host class when used standalone', async () => {
    await TestBed.configureTestingModule({ imports: [TimelineItemComponent] }).compileComponents();
    const fixture = TestBed.createComponent(TimelineItemComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('emr-timeline-item')).toBe(true);
    expect(fixture.nativeElement.querySelector('.indicator-shape')).not.toBeNull();
  });

  it('should expose a projected custom indicator template and render it instead of the default shape', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.item.indicatorTemplateRef).toBeInstanceOf(TemplateRef);
    expect(fixture.nativeElement.querySelector('.custom-indicator').textContent).toContain('custom');
    expect(fixture.nativeElement.querySelector('.indicator-shape')).toBeNull();
  });
});
