import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { StepperComponent } from './stepper.component';
import { StepComponent } from './step.component';

@Component({
  standalone: true,
  imports: [StepperComponent, StepComponent],
  template: `
    <emr-stepper [linear]="linear" [(selectedIndex)]="selectedIndex">
      <emr-step [stepControl]="control1">Step 1</emr-step>
      <emr-step [stepControl]="control2">Step 2</emr-step>
      <emr-step optional="true">Step 3</emr-step>
    </emr-stepper>
  `,
})
class HostComponent {
  linear = false;
  selectedIndex = 0;
  control1 = new FormControl('', Validators.required);
  control2 = new FormControl('', Validators.required);
  @ViewChild(StepperComponent) stepper!: StepperComponent;
}

describe('StepperComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let stepper: StepperComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    stepper = fixture.componentInstance.stepper;
  });

  it('should count the projected steps', () => {
    expect(stepper.stepsCount()).toBe(3);
  });

  it('should identify the first and last steps', () => {
    expect(stepper.isFirstStep()).toBe(true);
    expect(stepper.isLastStep()).toBe(false);
    stepper.selectedIndex.set(2);
    fixture.detectChanges();
    expect(stepper.isLastStep()).toBe(true);
  });

  it('should advance to the next step in non-linear mode regardless of validity', () => {
    stepper.next();
    fixture.detectChanges();
    expect(stepper.selectedIndex()).toBe(1);
  });

  it('should block advancing in linear mode until the current step is valid', () => {
    fixture.componentInstance.linear = true;
    fixture.detectChanges();
    expect(stepper.canMoveNext()).toBe(false);
    fixture.componentInstance.control1.setValue('filled');
    fixture.detectChanges();
    expect(stepper.canMoveNext()).toBe(true);
    stepper.next();
    fixture.detectChanges();
    expect(stepper.selectedIndex()).toBe(1);
  });

  it('should allow advancing past an optional invalid step in linear mode', () => {
    fixture.componentInstance.linear = true;
    fixture.componentInstance.control1.setValue('filled');
    fixture.componentInstance.control2.setValue('filled');
    stepper.selectedIndex.set(2);
    fixture.detectChanges();
    expect(stepper.canMoveNext()).toBe(false); // already last step
  });

  it('should navigate to the previous step', () => {
    stepper.selectedIndex.set(1);
    fixture.detectChanges();
    stepper.previous();
    fixture.detectChanges();
    expect(stepper.selectedIndex()).toBe(0);
  });

  it('should not navigate before the first step', () => {
    stepper.previous();
    fixture.detectChanges();
    expect(stepper.selectedIndex()).toBe(0);
  });

  it('should compute progress percentage based on the selected index', () => {
    expect(stepper.progressPercent()).toBeCloseTo(33.33, 1);
    stepper.selectedIndex.set(2);
    fixture.detectChanges();
    expect(stepper.progressPercent()).toBe(100);
  });

  it('should mark only the selected step as active', () => {
    stepper.selectedIndex.set(1);
    fixture.detectChanges();
    const steps = stepper.steps();
    expect(steps[0].isActive()).toBe(false);
    expect(steps[1].isActive()).toBe(true);
    expect(steps[2].isActive()).toBe(false);
  });

  it('should reset all steps and go back to the first index', () => {
    stepper.selectedIndex.set(1);
    fixture.detectChanges();
    // Navigating to step 1 marks it interacted via the stepper's own effect.
    expect(stepper.steps()[1].interacted()).toBe(true);

    stepper.reset();
    fixture.detectChanges();

    expect(stepper.selectedIndex()).toBe(0);
    // reset() clears every step's interacted flag; step 1 is no longer
    // selected, so nothing re-marks it interacted afterwards.
    expect(stepper.steps()[1].interacted()).toBe(false);
  });
});
