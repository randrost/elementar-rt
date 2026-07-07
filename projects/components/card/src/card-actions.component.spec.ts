import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActionsComponent } from './card-actions.component';

describe('CardActionsComponent', () => {
  let fixture: ComponentFixture<CardActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CardActionsComponent] }).compileComponents();
    fixture = TestBed.createComponent(CardActionsComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-card-actions')).toBe(true);
  });
});
