import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { TimezoneSelectComponent } from './timezone-select.component';

@Component({
  standalone: true,
  imports: [TimezoneSelectComponent, ReactiveFormsModule],
  template: `<emr-timezone-select [formControl]="control"></emr-timezone-select>`,
})
class HostComponent {
  control = new FormControl('America/New_York');
  @ViewChild(TimezoneSelectComponent) select!: TimezoneSelectComponent;
}

describe('TimezoneSelectComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: TimezoneSelectComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideNoopAnimations()],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.select;
  });

  it('should populate timezoneGroups on init', () => {
    expect((component as any).timezoneGroups().length).toBeGreaterThan(0);
  });

  it('should reflect the bound FormControl value', () => {
    expect(component.value).toBe('America/New_York');
    expect(component.empty).toBe(false);
  });

  it('should report empty when the value is cleared', () => {
    component.writeValue(null);
    expect(component.empty).toBe(true);
  });

  it('should propagate a model change to the FormControl', () => {
    (component as any).onModelChange('Europe/London');
    expect(fixture.componentInstance.control.value).toBe('Europe/London');
  });

  it('should track focused state via onFocusIn/onFocusOut', () => {
    component.onFocusIn();
    expect(component.focused).toBe(true);
    component.onFocusOut({ relatedTarget: null } as any);
    expect(component.focused).toBe(false);
    expect(component.touched()).toBe(true);
  });

  it('should reflect disabled state through the CVA', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });
});
