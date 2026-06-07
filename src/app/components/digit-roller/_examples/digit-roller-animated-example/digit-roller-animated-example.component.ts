import { Component, signal, OnInit } from '@angular/core';
import { DigitRollerComponent } from '@elementar-rt/components/digit-roller';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-digit-roller-animated-example',
  imports: [DigitRollerComponent, MatButton],
  templateUrl: './digit-roller-animated-example.component.html',
  styleUrl: './digit-roller-animated-example.component.scss'
})
export class DigitRollerAnimatedExampleComponent {
  count = signal(0);

  randomize(): void {
    this.count.set(Math.floor(Math.random() * 99999));
  }
}
