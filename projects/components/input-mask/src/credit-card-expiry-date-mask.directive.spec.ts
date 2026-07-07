import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardExpiryDateMaskDirective } from './credit-card-expiry-date-mask.directive';

@Component({
  standalone: true,
  imports: [CreditCardExpiryDateMaskDirective],
  template: `<input emrCreditCardExpiryDateMask>`,
})
class HostComponent {
  @ViewChild(CreditCardExpiryDateMaskDirective) directive!: CreditCardExpiryDateMaskDirective;
}

describe('CreditCardExpiryDateMaskDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });
});
