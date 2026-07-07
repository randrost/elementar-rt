import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { CountrySelectComponent } from './country-select.component';

@Component({
  standalone: true,
  imports: [CountrySelectComponent, ReactiveFormsModule],
  template: `<emr-country-select [formControl]="control"></emr-country-select>`,
})
class HostComponent {
  control = new FormControl('US', Validators.required);
  @ViewChild(CountrySelectComponent) select!: CountrySelectComponent;
}

describe('CountrySelectComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: CountrySelectComponent;

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
    expect(component.value).toBe('US');
    expect(component.selectedCountryDisplay()?.code).toBe('US');
  });

  it('should mark itself required when the FormControl has a required validator', () => {
    expect(component.required).toBe(true);
  });

  it('should filter countries by name as the search text changes', () => {
    component.searchCtrl.setValue('canada');
    expect(component.filteredCountries().every((c) => c.name.toLowerCase().includes('canada'))).toBe(true);
    expect(component.filteredCountries().length).toBeGreaterThan(0);
  });

  it('should filter countries by country code too', () => {
    component.searchCtrl.setValue('fr');
    expect(component.filteredCountries().some((c) => c.code.toLowerCase() === 'fr')).toBe(true);
  });

  it('should propagate a selection to the bound FormControl', () => {
    component.onSelectionChange({ value: 'DE' } as any);
    fixture.detectChanges(); // flush the signal effect that calls onChangeFn
    expect(fixture.componentInstance.control.value).toBe('DE');
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

  it('should clear the search text via clearSearch', () => {
    component.searchCtrl.setValue('spain');
    component.clearSearch(new MouseEvent('click'));
    expect(component.searchCtrl.value).toBe('');
  });
});
