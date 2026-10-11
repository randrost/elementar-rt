import { Component, signal } from '@angular/core';
import { ToggleComponent } from '@elementar-rt/components/toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-binding-example',
  imports: [
    ToggleComponent,
    MatIcon
  ],
  templateUrl: './toggle-binding-example.component.html',
  styleUrl: './toggle-binding-example.component.scss'
})
export class ToggleBindingExampleComponent {
  muted = signal(false);
}
