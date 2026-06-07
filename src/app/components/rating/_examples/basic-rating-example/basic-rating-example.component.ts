import { Component, signal } from '@angular/core';
import { RatingComponent } from '@elementar-rt/components/rating';

@Component({
  selector: 'app-basic-rating-example',
  imports: [RatingComponent],
  templateUrl: './basic-rating-example.component.html',
  styleUrl: './basic-rating-example.component.scss'
})
export class BasicRatingExampleComponent {
  value = signal(3);
}
