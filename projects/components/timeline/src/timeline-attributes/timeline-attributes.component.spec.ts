import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineAttributesComponent } from './timeline-attributes.component';

describe('TimelineAttributesComponent', () => {
  let fixture: ComponentFixture<TimelineAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimelineAttributesComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimelineAttributesComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-timeline-attributes')).toBe(true);
  });
});
