import { Component, signal } from '@angular/core';
import { ActionRequiredComponent } from '@elementar-rt/components/action-required';

@Component({
  selector: 'app-action-required-custom-example',
  imports: [ActionRequiredComponent],
  templateUrl: './action-required-custom-example.component.html',
  styleUrl: './action-required-custom-example.component.scss'
})
export class ActionRequiredCustomExampleComponent {
  completed = signal(false);

  onAction(): void {
    this.completed.set(true);
  }
}
