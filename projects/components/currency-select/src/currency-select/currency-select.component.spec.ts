import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { CurrencySelectComponent } from './currency-select.component';

@Component({
  standalone: true,
  imports: [CurrencySelectComponent, ReactiveFormsModule],
  template: `<emr-currency-select [formControl]="control"></emr-currency-select>`,
})
class HostComponent {
  control = new FormControl('USD', Validators.required);
  @ViewChild(CurrencySelectComponent) select!: CurrencySelectComponent;
}

describe('CurrencySelectComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: CurrencySelectComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideNoopAnimations()],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.select;
  });

  it('should reflect the bound FormControl value', () => {
    expect(component.value).toBe('USD');
    expect(component.selectedCurrencyDisplay()?.code).toBe('USD');
  });

  it('should mark itself required when the FormControl has a required validator', () => {
    expect(component.required).toBe(true);
  });

  it('should filter currencies by name as the search text changes', () => {
    component.searchCtrl.setValue('euro');
    expect(component.filteredCurrencies().length).toBeGreaterThan(0);
    expect(component.filteredCurrencies().every((c) => c.name.toLowerCase().includes('euro'))).toBe(true);
  });

  it('should propagate a selection to the bound FormControl', () => {
    component.onSelectionChange({ value: 'EUR' } as any);
    fixture.detectChanges(); // flush the signal effect that calls onChangeFn
    expect(fixture.componentInstance.control.value).toBe('EUR');
  });

  it('should report empty when there is no value', () => {
    component.writeValue(null);
    expect(component.empty).toBe(true);
  });

  it('should disable the search control when the select is disabled', () => {
    component.setDisabledState(true);
    fixture.detectChanges(); // flush the signal effect that syncs searchCtrl
    expect(component.searchCtrl.disabled).toBe(true);
  });
});
