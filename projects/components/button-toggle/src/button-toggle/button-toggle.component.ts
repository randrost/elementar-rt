import {
  Component, input, ChangeDetectionStrategy, booleanAttribute, inject, computed
} from '@angular/core';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';

@Component({
  selector: 'emr-button-toggle',
  standalone: true,
  template: `<ng-content />`,
  styles: [`
    @reference 'tailwindcss';

    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: --spacing(1.5);
      font-size: theme(--text-sm);
      font-weight: 500;
      padding: --spacing(1.5) --spacing(3);
      cursor: pointer;
      user-select: none;
      color: var(--color-on-surface-variant);
      border-right: 1px solid var(--color-outline-variant);
      transition: background 150ms ease, color 150ms ease;

      &:last-child { border-right: none; }
      &:hover { background: var(--color-surface-container-high); color: var(--color-on-surface); }

      &[data-active] {
        background: var(--color-primary-container);
        color: var(--color-on-primary-container);
      }

      &[data-disabled] { opacity: 0.5; pointer-events: none; }
      &[data-icon-only] { padding: --spacing(2); }

      :host-context(emr-button-toggle-group[data-variant="pill"]) & {
        border-radius: theme(--radius-full);
        border: none;
        &[data-active] { background: var(--color-primary); color: var(--color-on-primary); }
      }

      :host-context(emr-button-toggle-group[data-variant="segmented"]) & {
        border-radius: theme(--radius-lg);
        border: none;
        flex: 1;
        &[data-active] { background: var(--color-surface); color: var(--color-on-surface); box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-active]': '_active() || null',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-icon-only]': 'iconOnly() || null',
    'role': 'button',
    '(click)': '_onClick()',
  }
})
export class ButtonToggleComponent {
  value = input.required<unknown>();
  disabled = input(false, { transform: booleanAttribute });
  iconOnly = input(false, { transform: booleanAttribute });

  private _group = inject(ButtonToggleGroupComponent);
  protected _active = computed(() => this._group._isActive(this.value()));

  protected _onClick(): void {
    if (this.disabled()) return;
    this._group._select(this.value());
  }
}
