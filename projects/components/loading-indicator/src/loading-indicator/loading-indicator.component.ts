import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  NgZone,
  numberAttribute,
  viewChild
} from '@angular/core';
import { interpolateShape, LOADING_SHAPES, shapeToPath } from '../shapes';

/** Degrees the indicator rotates while morphing from one shape to the next. */
const STEP_ROTATION = 180;

/** Ease used for each morph step (y-only cubic bezier, matches the M3 motion). */
const ease = (t: number): number => {
  const y1 = 0.18;
  const y2 = 0.95;
  const u = 1 - t;
  return 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t;
};

/** Scale curve for a step: grows to 1.14 at 80% of the step, then settles back to 1. */
const scaleAt = (progress: number): number =>
  progress < 0.8 ? 1 + 0.14 * (progress / 0.8) : 1.14 - 0.14 * ((progress - 0.8) / 0.2);

@Component({
  selector: 'emr-loading-indicator',
  exportAs: 'emrLoadingIndicator',
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-loading-indicator',
    'role': 'progressbar',
    '[attr.aria-label]': 'ariaLabel()',
    '[class.is-contained]': 'contained()'
  }
})
export class LoadingIndicatorComponent {
  private _zone = inject(NgZone);

  /** Draws the indicator on a filled circular container. */
  contained = input(false, { transform: booleanAttribute });

  /** Duration of a single shape-to-shape morph, in milliseconds. */
  duration = input(680, { transform: numberAttribute });

  ariaLabel = input('Loading', { alias: 'aria-label' });

  protected readonly _initialPath = shapeToPath(LOADING_SHAPES[0]);

  private _svg = viewChild.required<ElementRef<SVGSVGElement>>('svg');
  private _path = viewChild.required<ElementRef<SVGPathElement>>('path');

  private _frameId: number | null = null;

  constructor() {
    afterNextRender(() => {
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      this._zone.runOutsideAngular(() => this._start(!!reducedMotion));
    });

    inject(DestroyRef).onDestroy(() => {
      if (this._frameId !== null) {
        cancelAnimationFrame(this._frameId);
      }
    });
  }

  private _start(reducedMotion: boolean): void {
    let index = 0;
    let baseRotation = 0;
    let stepStart: number | null = null;

    const frame = (time: number) => {
      stepStart ??= time;
      const duration = Math.max(this.duration(), 1);
      const raw = Math.min((time - stepStart) / duration, 1);

      if (reducedMotion) {
        // Keep a single shape and only rotate slowly.
        this._svg().nativeElement.style.transform = `rotate(${baseRotation + 90 * raw}deg)`;
      } else {
        const progress = ease(raw);
        const from = LOADING_SHAPES[index];
        const to = LOADING_SHAPES[(index + 1) % LOADING_SHAPES.length];
        this._path().nativeElement.setAttribute('d', shapeToPath(interpolateShape(from, to, progress)));
        this._svg().nativeElement.style.transform =
          `rotate(${baseRotation + STEP_ROTATION * progress}deg) scale(${scaleAt(progress)})`;
      }

      if (raw >= 1) {
        index = (index + 1) % LOADING_SHAPES.length;
        baseRotation = (baseRotation + (reducedMotion ? 90 : STEP_ROTATION)) % 360;
        stepStart = time;
      }

      this._frameId = requestAnimationFrame(frame);
    };

    this._frameId = requestAnimationFrame(frame);
  }
}
