import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';

export type ImagePlaceholderMode = 'skeleton' | 'blur' | 'icon';

@Component({
  selector: 'emr-image-placeholder',
  standalone: true,
  templateUrl: './image-placeholder.component.html',
  styleUrl: './image-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-mode]': 'mode()',
    '[attr.data-loaded]': '_loaded() || null',
    '[attr.data-error]': '_error() || null',
  }
})
export class ImagePlaceholderComponent {
  src = input('');
  alt = input('');
  mode = input<ImagePlaceholderMode>('skeleton');
  lowResSrc = input('');

  protected _loaded = signal(false);
  protected _error = signal(false);

  protected _onLoad(): void { this._loaded.set(true); this._error.set(false); }
  protected _onError(): void { this._error.set(true); this._loaded.set(false); }
}
