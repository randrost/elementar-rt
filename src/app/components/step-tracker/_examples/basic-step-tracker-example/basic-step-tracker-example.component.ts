import { Component } from '@angular/core';
import { StepTrackerComponent } from '@elementar-rt/components/step-tracker';

@Component({
  selector: 'app-basic-step-tracker-example',
  imports: [StepTrackerComponent],
  templateUrl: './basic-step-tracker-example.component.html',
  styleUrl: './basic-step-tracker-example.component.scss'
})
export class BasicStepTrackerExampleComponent {
  steps = ['Account setup', 'Personal info', 'Preferences', 'Review'];
}
