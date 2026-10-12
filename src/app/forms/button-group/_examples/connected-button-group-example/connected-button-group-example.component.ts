import { Component, signal } from '@angular/core';
import { ButtonGroupComponent } from '@elementar-rt/components/button-group';
import { ToggleComponent } from '@elementar-rt/components/toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-connected-button-group-example',
  imports: [
    ButtonGroupComponent,
    ToggleComponent,
    MatIcon
  ],
  templateUrl: './connected-button-group-example.component.html',
  styleUrl: './connected-button-group-example.component.scss'
})
export class ConnectedButtonGroupExampleComponent {
  view = signal<unknown>('week');
  formats = signal<unknown>(['bold']);
}
