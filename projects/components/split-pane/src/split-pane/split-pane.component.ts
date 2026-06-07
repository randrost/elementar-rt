import {
  Component, input, output, signal, ChangeDetectionStrategy,
  numberAttribute, booleanAttribute, ElementRef, inject, OnInit, OnDestroy
} from '@angular/core';

@Component({
  selector: 'emr-split-pane',
  standalone: true,
  templateUrl: './split-pane.component.html',
  styleUrl: './split-pane.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-orientation]': 'orientation()',
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

  private _el = inject(ElementRef<HTMLElement>);
  private _dragging = false;
  private _onMouseMove = this._handleMouseMove.bind(this);
  private _onMouseUp = this._handleMouseUp.bind(this);

  ngOnInit(): void {
    let initial = this.initialSize();
    const key = this.storageKey();
    if (key) {
      const stored = localStorage.getItem(`emr-split-${key}`);
      if (stored) initial = parseFloat(stored);
    }
    this._firstSize.set(Math.min(this.maxSize(), Math.max(this.minSize(), initial)));
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  }

  protected _onDividerMouseDown(e: MouseEvent): void {
    e.preventDefault();
    this._dragging = true;
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  }

  private _handleMouseMove(e: MouseEvent): void {
    if (!this._dragging) return;
    const rect = this._el.nativeElement.getBoundingClientRect();
    const isHoriz = this.orientation() === 'horizontal';
    const pos = isHoriz ? e.clientX - rect.left : e.clientY - rect.top;
    const total = isHoriz ? rect.width : rect.height;
    const pct = Math.min(this.maxSize(), Math.max(this.minSize(), (pos / total) * 100));
    this._firstSize.set(pct);
    this.sizeChange.emit(pct);
    const key = this.storageKey();
    if (key) localStorage.setItem(`emr-split-${key}`, String(pct));
  }

  private _handleMouseUp(): void {
    this._dragging = false;
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  }
}
