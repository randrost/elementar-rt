import { Component, signal } from '@angular/core';
import { ButtonToggleGroupComponent, ButtonToggleComponent } from '@elementar-rt/components/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-button-toggle-variants-example',
  imports: [ButtonToggleGroupComponent, ButtonToggleComponent, FormsModule],
  templateUrl: './button-toggle-variants-example.component.html',
  styleUrl: './button-toggle-variants-example.component.scss'
})
export class ButtonToggleVariantsExampleComponent {
  v1 = signal('left');
  v2 = signal('center');
  v3 = signal('bold');
}
