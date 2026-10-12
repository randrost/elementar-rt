import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'emr-navigation-bar-item,[emr-navigation-bar-item]',
  exportAs: 'emrNavigationBarItem',
  templateUrl: './navigation-bar-item.component.html',
  styleUrl: './navigation-bar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-navigation-bar-item',
    '[class.is-active]': 'isActive()',
    '[attr.aria-current]': 'isActive() ? "page" : null',
    '(click)': '_activate()'
  }
})
export class NavigationBarItemComponent {
  private _bar = inject(NavigationBarComponent);

  /** Identifies the item within its navigation bar. */
  key = input<unknown>();

  /**
   * Explicitly marks the item as active, e.g. from `routerLinkActive`.
   * When not set, the item is active if its `key` matches the bar's `activeKey`.
   */
  active = input<boolean | undefined>(undefined);

  /** Emits when the item is activated by the user. */
  activated = output<void>();

  readonly isActive = computed(() => {
    const active = this.active();
    return active ?? this._bar.isActive(this.key());
  });

  protected _activate(): void {
    if (this.key() !== undefined) {
      this._bar.activate(this.key());
    }
    this.activated.emit();
  }
}
