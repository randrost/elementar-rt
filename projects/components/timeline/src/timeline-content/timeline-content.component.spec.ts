import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineContentComponent } from './timeline-content.component';

describe('TimelineContentComponent', () => {
  let fixture: ComponentFixture<TimelineContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimelineContentComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimelineContentComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
