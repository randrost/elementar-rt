import { Component } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { CreditCardCvvMaskDirective } from '@elementar-rt/components/input-mask';

@Component({
  selector: 'app-credit-card-cvv-input-mask-example',
  imports: [
    MatInput,
    CreditCardCvvMaskDirective,
    MatLabel,
    MatFormField
  ],
  templateUrl: './credit-card-cvv-input-mask-example.component.html',
  styleUrl: './credit-card-cvv-input-mask-example.component.scss'
})
export class CreditCardCvvInputMaskExampleComponent {

}
