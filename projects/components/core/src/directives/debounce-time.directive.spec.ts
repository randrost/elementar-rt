import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { DebounceTimeDirective } from './debounce-time.directive';

@Component({
  standalone: true,
  imports: [DebounceTimeDirective, FormsModule],
  template: `<input emrDebounceTime [debounceTime]="delay" [(ngModel)]="value">`,
})
class HostComponent {
  value = '';
  delay = 300;
  @ViewChild(DebounceTimeDirective) directive!: DebounceTimeDirective;
  @ViewChild(NgModel) ngModel!: NgModel;
}

describe('DebounceTimeDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should write the bound value to the input element via the ControlValueAccessor', () => {
    fixture.componentInstance.directive.writeValue('preset');
    expect(input.value).toBe('preset');
  });

  it('should not propagate the value to ngModel before the debounce elapses', fakeAsync(() => {
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    tick(299);
    expect(fixture.componentInstance.value).toBe('');
  }));

  it('should propagate the value to ngModel once the debounce time elapses', fakeAsync(() => {
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    tick(300);
    expect(fixture.componentInstance.value).toBe('hello');
  }));

  it('should mark the control as touched on blur', () => {
    input.dispatchEvent(new Event('blur'));
    expect(fixture.componentInstance.ngModel.touched).toBe(true);
  });

  it('should update the input value immediately when disabled/enabled toggles', () => {
    fixture.componentInstance.directive.setDisabledState?.(true);
    expect(input.disabled).toBe(true);
  });
});
