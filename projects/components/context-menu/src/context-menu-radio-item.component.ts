import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkMenuItemRadio } from '@angular/cdk/menu';
import { ContextMenuGroupComponent } from './context-menu-group.component';

/**
 * Radio item. Place radio items inside an `emr-context-menu-group` and bind the
 * group's `value` to know which one is selected.
 */
@Component({
  selector: '[emr-context-menu-radio-item]',
  exportAs: 'emrContextMenuRadioItem',
  template: `
    <span class="indicator">
      @if (isChecked()) {
        <svg viewBox="0 0 24 24" width="40%" height="40%" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="12"/>
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
      directive: CdkMenuItemRadio,
      inputs: ['cdkMenuItemDisabled: disabled'],
      outputs: ['cdkMenuItemTriggered: triggered']
    }
  ],
  host: {
    'class': 'emr-context-menu-radio-item is-inset',
    '[class.is-checked]': 'isChecked()'
  }
})
export class ContextMenuRadioItemComponent {
  private _cdkItem = inject(CdkMenuItemRadio, { self: true });
  private _group = inject(ContextMenuGroupComponent, { optional: true });

  /** Value written to the parent group's `value` when the item is selected. */
  value = input<unknown>();

  /** Checked state for radio items used without a valued group. */
  checked = input(false);

  readonly isChecked = computed(() => {
    const groupValue = this._group?.value();
    return groupValue !== undefined ? groupValue === this.value() : this.checked();
  });

  constructor() {
    effect(() => {
      this._cdkItem.checked = this.isChecked();
    });

    this._cdkItem.triggered
      .pipe(takeUntilDestroyed())
      .subscribe(() => this._group?.value.set(this.value()));
  }
}
