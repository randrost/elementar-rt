import { Component, signal } from '@angular/core';
import { LoadingIndicatorComponent } from '@elementar-rt/components/loading-indicator';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-loading-indicator-in-context-example',
  imports: [
    LoadingIndicatorComponent,
    MatButton
  ],
  templateUrl: './loading-indicator-in-context-example.component.html',
  styleUrl: './loading-indicator-in-context-example.component.scss'
})
export class LoadingIndicatorInContextExampleComponent {
  loading = signal(false);

  load(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 2500);
  }
}
