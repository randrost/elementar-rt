import { ChangeDetectionStrategy, Component, effect, inject, model } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkMenuItemCheckbox } from '@angular/cdk/menu';

@Component({
  selector: '[emr-context-menu-checkbox-item]',
  exportAs: 'emrContextMenuCheckboxItem',
  template: `
    <span class="indicator">
      @if (checked()) {
        <svg viewBox="0 -960 960 960" width="100%" height="100%" fill="currentColor" aria-hidden="true">
          <path d="M382-354.15 716.85-689q11.07-11.08 25.65-11.08 14.58 0 25.65 11.08 11.08 11.08 11.08 25.65 0 14.58-11.08 25.66l-360 360.38Q395.08-264.23 382-264.23q-13.08 0-26.15-13.08L193.46-439.69q-11.08-11.08-10.69-25.66.38-14.57 11.46-25.65 11.07-11.08 25.65-11.08 14.58 0 25.66 11.08L382-354.15Z"/>
        </svg>
      }
    </span>
    <span class="label"><ng-content/></span>
    <ng-content select="[emrContextMenuShortcut]"/>
  `,
  styleUrls: ['./context-menu-item.scss', './context-menu-selectable-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: CdkMenuItemCheckbox,
      inputs: ['cdkMenuItemDisabled: disabled'],
      outputs: ['cdkMenuItemTriggered: triggered']
    }
  ],
  host: {
    'class': 'emr-context-menu-checkbox-item is-inset',
    '[class.is-checked]': 'checked()'
  }
})
export class ContextMenuCheckboxItemComponent {
  private _cdkItem = inject(CdkMenuItemCheckbox, { self: true });

  /** Whether the item is checked. Supports two-way binding with `[(checked)]`. */
  checked = model(false);

  constructor() {
    effect(() => {
      this._cdkItem.checked = this.checked();
    });

    // `triggered` fires before CdkMenuItemCheckbox flips its own state.
    this._cdkItem.triggered
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.checked.set(!this.checked()));
  }
}
