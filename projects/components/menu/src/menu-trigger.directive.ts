import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { MenuComponent } from './menu/menu.component';

@Directive({
  selector: '[emrMenuTrigger]',
  exportAs: 'emrMenuTrigger',
  host: {
    '(click)': '_toggle()',
  }
})
export class MenuTriggerDirective implements OnInit {
  emrMenuTrigger = input.required<MenuComponent>();

  private _el = inject(ElementRef<HTMLElement>);
  private _destroyRef = inject(DestroyRef);
  readonly isOpen = signal(false);

  ngOnInit() {
    fromEvent<MouseEvent>(document, 'click')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(event => {
        if (!this._el.nativeElement.contains(event.target as Node)) {
          this._close();
        }
      });
  }

  protected _toggle() {
    this.isOpen() ? this._close() : this._open();
  }

  private _open() {
    this.isOpen.set(true);
  }

  private _close() {
    this.isOpen.set(false);
  }
}
