import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTrackerComponent } from './step-tracker.component';

describe('StepTrackerComponent', () => {
  let fixture: ComponentFixture<StepTrackerComponent>;
  let component: StepTrackerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StepTrackerComponent] }).compileComponents();
    fixture = TestBed.createComponent(StepTrackerComponent);
    component = fixture.componentInstance;
  });

  it('should mark steps before the current index as completed and the current one as active', () => {
    fixture.componentRef.setInput('steps', ['A', 'B', 'C']);
    fixture.componentRef.setInput('currentStep', 1);
    fixture.detectChanges();
    const resolved = (component as any)._resolvedSteps();
    expect(resolved.map((s: any) => s.state)).toEqual(['completed', 'active', 'upcoming']);
  });

  it('should assign a 1-based index to each step', () => {
    fixture.componentRef.setInput('steps', ['A', 'B']);
    fixture.detectChanges();
    const resolved = (component as any)._resolvedSteps();
    expect(resolved.map((s: any) => s.index)).toEqual([1, 2]);
  });

  it('should support object steps with label and description', () => {
    fixture.componentRef.setInput('steps', [{ label: 'Ship', description: 'Deploy to prod' }]);
    fixture.detectChanges();
    const resolved = (component as any)._resolvedSteps();
    expect(resolved[0].label).toBe('Ship');
    expect(resolved[0].description).toBe('Deploy to prod');
  });
});
