import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CreditCardNumberMaskDirective } from './credit-card-number-mask.directive';

// This directive reads/writes NgControl.control directly (with
// emitEvent:false), which is the reactive-forms contract — it targets
// [formControl]/formControlName, not template-driven [(ngModel)].
@Component({
  standalone: true,
  imports: [CreditCardNumberMaskDirective, ReactiveFormsModule],
  template: `<input emrCreditCardNumberMask [formControl]="control">`,
})
class HostComponent {
  control = new FormControl('');
  @ViewChild(CreditCardNumberMaskDirective) directive!: CreditCardNumberMaskDirective;
}

describe('CreditCardNumberMaskDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should group digits into blocks of four separated by spaces', () => {
    input.value = '4111111111111111';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('4111 1111 1111 1111');
  });

  it('should strip non-digit characters', () => {
    input.value = '4111-1111-1111';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('4111 1111 1111');
  });

  it('should truncate beyond 16 digits', () => {
    input.value = '41111111111111119999';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('4111 1111 1111 1111');
  });

  it('should propagate the unspaced value to the bound FormControl', () => {
    // Exercise onInput directly: dispatching a real 'input' event races this
    // directive's listener against Angular's own DefaultValueAccessor
    // listener on the same element/event, and their relative order isn't
    // something this directive controls.
    input.value = '4111 1111';
    fixture.componentInstance.directive.onInput({ target: input } as unknown as Event);
    expect(fixture.componentInstance.control.value).toBe('41111111');
  });

  it('should render the tel input type for a numeric keypad', () => {
    expect(input.getAttribute('type')).toBe('tel');
  });
});
