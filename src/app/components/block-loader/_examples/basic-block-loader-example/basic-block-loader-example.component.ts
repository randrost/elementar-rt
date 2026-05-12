import { Component, signal } from '@angular/core';
import { BlockLoaderComponent, BlockLoaderContainerDirective } from '@elementar-rt/components/block-loader';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-basic-block-loader-example',
  imports: [
    BlockLoaderComponent,
    MatButton,
    BlockLoaderContainerDirective
  ],
  templateUrl: './basic-block-loader-example.component.html',
  styleUrl: './basic-block-loader-example.component.scss'
})
export class BasicBlockLoaderExampleComponent {
  loading = signal(true);

  toggleLoading() {
    this.loading.set(!this.loading());
  }
}
