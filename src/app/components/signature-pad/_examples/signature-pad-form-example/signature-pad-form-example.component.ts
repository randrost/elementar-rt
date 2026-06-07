import { Component, signal } from '@angular/core';
import { SignaturePadComponent } from '@elementar-rt/components/signature-pad';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-signature-pad-form-example',
  imports: [
    SignaturePadComponent,
    MatButton
  ],
  templateUrl: './signature-pad-form-example.component.html',
  styleUrl: './signature-pad-form-example.component.scss'
})
export class SignaturePadFormExampleComponent {
  signature = signal('');
  submitted = signal(false);

  onSignatureSaved(dataUrl: string): void {
    this.signature.set(dataUrl);
  }

  onSignatureCleared(): void {
    this.signature.set('');
  }

  onSubmit(): void {
    if (this.signature()) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.signature.set('');
    this.submitted.set(false);
  }
}
