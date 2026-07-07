import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalDividerComponent } from './vertical-divider.component';

describe('VerticalDividerComponent', () => {
  let fixture: ComponentFixture<VerticalDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [VerticalDividerComponent] }).compileComponents();
    fixture = TestBed.createComponent(VerticalDividerComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-vertical-divider')).toBe(true);
  });
});
