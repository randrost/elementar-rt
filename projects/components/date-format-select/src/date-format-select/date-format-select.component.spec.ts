import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DateFormatSelectComponent } from './date-format-select.component';

@Component({
  standalone: true,
  imports: [DateFormatSelectComponent, ReactiveFormsModule],
  template: `<emr-date-format-select [formControl]="control"></emr-date-format-select>`,
})
class HostComponent {
  control = new FormControl('MM/dd/yyyy');
  @ViewChild(DateFormatSelectComponent) select!: DateFormatSelectComponent;
}

describe('DateFormatSelectComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: DateFormatSelectComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideNoopAnimations()],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.select;
  });

  it('should default to three date formats', () => {
    expect(component.dateFormats().length).toBe(3);
  });

  it('should reflect the bound FormControl value', () => {
    expect(component.value).toBe('MM/dd/yyyy');
    expect(component.empty).toBe(false);
  });

  it('should propagate a selection to the FormControl', () => {
    component.onSelectionChange({ value: 'yyyy-MM-dd' } as any);
    expect(fixture.componentInstance.control.value).toBe('yyyy-MM-dd');
  });

  it('should track focus state and notify stateChanges', () => {
    let changeCount = 0;
    component.stateChanges.subscribe(() => changeCount++);
    component.onFocus();
    expect(component.focused).toBe(true);
    component.onBlur();
    expect(component.focused).toBe(false);
    expect(changeCount).toBeGreaterThanOrEqual(2);
  });

  it('should coerce the required attribute', () => {
    component.required = 'true' as any;
    expect(component.required).toBe(true);
  });

  it('should propagate disabled state to the underlying mat-select', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });
});
