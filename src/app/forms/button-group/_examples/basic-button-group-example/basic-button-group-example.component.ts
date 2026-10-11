import { Component, signal } from '@angular/core';
import { ButtonGroupComponent } from '@elementar-rt/components/button-group';
import { ToggleComponent } from '@elementar-rt/components/toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-basic-button-group-example',
  imports: [
    ButtonGroupComponent,
    ToggleComponent,
    MatIcon
  ],
  templateUrl: './basic-button-group-example.component.html',
  styleUrl: './basic-button-group-example.component.scss'
})
export class BasicButtonGroupExampleComponent {
  enabled = signal<unknown>(['wifi']);
}
