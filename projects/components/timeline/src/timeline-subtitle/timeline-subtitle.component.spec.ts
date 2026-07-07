import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSubtitleComponent } from './timeline-subtitle.component';

describe('TimelineSubtitleComponent', () => {
  let fixture: ComponentFixture<TimelineSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimelineSubtitleComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimelineSubtitleComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
