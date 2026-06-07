import {
  Component, input, output, signal, computed,
  ChangeDetectionStrategy, booleanAttribute, numberAttribute,
  inject, PLATFORM_ID, OnInit, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type SidenavMode = 'side' | 'push' | 'overlay';

@Component({
  selector: 'emr-sidenav',
  standalone: true,
  template: `
    <div class="sidenav-inner">
      <ng-content />
    </div>
  `,
  styles: [`
    @reference 'tailwindcss';

    :host {
      display: block;
      width: var(--emr-sidenav-width, --spacing(64));
      height: 100%;
      background: var(--color-surface-container-low);
      border-right: 1px solid var(--color-outline-variant);
      flex-shrink: 0;
      transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1),
                  transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .sidenav-inner {
      width: var(--emr-sidenav-width, --spacing(64));
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  width = input('256px');
}

@Component({
  selector: 'emr-sidenav-container',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './sidenav-container.component.html',
  styleUrl: './sidenav-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-mode]': '_effectiveMode()',
    '[attr.data-open]': '_open() || null',
  }
})
export class SidenavContainerComponent implements OnInit, OnDestroy {
  mode = input<SidenavMode>('side');
  opened = input(true, { transform: booleanAttribute });
  autoOpenBreakpoint = input(1024, { transform: numberAttribute });

  openedChange = output<boolean>();

  protected _open = signal(true);
  private _platformId = inject(PLATFORM_ID);
  private _mq: MediaQueryList | null = null;
  private _mqListener: ((e: MediaQueryListEvent) => void) | null = null;

  ngOnInit(): void {
    this._open.set(this.opened());
    if (isPlatformBrowser(this._platformId) && this.autoOpenBreakpoint() > 0) {
      this._mq = window.matchMedia(`(min-width: ${this.autoOpenBreakpoint()}px)`);
      this._mqListener = (e: MediaQueryListEvent) => {
        this._open.set(e.matches);
        this.openedChange.emit(e.matches);
      };
      this._mq.addEventListener('change', this._mqListener);
      this._open.set(this._mq.matches);
    }
  }

  ngOnDestroy(): void {
    if (this._mq && this._mqListener) {
      this._mq.removeEventListener('change', this._mqListener);
    }
  }

  protected _effectiveMode = computed(() => this.mode());

  open(): void { this._open.set(true); this.openedChange.emit(true); }
  close(): void { this._open.set(false); this.openedChange.emit(false); }
  toggle(): void { this._open() ? this.close() : this.open(); }

  protected _onBackdropClick(): void {
    if (this.mode() === 'overlay') this.close();
  }
}
