import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBlockComponent } from './skeleton-block.component';

describe('SkeletonBlockComponent', () => {
  let fixture: ComponentFixture<SkeletonBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SkeletonBlockComponent] }).compileComponents();
    fixture = TestBed.createComponent(SkeletonBlockComponent);
    fixture.detectChanges();
  });

  it('should apply its host classes', () => {
    expect(fixture.nativeElement.classList.contains('emr-skeleton-item')).toBe(true);
    expect(fixture.nativeElement.classList.contains('emr-skeleton-block')).toBe(true);
  });
});
