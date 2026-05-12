import { StepComponent } from '@elementar-rt/components/stepper/step.component';

export interface StepperSelectionEvent {
  previouslySelectedIndex: number;
  previouslySelectedStep: StepComponent | undefined;
  selectedIndex: number;
  selectedStep: StepComponent;
}
