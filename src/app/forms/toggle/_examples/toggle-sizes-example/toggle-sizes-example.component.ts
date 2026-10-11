import { Component } from '@angular/core';
import { ToggleComponent } from '@elementar-rt/components/toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-sizes-example',
  imports: [
    ToggleComponent,
    MatIcon
  ],
  templateUrl: './toggle-sizes-example.component.html',
  styleUrl: './toggle-sizes-example.component.scss'
})
export class ToggleSizesExampleComponent {}
