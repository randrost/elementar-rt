import {
  Component, input, signal, computed, ChangeDetectionStrategy,
  numberAttribute, booleanAttribute, ElementRef, viewChild
} from '@angular/core';

@Component({
  selector: 'emr-image-zoom-viewer',
  standalone: true,
  templateUrl: './image-zoom-viewer.component.html',
  styleUrl: './image-zoom-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageZoomViewerComponent {
  src = input('');
  alt = input('');
  minZoom = input(1, { transform: numberAttribute });
  maxZoom = input(5, { transform: numberAttribute });
  showMinimap = input(true, { transform: booleanAttribute });

  protected _scale = signal(1);
  protected _translateX = signal(0);
  protected _translateY = signal(0);
  protected _isZoomed = computed(() => this._scale() > 1);

  private _panning = false;
  private _lastX = 0;
  private _lastY = 0;

  protected _onWheel(e: WheelEvent): void {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    const next = Math.min(this.maxZoom(), Math.max(this.minZoom(), this._scale() + delta));
    if (next === this.minZoom()) { this._translateX.set(0); this._translateY.set(0); }
    this._scale.set(next);
  }

  protected _onMouseDown(e: MouseEvent): void {
    if (this._scale() <= 1) return;
    this._panning = true;
    this._lastX = e.clientX;
    this._lastY = e.clientY;
  }

  protected _onMouseMove(e: MouseEvent): void {
    if (!this._panning) return;
    this._translateX.set(this._translateX() + e.clientX - this._lastX);
    this._translateY.set(this._translateY() + e.clientY - this._lastY);
    this._lastX = e.clientX;
    this._lastY = e.clientY;
  }

  protected _onMouseUp(): void { this._panning = false; }

  protected _onTouchStart(e: TouchEvent): void {
    if (e.touches.length === 1 && this._scale() > 1) {
      this._panning = true;
      this._lastX = e.touches[0].clientX;
      this._lastY = e.touches[0].clientY;
    }
  }

  protected _onTouchMove(e: TouchEvent): void {
    if (e.touches.length === 2) {
      e.preventDefault();
    } else if (this._panning && e.touches.length === 1) {
      this._translateX.set(this._translateX() + e.touches[0].clientX - this._lastX);
      this._translateY.set(this._translateY() + e.touches[0].clientY - this._lastY);
      this._lastX = e.touches[0].clientX;
      this._lastY = e.touches[0].clientY;
    }
  }

  protected _onTouchEnd(): void { this._panning = false; }

  protected _reset(): void {
    this._scale.set(1);
    this._translateX.set(0);
    this._translateY.set(0);
  }

  protected _imgStyle = computed(() =>
    `transform: translate(${this._translateX()}px, ${this._translateY()}px) scale(${this._scale()}); cursor: ${this._scale() > 1 ? 'grab' : 'zoom-in'}`
  );

  protected _scaleLabel = computed(() => (this._scale() * 100).toFixed(0));

  protected _zoomIn(): void { this._scale.set(Math.min(this.maxZoom(), this._scale() + 0.5)); }
  protected _zoomOut(): void {
    const next = Math.max(this.minZoom(), this._scale() - 0.5);
    if (next === this.minZoom()) { this._translateX.set(0); this._translateY.set(0); }
    this._scale.set(next);
  }

  protected _minimapStyle = computed(() => {
    const pct = 100 / this._scale();
    const x = (-this._translateX() / this._scale()) / 4;
    const y = (-this._translateY() / this._scale()) / 4;
    return `width:${pct}%; height:${pct}%; transform: translate(${x}px, ${y}px)`;
  });
}
