import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTitleComponent } from './timeline-title.component';

describe('TimelineTitleComponent', () => {
  let fixture: ComponentFixture<TimelineTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimelineTitleComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimelineTitleComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-timeline-title')).toBe(true);
  });
});
