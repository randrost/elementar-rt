import { Component, signal } from '@angular/core';
import { ButtonGroupComponent } from '@elementar-rt/components/button-group';
import { ToggleComponent } from '@elementar-rt/components/toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-connected-button-group-labels-example',
  imports: [
    ButtonGroupComponent,
    ToggleComponent,
    MatIcon
  ],
  templateUrl: './connected-button-group-labels-example.component.html',
  styleUrl: './connected-button-group-labels-example.component.scss'
})
export class ConnectedButtonGroupLabelsExampleComponent {
  connections = signal<unknown>(['wifi', 'bluetooth']);
}
