import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CreditCardExpiryDateMaskDirective } from './credit-card-expiry-date-mask.directive';

@Component({
  standalone: true,
  imports: [CreditCardExpiryDateMaskDirective, FormsModule],
  template: `<input emrCreditCardExpiryDateMask [(ngModel)]="value">`,
})
class HostComponent {
  value = '';
  @ViewChild(CreditCardExpiryDateMaskDirective) directive!: CreditCardExpiryDateMaskDirective;
}

describe('CreditCardExpiryDateMaskDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should insert a slash after the month once two digits are typed', () => {
    input.value = '12';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('12');
    input.value = '123';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('12/3');
  });

  it('should clamp a month above 12 down to 12', () => {
    input.value = '13';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('12');
  });

  it('should coerce a zero month to 01', () => {
    input.value = '00';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('01');
  });

  it('should propagate the unslashed value to ngModel', () => {
    input.value = '1225';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.value).toBe('1225');
  });

  it('should pad a single-digit year on blur', () => {
    input.value = '12/5';
    input.dispatchEvent(new Event('blur'));
    expect(input.value).toBe('12/05');
  });

  it('should write a formatted value back via the ControlValueAccessor', () => {
    fixture.componentInstance.directive.writeValue('1230');
    expect(input.value).toBe('12/30');
  });
});
