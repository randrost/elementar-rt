import { Component, signal } from '@angular/core';
import { ButtonGroupComponent } from '@elementar-rt/components/button-group';
import { ToggleComponent } from '@elementar-rt/components/toggle';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-button-group-actions-example',
  imports: [
    ButtonGroupComponent,
    ToggleComponent,
    MatIcon,
    MatButton
  ],
  templateUrl: './button-group-actions-example.component.html',
  styleUrl: './button-group-actions-example.component.scss'
})
export class ButtonGroupActionsExampleComponent {
  playing = signal(false);
}
