import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CreditCardCvvMaskDirective } from './credit-card-cvv-mask.directive';

@Component({
  standalone: true,
  imports: [CreditCardCvvMaskDirective, FormsModule],
  template: `<input emrCreditCardCvvMask [(ngModel)]="value">`,
})
class HostComponent {
  value = '';
  @ViewChild(CreditCardCvvMaskDirective) directive!: CreditCardCvvMaskDirective;
}

describe('CreditCardCvvMaskDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should strip non-digit characters', () => {
    input.value = '12a3';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('123');
    expect(fixture.componentInstance.value).toBe('123');
  });

  it('should truncate beyond 4 digits', () => {
    input.value = '123456';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('1234');
  });
});
