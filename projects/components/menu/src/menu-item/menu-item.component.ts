import { booleanAttribute, Component, input, output } from '@angular/core';

@Component({
  selector: 'emr-menu-item',
  exportAs: 'emrMenuItem',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  host: {
    'class': 'emr-menu-item',
    'role': 'menuitem',
    '[class.is-disabled]': 'disabled()',
    '[class.is-danger]': 'danger()',
    '(click)': '_onClick()',
  }
})
export class MenuItemComponent {
  disabled = input(false, { transform: booleanAttribute });
  danger = input(false, { transform: booleanAttribute });

  readonly itemClick = output<void>();

  protected _onClick() {
    if (!this.disabled()) this.itemClick.emit();
  }
}
