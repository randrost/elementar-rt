import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineDescriptionComponent } from './timeline-description.component';

describe('TimelineDescriptionComponent', () => {
  let fixture: ComponentFixture<TimelineDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimelineDescriptionComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimelineDescriptionComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-timeline-description')).toBe(true);
  });
});
