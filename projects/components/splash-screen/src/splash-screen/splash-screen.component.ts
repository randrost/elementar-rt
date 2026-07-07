import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  Renderer2
} from '@angular/core';
import { getState } from '@ngrx/signals';
import { SplashScreenState, SplashScreenStore } from '../splash-screen.store';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'emr-splash-screen',
  exportAs: 'emrSplashScreen',
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
  host: {
    'class': 'emr-splash-screen',
  }
})
export class SplashScreenComponent {
  private _store = inject(SplashScreenStore);
  private _renderer = inject(Renderer2);
  private _elementRef = inject(ElementRef);
  private _router = inject(Router);

  animationDuration = input(500, {
    transform: numberAttribute
  }); // in milliseconds
  hideDelay = input(1000, {
    transform: numberAttribute
  }); // in milliseconds

  constructor() {
    let isFirstRun = true;

    effect(() => {
      const currentState = getState<SplashScreenState>(this._store);

      // Skip only the very first invocation: the component's default styles
      // already reflect the initial state, so no imperative show/hide is
      // needed yet. Every subsequent change must still be applied, even if
      // it happens to match the original value (e.g. hide() then show()).
      if (isFirstRun) {
        isFirstRun = false;
        return;
      }

      if (currentState.visible) {
        this._show();
      } else {
        this._hide();
      }
    });

    afterNextRender(() => {
      const subscription = this._router.events
        .pipe(
          filter(event=> event instanceof NavigationEnd)
        )
        .subscribe(() => {
          subscription.unsubscribe();
          setTimeout(() => {
            this._hide();
            subscription.unsubscribe();
          }, this.hideDelay());
        })
      ;
    });
  }

  ngOnInit() {
    // Renderer2.setStyle() does not apply custom CSS properties (`--*`) in this
    // Angular version; set it directly on the element's style declaration instead.
    (this._elementRef.nativeElement as HTMLElement).style.setProperty(
      '--emr-splash-screen-hide-animation-duration', (this.animationDuration() / 1000) + 's'
    );
  }

  private _show(): void {
    const loaderEl = this._elementRef.nativeElement as HTMLElement;
    this._renderer.removeClass(loaderEl, 'hide');
    this._renderer.setStyle(loaderEl, 'visibility', 'visible');
    this._renderer.setStyle(loaderEl, 'zIndex', '9999999');
  }

  private _hide(): void {
    const loaderEl = this._elementRef.nativeElement as HTMLElement;
    this._renderer.addClass(loaderEl, 'hide');
    setTimeout(() => {
      this._renderer.setStyle(loaderEl, 'visibility', 'hidden');
      this._renderer.setStyle(loaderEl, 'zIndex', '-9999999');
    }, this.animationDuration());
  }
}
