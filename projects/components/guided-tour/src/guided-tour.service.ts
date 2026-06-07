import {
  Injectable, ApplicationRef, createComponent,
  EnvironmentInjector, inject, signal, output
} from '@angular/core';
import { GuidedTourOverlayComponent } from './guided-tour-overlay.component';

export interface TourStep {
  target: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

@Injectable({ providedIn: 'root' })
export class EmrGuidedTour {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _overlayRef: ReturnType<typeof createComponent<GuidedTourOverlayComponent>> | null = null;
  private _host: HTMLElement | null = null;

  private _storageKey(id: string) { return `emr-tour-${id}`; }

  isCompleted(id: string): boolean {
    return localStorage.getItem(this._storageKey(id)) === 'completed';
  }

  start(steps: TourStep[], tourId = ''): void {
    this._destroy();

    this._host = document.createElement('div');
    document.body.appendChild(this._host);

    this._overlayRef = createComponent(GuidedTourOverlayComponent, {
      environmentInjector: this._injector,
      hostElement: this._host,
    });

    const instance = this._overlayRef.instance;
    instance.steps = steps;

    const completeCb = () => {
      if (tourId) localStorage.setItem(this._storageKey(tourId), 'completed');
      this._destroy();
    };
    const skipCb = () => { this._destroy(); };

    instance.tourComplete.subscribe(completeCb);
    instance.tourSkipped.subscribe(skipCb);

    this._appRef.attachView(this._overlayRef.hostView);
    this._overlayRef.changeDetectorRef.detectChanges();
  }

  stop(): void { this._destroy(); }

  private _destroy(): void {
    if (this._overlayRef) {
      this._overlayRef.destroy();
      this._overlayRef = null;
    }
    if (this._host) {
      this._host.remove();
      this._host = null;
    }
  }
}
