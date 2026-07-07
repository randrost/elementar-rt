import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { NumberInputComponent } from './number-input.component';

@Component({
  standalone: true,
  imports: [NumberInputComponent, ReactiveFormsModule],
  template: `<emr-number-input [formControl]="control" [min]="0" [max]="10" [step]="2"></emr-number-input>`,
})
class HostComponent {
  control = new FormControl(4);
  @ViewChild(NumberInputComponent) numberInput!: NumberInputComponent;
}

describe('NumberInputComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: NumberInputComponent;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.numberInput;
    input = fixture.nativeElement.querySelector('input');
  });

  it('should write the initial FormControl value into the input', () => {
    expect(input.value).toBe('4');
    expect(component.value).toBe(4);
  });

  it('should increase the value by the configured step', () => {
    component.increase(new MouseEvent('click'), input);
    expect(component.value).toBe(6);
    expect(fixture.componentInstance.control.value).toBe(6);
  });

  it('should decrease the value by the configured step', () => {
    component.decrease(new MouseEvent('click'), input);
    expect(component.value).toBe(2);
  });

  it('should disable the increase control once the max is reached', () => {
    input.value = '10';
    expect(component.isIncreaseDisabled()).toBe(true);
  });

  it('should disable the decrease control once the min is reached', () => {
    input.value = '0';
    expect(component.isDecreaseDisabled()).toBe(true);
  });

  it('should emit valueChange when the input changes directly', () => {
    const emitted: (number | undefined)[] = [];
    component.valueChange.subscribe((v) => emitted.push(v));
    input.value = '7';
    component.inputChange({ target: input });
    expect(emitted).toEqual([7]);
  });

  it('should report empty as false for a zero value', () => {
    component.writeValue(0);
    expect(component.empty).toBe(false);
  });

  it('should report empty as true when there is no value', () => {
    component.writeValue(undefined);
    expect(component.empty).toBe(true);
  });

  it('should mark the control touched and update focused state on blur', () => {
    component.onFocusIn(new FocusEvent('focus'));
    expect(component.focused).toBe(true);
    component.onFocusOut(new FocusEvent('blur'));
    expect(component.focused).toBe(false);
    expect(component.touched).toBe(true);
  });
});
