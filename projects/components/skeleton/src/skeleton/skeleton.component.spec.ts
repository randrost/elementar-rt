import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SkeletonComponent] }).compileComponents();
    fixture = TestBed.createComponent(SkeletonComponent);
    fixture.detectChanges();
  });

  it('should default to the row direction', () => {
    expect(fixture.nativeElement.classList.contains('is-direction-row')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-direction-col')).toBe(false);
  });

  it('should switch to the col direction class', () => {
    fixture.componentRef.setInput('direction', 'col');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-direction-col')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-direction-row')).toBe(false);
  });
});
