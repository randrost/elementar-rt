import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitRollerComponent } from './digit-roller.component';

describe('DigitRollerComponent', () => {
  let fixture: ComponentFixture<DigitRollerComponent>;
  let component: DigitRollerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DigitRollerComponent] }).compileComponents();
    fixture = TestBed.createComponent(DigitRollerComponent);
    component = fixture.componentInstance;
  });

  it('should split a plain number into individual characters', () => {
    fixture.componentRef.setInput('value', 42);
    fixture.detectChanges();
    expect((component as any)._chars()).toEqual(['4', '2']);
  });

  it('should insert thousands separators when format is "comma"', () => {
    fixture.componentRef.setInput('value', 12345);
    fixture.componentRef.setInput('format', 'comma');
    fixture.detectChanges();
    expect((component as any)._chars().join('')).toBe('12,345');
  });

  it('should prefix a currency symbol when format is "currency"', () => {
    fixture.componentRef.setInput('value', 1234.5);
    fixture.componentRef.setInput('format', 'currency');
    fixture.componentRef.setInput('decimals', 2);
    fixture.componentRef.setInput('currency', '€');
    fixture.detectChanges();
    expect((component as any)._chars().join('')).toBe('€1,234.50');
  });

  it('should respect the configured decimal places', () => {
    fixture.componentRef.setInput('value', 3.14159);
    fixture.componentRef.setInput('decimals', 2);
    fixture.detectChanges();
    expect((component as any)._chars().join('')).toBe('3.14');
  });

  it('should identify digit vs non-digit characters', () => {
    expect((component as any)._isDigit('5')).toBe(true);
    expect((component as any)._isDigit(',')).toBe(false);
    expect((component as any)._isDigit('$')).toBe(false);
  });
});
