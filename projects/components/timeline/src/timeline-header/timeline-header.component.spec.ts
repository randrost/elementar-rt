import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineHeaderComponent } from './timeline-header.component';

describe('TimelineHeaderComponent', () => {
  let fixture: ComponentFixture<TimelineHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimelineHeaderComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimelineHeaderComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-timeline-header')).toBe(true);
  });
});
