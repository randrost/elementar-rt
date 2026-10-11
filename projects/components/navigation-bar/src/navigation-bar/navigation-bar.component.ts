import { booleanAttribute, ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'emr-navigation-bar',
  exportAs: 'emrNavigationBar',
  template: '<ng-content/>',
  styleUrl: './navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-navigation-bar',
    'role': 'navigation',
    '[class.is-wide]': 'wide()'
  }
})
export class NavigationBarComponent {
  /** Key of the active item. Updated when the user activates an item. */
  activeKey = model<unknown>();

  /**
   * Horizontal item layout (icon next to label) for medium and larger windows.
   * By default items are stacked (icon above label) for compact windows.
   */
  wide = input(false, { transform: booleanAttribute });

  isActive(key: unknown): boolean {
    return key !== undefined && key === this.activeKey();
  }

  activate(key: unknown): void {
    this.activeKey.set(key);
  }
}
