import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinInputDirective } from './pin-input.directive';

@Component({
  imports: [PinInputDirective],
  template: `<input emrPinInput placeholder="0" [index]="0"/>`
})
class HostComponent {}

describe('PinInputDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should hide the placeholder on focus and restore it on blur', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('placeholder')).toBe('0');

    input.dispatchEvent(new Event('focus'));
    expect(input.getAttribute('placeholder')).toBeNull();

    input.dispatchEvent(new Event('blur'));
    expect(input.getAttribute('placeholder')).toBe('0');
  });

  it('should apply the emr-pin-input host class', () => {
    expect(fixture.nativeElement.querySelector('input').classList.contains('emr-pin-input')).toBe(true);
  });

  it('should focus the native element via the api', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const directive = fixture.debugElement.children[0].injector.get(PinInputDirective);

    directive.api.focus();

    expect(document.activeElement).toBe(input);
  });
});
