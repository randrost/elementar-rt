import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLineComponent } from './skeleton-line.component';

describe('SkeletonLineComponent', () => {
  let fixture: ComponentFixture<SkeletonLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SkeletonLineComponent] }).compileComponents();
    fixture = TestBed.createComponent(SkeletonLineComponent);
    fixture.detectChanges();
  });

  it('should apply its host classes', () => {
    expect(fixture.nativeElement.classList.contains('emr-skeleton-item')).toBe(true);
    expect(fixture.nativeElement.classList.contains('emr-skeleton-line')).toBe(true);
  });
});
