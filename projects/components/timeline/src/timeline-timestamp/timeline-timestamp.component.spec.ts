import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTimestampComponent } from './timeline-timestamp.component';

describe('TimelineTimestampComponent', () => {
  let fixture: ComponentFixture<TimelineTimestampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimelineTimestampComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimelineTimestampComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-timeline-timestamp')).toBe(true);
  });
});
