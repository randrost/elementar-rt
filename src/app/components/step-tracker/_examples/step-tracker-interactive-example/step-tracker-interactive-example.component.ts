import { Component, signal } from '@angular/core';
import { StepTrackerComponent } from '@elementar-rt/components/step-tracker';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-step-tracker-interactive-example',
  imports: [StepTrackerComponent, MatButton],
  templateUrl: './step-tracker-interactive-example.component.html',
  styleUrl: './step-tracker-interactive-example.component.scss'
})
export class StepTrackerInteractiveExampleComponent {
  steps = ['Cart', 'Shipping', 'Payment', 'Confirm'];
  currentStep = signal(0);

  prev(): void {
    if (this.currentStep() > 0) this.currentStep.update(v => v - 1);
  }

  next(): void {
    if (this.currentStep() < this.steps.length - 1) this.currentStep.update(v => v + 1);
  }
}
