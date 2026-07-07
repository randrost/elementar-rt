import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CardComponent] }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();
  });

  it('should default to the elevated variant and be non-interactive', () => {
    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('elevated');
    expect(fixture.nativeElement.classList.contains('is-interactive')).toBe(false);
  });

  it('should reflect variant and interactive input changes', () => {
    fixture.componentRef.setInput('variant', 'outlined');
    fixture.componentRef.setInput('interactive', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('outlined');
    expect(fixture.nativeElement.classList.contains('is-interactive')).toBe(true);
  });
});
