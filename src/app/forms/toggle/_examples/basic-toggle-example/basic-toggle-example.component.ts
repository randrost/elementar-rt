import { Component } from '@angular/core';
import { ToggleComponent } from '@elementar-rt/components/toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-basic-toggle-example',
  imports: [
    ToggleComponent,
    MatIcon
  ],
  templateUrl: './basic-toggle-example.component.html',
  styleUrl: './basic-toggle-example.component.scss'
})
export class BasicToggleExampleComponent {}
