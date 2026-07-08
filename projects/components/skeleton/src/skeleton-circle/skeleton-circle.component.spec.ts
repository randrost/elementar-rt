import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCircleComponent } from './skeleton-circle.component';

describe('SkeletonCircleComponent', () => {
  let fixture: ComponentFixture<SkeletonCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SkeletonCircleComponent] }).compileComponents();
    fixture = TestBed.createComponent(SkeletonCircleComponent);
    fixture.detectChanges();
  });

  it('should apply its host classes', () => {
    expect(fixture.nativeElement.classList.contains('emr-skeleton-item')).toBe(true);
    expect(fixture.nativeElement.classList.contains('emr-skeleton-circle')).toBe(true);
  });
});
