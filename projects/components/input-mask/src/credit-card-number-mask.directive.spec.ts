import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardNumberMaskDirective } from './credit-card-number-mask.directive';

@Component({
  standalone: true,
  imports: [CreditCardNumberMaskDirective],
  template: `<input emrCreditCardNumberMask>`,
})
class HostComponent {
  @ViewChild(CreditCardNumberMaskDirective) directive!: CreditCardNumberMaskDirective;
}

describe('CreditCardNumberMaskDirective', () => {
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
