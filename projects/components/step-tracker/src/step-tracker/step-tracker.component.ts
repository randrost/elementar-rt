import { Component, input, computed, ChangeDetectionStrategy, numberAttribute } from '@angular/core';

export type StepState = 'completed' | 'active' | 'upcoming';

export interface StepTrackerStep {
  label: string;
  description?: string;
  state?: StepState;
}

@Component({
  selector: 'emr-step-tracker',
  standalone: true,
  templateUrl: './step-tracker.component.html',
  styleUrl: './step-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-orientation]': 'orientation()',
  }
})
export class StepTrackerComponent {
  steps = input<(string | StepTrackerStep)[]>([]);
  currentStep = input(0, { transform: numberAttribute });
  orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected _resolvedSteps = computed(() =>
    this.steps().map((s, i): StepTrackerStep & { index: number } => {
      const label = typeof s === 'string' ? s : s.label;
      const description = typeof s === 'string' ? undefined : s.description;
      const current = this.currentStep();
      const state: StepState = i < current ? 'completed' : i === current ? 'active' : 'upcoming';
      return { label, description, state, index: i + 1 };
    })
  );
}
