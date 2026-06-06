import { booleanAttribute, Component, input, output } from '@angular/core';

@Component({
  selector: 'emr-menu',
  exportAs: 'emrMenu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  host: {
    'class': 'emr-menu',
    'role': 'menu',
    '[class.is-open]': 'open()',
  }
})
export class MenuComponent {
  open = input(false, { transform: booleanAttribute });
  readonly closed = output<void>();
}
