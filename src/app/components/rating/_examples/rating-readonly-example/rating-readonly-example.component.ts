import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '@elementar-rt/components/rating';

@Component({
  selector: 'app-rating-readonly-example',
  imports: [RatingComponent, FormsModule],
  templateUrl: './rating-readonly-example.component.html',
  styleUrl: './rating-readonly-example.component.scss'
})
export class RatingReadonlyExampleComponent {}
