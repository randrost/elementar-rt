import { Component, OnInit, OnDestroy, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { TourStep } from './guided-tour.service';

@Component({
  selector: 'emr-guided-tour-overlay',
  standalone: true,
  template: `
    <div class="tour-backdrop" (click)="skip()"></div>
    <div class="tour-cutout" [style]="_cutoutStyle()"></div>
    <div class="tour-tooltip" [style]="_tooltipStyle()">
      <div class="tour-step-count">Step {{ _current() + 1 }} of {{ steps.length }}</div>
      <div class="tour-title">{{ _step()?.title }}</div>
      <div class="tour-description">{{ _step()?.description }}</div>
      <div class="tour-actions">
        <button type="button" class="tour-btn tour-btn--skip" (click)="skip()">Skip</button>
        <div class="tour-nav">
          @if (_current() > 0) {
            <button type="button" class="tour-btn" (click)="prev()">Back</button>
          }
          @if (_current() < steps.length - 1) {
            <button type="button" class="tour-btn tour-btn--primary" (click)="next()">Next</button>
          } @else {
            <button type="button" class="tour-btn tour-btn--primary" (click)="complete()">Done</button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    @reference 'tailwindcss';

    :host { position: fixed; inset: 0; z-index: 9999; pointer-events: none; }

    .tour-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.5);
      pointer-events: all;
    }

    .tour-cutout {
      position: fixed;
      border-radius: theme(--radius-lg);
      box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
      pointer-events: none;
      transition: all 200ms ease;
    }

    .tour-tooltip {
      position: fixed;
      background: var(--color-surface-container-high);
      border: 1px solid var(--color-outline-variant);
      border-radius: theme(--radius-xl);
      padding: --spacing(5);
      width: --spacing(80);
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      pointer-events: all;
      transition: all 200ms ease;
    }

    .tour-step-count {
      font-size: theme(--text-xs);
      color: var(--color-primary);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: --spacing(2);
    }

    .tour-title {
      font-size: theme(--text-base);
      font-weight: 700;
      margin-bottom: --spacing(2);
      color: var(--color-on-surface);
    }

    .tour-description {
      font-size: theme(--text-sm);
      color: var(--color-on-surface-variant);
      line-height: 1.5;
      margin-bottom: --spacing(4);
    }

    .tour-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tour-nav { display: flex; gap: --spacing(2); }

    .tour-btn {
      font-size: theme(--text-sm);
      font-weight: 500;
      padding: --spacing(2) --spacing(3);
      border-radius: theme(--radius-lg);
      border: 1px solid var(--color-outline-variant);
      background: transparent;
      cursor: pointer;
      color: var(--color-on-surface);
      &:hover { background: var(--color-surface-container); }

      &--skip { color: var(--color-on-surface-variant); border-color: transparent; }
      &--primary { background: var(--color-primary); color: var(--color-on-primary); border-color: transparent; &:hover { opacity: 0.9; } }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidedTourOverlayComponent implements OnInit, OnDestroy {
  steps: TourStep[] = [];

  tourComplete = output<void>();
  tourSkipped = output<void>();

  protected _current = signal(0);
  protected _cutoutStyle = signal('');
  protected _tooltipStyle = signal('');
  protected _step = signal<TourStep | null>(null);

  private _raf: number | null = null;

  ngOnInit(): void { this._updatePositions(); }
  ngOnDestroy(): void { if (this._raf) cancelAnimationFrame(this._raf); }

  protected next(): void {
    if (this._current() < this.steps.length - 1) {
      this._current.set(this._current() + 1);
      this._updatePositions();
    }
  }

  protected prev(): void {
    if (this._current() > 0) {
      this._current.set(this._current() - 1);
      this._updatePositions();
    }
  }

  protected complete(): void { this.tourComplete.emit(); }
  protected skip(): void { this.tourSkipped.emit(); }

  private _updatePositions(): void {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(() => {
      const step = this.steps[this._current()];
      this._step.set(step);
      if (!step) return;

      const target = document.querySelector(step.target);
      if (!target) { this._cutoutStyle.set('display:none'); return; }

      const rect = target.getBoundingClientRect();
      const pad = 8;

      this._cutoutStyle.set(
        `top:${rect.top - pad}px; left:${rect.left - pad}px; width:${rect.width + pad * 2}px; height:${rect.height + pad * 2}px;`
      );

      const tooltipW = 320;
      const tooltipH = 200;
      let top = rect.bottom + pad + 12;
      let left = rect.left;
      if (left + tooltipW > window.innerWidth) left = window.innerWidth - tooltipW - 16;
      if (top + tooltipH > window.innerHeight) top = rect.top - tooltipH - 12;

      this._tooltipStyle.set(`top:${top}px; left:${left}px;`);
    });
  }
}
