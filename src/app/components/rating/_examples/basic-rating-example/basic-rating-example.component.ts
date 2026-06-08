import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '@elementar-rt/components/rating';

@Component({
  selector: 'app-basic-rating-example',
  imports: [RatingComponent, FormsModule],
  templateUrl: './basic-rating-example.component.html',
  styleUrl: './basic-rating-example.component.scss'
})
export class BasicRatingExampleComponent {
  value = signal(3);
}
