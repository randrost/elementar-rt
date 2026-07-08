import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSkeletonComponent } from './widget-skeleton.component';

describe('WidgetSkeletonComponent', () => {
  let fixture: ComponentFixture<WidgetSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [WidgetSkeletonComponent] }).compileComponents();
    fixture = TestBed.createComponent(WidgetSkeletonComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-widget-skeleton')).toBe(true);
  });
});
