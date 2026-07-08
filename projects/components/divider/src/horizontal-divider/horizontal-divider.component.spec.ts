import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalDividerComponent } from './horizontal-divider.component';

describe('HorizontalDividerComponent', () => {
  let fixture: ComponentFixture<HorizontalDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HorizontalDividerComponent] }).compileComponents();
    fixture = TestBed.createComponent(HorizontalDividerComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-horizontal-divider')).toBe(true);
  });
});
