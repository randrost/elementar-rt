import { Component } from '@angular/core';
import { BadgeComponent } from '@elementar-rt/components/badge';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-badge-positions-example',
  imports: [BadgeComponent, MatIcon],
  templateUrl: './badge-positions-example.component.html',
  styleUrl: './badge-positions-example.component.scss'
})
export class BadgePositionsExampleComponent {}
