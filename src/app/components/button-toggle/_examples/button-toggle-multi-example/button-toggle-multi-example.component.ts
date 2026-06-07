import { Component, signal } from '@angular/core';
import { ButtonToggleGroupComponent, ButtonToggleComponent } from '@elementar-rt/components/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-button-toggle-multi-example',
  imports: [ButtonToggleGroupComponent, ButtonToggleComponent, FormsModule],
  templateUrl: './button-toggle-multi-example.component.html',
  styleUrl: './button-toggle-multi-example.component.scss'
})
export class ButtonToggleMultiExampleComponent {
  selected = signal<string[]>(['bold']);
}
