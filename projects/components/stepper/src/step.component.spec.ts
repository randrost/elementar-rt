import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { StepComponent } from './step.component';

describe('StepComponent', () => {
  let fixture: ComponentFixture<StepComponent>;
  let component: StepComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StepComponent] }).compileComponents();
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
  });

  it('should be completed by default when there is no stepControl', () => {
    fixture.detectChanges();
    expect(component.completed()).toBe(true);
    expect(component.isValid()).toBe(true);
  });

  it('should be incomplete when the bound stepControl is invalid', () => {
    fixture.componentRef.setInput('stepControl', new FormControl('', Validators.required));
    fixture.detectChanges();
    expect(component.completed()).toBe(false);
    expect(component.isValid()).toBe(false);
  });

  it('should become complete once the stepControl becomes valid', () => {
    const control = new FormControl('', Validators.required);
    fixture.componentRef.setInput('stepControl', control);
    fixture.detectChanges();
    control.setValue('a value');
    expect(component.completed()).toBe(true);
  });

  it('should toggle active state via setActive', () => {
    fixture.detectChanges();
    component.setActive(true);
    expect(component.isActive()).toBe(true);
    component.setActive(false);
    expect(component.isActive()).toBe(false);
  });

  it('should track interacted state and reset it', () => {
    fixture.detectChanges();
    component.setInteracted(true);
    expect(component.interacted()).toBe(true);
    component.reset();
    expect(component.interacted()).toBe(false);
  });
});
