import { Component, model } from '@angular/core';
import { TimezoneSelectComponent } from '@elementar-rt/components/timezone-select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-timezone-select-example',
  imports: [
    TimezoneSelectComponent,
    MatFormField,
    MatLabel,
    FormsModule
  ],
  templateUrl: './basic-timezone-select-example.component.html',
  styleUrl: './basic-timezone-select-example.component.scss'
})
export class BasicTimezoneSelectExampleComponent {
  selectedTimezone = model(null);
}
