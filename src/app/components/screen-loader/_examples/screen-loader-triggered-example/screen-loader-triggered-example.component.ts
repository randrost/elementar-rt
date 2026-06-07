import { Component, signal } from '@angular/core';
import { ScreenLoaderComponent } from '@elementar-rt/components/screen-loader';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-screen-loader-triggered-example',
  imports: [
    ScreenLoaderComponent,
    MatButton
  ],
  templateUrl: './screen-loader-triggered-example.component.html',
  styleUrl: './screen-loader-triggered-example.component.scss'
})
export class ScreenLoaderTriggeredExampleComponent {
  opened = signal(false);
  saved = signal(false);

  saveChanges(): void {
    this.saved.set(false);
    this.opened.set(true);
    setTimeout(() => {
      this.opened.set(false);
      this.saved.set(true);
    }, 3000);
  }
}
