import { Component, signal } from '@angular/core';
import { ButtonToggleGroupComponent, ButtonToggleComponent } from '@elementar-rt/components/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-button-toggle-example',
  imports: [ButtonToggleGroupComponent, ButtonToggleComponent, FormsModule],
  templateUrl: './basic-button-toggle-example.component.html',
  styleUrl: './basic-button-toggle-example.component.scss'
})
export class BasicButtonToggleExampleComponent {
  selected = signal('day');
}
