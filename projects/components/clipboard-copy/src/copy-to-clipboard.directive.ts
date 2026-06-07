import { Directive, input, output, signal, HostListener, numberAttribute } from '@angular/core';

@Directive({
  selector: '[emrCopyToClipboard]',
  standalone: true,
  host: {
    '[attr.data-copied]': '_copied() || null',
  }
})
export class CopyToClipboardDirective {
  emrCopyToClipboard = input.required<string>();
  resetDelay = input(2000, { transform: numberAttribute });

  copied = output<string>();
  copyError = output<Error>();

  protected _copied = signal(false);

  private _timer: ReturnType<typeof setTimeout> | null = null;

  @HostListener('click')
  async onClick(): Promise<void> {
    const text = this.emrCopyToClipboard();
    try {
      await navigator.clipboard.writeText(text);
      this._copied.set(true);
      this.copied.emit(text);
      if (this._timer) clearTimeout(this._timer);
      this._timer = setTimeout(() => this._copied.set(false), this.resetDelay());
    } catch (err) {
      this.copyError.emit(err as Error);
    }
  }
}
