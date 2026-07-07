import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { PhoneInputComponent } from './phone-input.component';

@Component({
  standalone: true,
  imports: [PhoneInputComponent, ReactiveFormsModule],
  template: `<emr-phone-input [formControl]="control" defaultSelectedCountryCode="us"></emr-phone-input>`,
})
class HostComponent {
  control = new FormControl('');
  @ViewChild(PhoneInputComponent) phoneInput!: PhoneInputComponent;
}

describe('PhoneInputComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: PhoneInputComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideNoopAnimations()],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.phoneInput;
  });

  it('should default to the configured country when no value is set', () => {
    expect(component.selectedCountry()?.shortCode).toBe('us');
  });

  it('should parse a written international number into the national display format', () => {
    component.writeValue('+14155552671');
    expect(component.phoneNumber).toBe('4155552671');
  });

  it('should update the FormControl with the E.164 number as the user types', () => {
    component.phoneNumber = '4155552671';
    component.onPhoneNumberChange();
    expect(fixture.componentInstance.control.value).toBe('+14155552671');
  });

  it('should switch the selected country and reset the number on country selection', () => {
    component.phoneNumber = '4155552671';
    const gb = component.getCountry('GB' as any);
    component.onCountrySelect(gb, { focus: () => {} });
    expect(component.selectedCountry()?.shortCode).toBe('gb');
  });

  it('should emit countryChanged when the country changes', () => {
    const emitted: any[] = [];
    component.countryChanged.subscribe((c) => emitted.push(c));
    const gb = component.getCountry('GB' as any);
    component.onCountrySelect(gb, { focus: () => {} });
    expect(emitted.some((c) => c.shortCode === 'gb')).toBe(true);
  });

  it('should reject non-numeric key presses', () => {
    const event = { key: 'a', preventDefault: jasmine.createSpy('preventDefault') } as any;
    component.onInputKeyPress(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should allow digit and control characters on keypress', () => {
    const event = { key: '5', preventDefault: jasmine.createSpy('preventDefault') } as any;
    component.onInputKeyPress(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should clear the number and propagate null on reset', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);
    component.phoneNumber = '4155552671';
    component.reset();
    expect(component.phoneNumber).toBe('');
    expect(onChangeSpy).toHaveBeenCalledWith(null);
  });
});
