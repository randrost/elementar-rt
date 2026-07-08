import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMediaComponent } from './card-media.component';

describe('CardMediaComponent', () => {
  let fixture: ComponentFixture<CardMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CardMediaComponent] }).compileComponents();
    fixture = TestBed.createComponent(CardMediaComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-card-media')).toBe(true);
  });
});
