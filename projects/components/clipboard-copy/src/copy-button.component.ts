import { Component, input, signal, ChangeDetectionStrategy, numberAttribute } from '@angular/core';

@Component({
  selector: 'emr-copy-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="copy-btn"
      [attr.data-copied]="_copied() || null"
      [attr.aria-label]="_copied() ? copiedLabel() : copyLabel()"
      (click)="_copy()"
    >
      @if (_copied()) {
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        @if (showLabel()) { <span>{{ copiedLabel() }}</span> }
      } @else {
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        @if (showLabel()) { <span>{{ copyLabel() }}</span> }
      }
    </button>
  `,
  styles: [`
    @reference 'tailwindcss';

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: --spacing(1);
      background: transparent;
      border: 1px solid var(--color-outline-variant);
      border-radius: theme(--radius-md);
      padding: --spacing(1.5) --spacing(2);
      cursor: pointer;
      font-size: theme(--text-sm);
      color: var(--color-on-surface-variant);
      transition: all 150ms ease;

      &:hover { background: var(--color-surface-container); color: var(--color-on-surface); }
      &[data-copied] { color: var(--color-green); border-color: var(--color-green); }

      .icon { width: --spacing(4); height: --spacing(4); flex-shrink: 0; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyButtonComponent {
  text = input.required<string>();
  copyLabel = input('Copy');
  copiedLabel = input('Copied!');
  showLabel = input(false);
  resetDelay = input(2000, { transform: numberAttribute });

  protected _copied = signal(false);
  private _timer: ReturnType<typeof setTimeout> | null = null;

  protected async _copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.text());
      this._copied.set(true);
      if (this._timer) clearTimeout(this._timer);
      this._timer = setTimeout(() => this._copied.set(false), this.resetDelay());
    } catch { /* ignore */ }
  }
}
