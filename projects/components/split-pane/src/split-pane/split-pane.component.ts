import {
  Component, input, output, signal, ChangeDetectionStrategy,
  numberAttribute, ElementRef, inject, OnInit, OnDestroy, PLATFORM_ID, computed
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Percentage moved per arrow-key press on the divider. */
const KEYBOARD_STEP = 2;

@Component({
  selector: 'emr-split-pane',
  standalone: true,
  templateUrl: './split-pane.component.html',
  styleUrl: './split-pane.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[class.is-dragging]': '_dragging()',
  }
})
export class SplitPaneComponent implements OnInit, OnDestroy {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  initialSize = input(50, { transform: numberAttribute });
  minSize = input(10, { transform: numberAttribute });
  maxSize = input(90, { transform: numberAttribute });
  storageKey = input<string>('');

  sizeChange = output<number>();

  protected _firstSize = signal(50);
  protected _dragging = signal(false);
  protected _roundedSize = computed(() => Math.round(this._firstSize()));

  private _el = inject(ElementRef<HTMLElement>);
  private _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private _onPointerMove = this._handlePointerMove.bind(this);
  private _onPointerUp = this._handlePointerUp.bind(this);

  ngOnInit(): void {
    let initial = this.initialSize();
    const stored = this._readStorage();
    if (stored !== null) initial = stored;
    this._firstSize.set(this._clamp(initial));
  }

  ngOnDestroy(): void {
    this._removeListeners();
  }

  protected _onDividerPointerDown(e: PointerEvent): void {
    if (e.button !== 0) return;
    e.preventDefault();
    this._dragging.set(true);
    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
    document.addEventListener('pointercancel', this._onPointerUp);
  }

  protected _onDividerKeydown(e: KeyboardEvent): void {
    const isHoriz = this.orientation() === 'horizontal';
    const decrease = isHoriz ? 'ArrowLeft' : 'ArrowUp';
    const increase = isHoriz ? 'ArrowRight' : 'ArrowDown';
    let next: number | null = null;

    if (e.key === decrease) next = this._firstSize() - KEYBOARD_STEP;
    else if (e.key === increase) next = this._firstSize() + KEYBOARD_STEP;
    else if (e.key === 'Home') next = this.minSize();
    else if (e.key === 'End') next = this.maxSize();

    if (next !== null) {
      e.preventDefault();
      this._setSize(next);
    }
  }

  private _handlePointerMove(e: PointerEvent): void {
    if (!this._dragging()) return;
    const rect = this._el.nativeElement.getBoundingClientRect();
    const isHoriz = this.orientation() === 'horizontal';
    const pos = isHoriz ? e.clientX - rect.left : e.clientY - rect.top;
    const total = isHoriz ? rect.width : rect.height;
    if (total > 0) this._setSize((pos / total) * 100);
  }

  private _handlePointerUp(): void {
    this._dragging.set(false);
    this._removeListeners();
  }

  private _setSize(value: number): void {
    const pct = this._clamp(value);
    this._firstSize.set(pct);
    this.sizeChange.emit(pct);
    this._writeStorage(pct);
  }

  private _clamp(value: number): number {
    return Math.min(this.maxSize(), Math.max(this.minSize(), value));
  }

  private _readStorage(): number | null {
    const key = this.storageKey();
    if (!key || !this._isBrowser) return null;
    try {
      const stored = parseFloat(localStorage.getItem(`emr-split-${key}`) ?? '');
      return isNaN(stored) ? null : stored;
    } catch {
      return null;
    }
  }

  private _writeStorage(pct: number): void {
    const key = this.storageKey();
    if (!key || !this._isBrowser) return;
    try {
      localStorage.setItem(`emr-split-${key}`, String(pct));
    } catch {
      // Storage can be unavailable (private mode, quota); resizing still works.
    }
  }

  private _removeListeners(): void {
    if (!this._isBrowser) return;
    document.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerup', this._onPointerUp);
    document.removeEventListener('pointercancel', this._onPointerUp);
  }
}
