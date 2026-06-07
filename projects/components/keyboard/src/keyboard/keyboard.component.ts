import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

type Platform = 'mac' | 'win' | 'auto';

const MAC_SYMBOLS: Record<string, string> = {
  ctrl: '⌘', cmd: '⌘', command: '⌘',
  alt: '⌥', option: '⌥',
  shift: '⇧',
  enter: '↵', return: '↵',
  backspace: '⌫', delete: '⌦',
  escape: 'Esc', esc: 'Esc',
  tab: '⇥',
  up: '↑', down: '↓', left: '←', right: '→',
};

const WIN_LABELS: Record<string, string> = {
  ctrl: 'Ctrl', cmd: 'Ctrl', command: 'Ctrl',
  alt: 'Alt', option: 'Alt',
  shift: 'Shift',
  enter: 'Enter', return: 'Enter',
  backspace: 'Backspace', delete: 'Del',
  escape: 'Esc', esc: 'Esc',
  tab: 'Tab',
  up: '↑', down: '↓', left: '←', right: '→',
};

@Component({
  selector: 'emr-keyboard',
  standalone: true,
  template: `
    @for (key of _resolved(); track $index; let last = $last) {
      <kbd class="kbd-key">{{ key }}</kbd>
      @if (!last) { <span class="kbd-sep">+</span> }
    }
  `,
  styles: [`
    @reference 'tailwindcss';

    :host {
      display: inline-flex;
      align-items: center;
      gap: --spacing(0.5);
    }

    .kbd-key {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: --spacing(6);
      height: --spacing(6);
      padding: 0 --spacing(1.5);
      font-family: inherit;
      font-size: theme(--text-xs);
      font-weight: 600;
      background: var(--color-surface-container);
      border: 1px solid var(--color-outline-variant);
      border-bottom-width: 2px;
      border-radius: theme(--radius-md);
      color: var(--color-on-surface);
      white-space: nowrap;
    }

    .kbd-sep {
      font-size: theme(--text-xs);
      color: var(--color-on-surface-variant);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent {
  keys = input<string[]>([]);
  platform = input<Platform>('auto');

  private _isMac = computed(() => {
    const p = this.platform();
    if (p === 'mac') return true;
    if (p === 'win') return false;
    return typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);
  });

  protected _resolved = computed(() => {
    const mac = this._isMac();
    const map = mac ? MAC_SYMBOLS : WIN_LABELS;
    return this.keys().map(k => map[k.toLowerCase()] ?? k.toUpperCase());
  });
}
