import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '@elementar-rt/components/rating';

@Component({
  selector: 'app-rating-sizes-example',
  imports: [RatingComponent, FormsModule],
  templateUrl: './rating-sizes-example.component.html',
  styleUrl: './rating-sizes-example.component.scss'
})
export class RatingSizesExampleComponent {}
