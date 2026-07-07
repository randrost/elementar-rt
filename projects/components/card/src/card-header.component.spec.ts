import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeaderComponent } from './card-header.component';

describe('CardHeaderComponent', () => {
  let fixture: ComponentFixture<CardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CardHeaderComponent] }).compileComponents();
    fixture = TestBed.createComponent(CardHeaderComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-card-header')).toBe(true);
  });
});
