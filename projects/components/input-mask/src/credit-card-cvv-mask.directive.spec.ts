import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardCvvMaskDirective } from './credit-card-cvv-mask.directive';

@Component({
  standalone: true,
  imports: [CreditCardCvvMaskDirective],
  template: `<input emrCreditCardCvvMask>`,
})
class HostComponent {
  @ViewChild(CreditCardCvvMaskDirective) directive!: CreditCardCvvMaskDirective;
}

describe('CreditCardCvvMaskDirective', () => {
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
