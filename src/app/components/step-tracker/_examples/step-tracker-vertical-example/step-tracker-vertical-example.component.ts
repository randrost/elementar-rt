import { Component } from '@angular/core';
import { StepTrackerComponent } from '@elementar-rt/components/step-tracker';

@Component({
  selector: 'app-step-tracker-vertical-example',
  imports: [StepTrackerComponent],
  templateUrl: './step-tracker-vertical-example.component.html',
  styleUrl: './step-tracker-vertical-example.component.scss'
})
export class StepTrackerVerticalExampleComponent {
  steps = [
    { label: 'Order placed', description: 'Your order has been received' },
    { label: 'Processing', description: 'We\'re preparing your items' },
    { label: 'Shipped', description: 'Your order is on the way' },
    { label: 'Delivered', description: 'Enjoy your purchase!' },
  ];
}
