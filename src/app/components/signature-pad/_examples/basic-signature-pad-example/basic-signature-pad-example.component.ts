import { Component, signal } from '@angular/core';
import { SignaturePadComponent } from '@elementar-rt/components/signature-pad';

@Component({
  selector: 'app-basic-signature-pad-example',
  imports: [
    SignaturePadComponent
  ],
  templateUrl: './basic-signature-pad-example.component.html',
  styleUrl: './basic-signature-pad-example.component.scss'
})
export class BasicSignaturePadExampleComponent {
  signature = signal('');

  onSignatureSaved(signature: string) {
    console.log(signature);
    this.signature.set(signature);
  }

  onSignatureCleared() {
    this.signature.set('');
  }
}
