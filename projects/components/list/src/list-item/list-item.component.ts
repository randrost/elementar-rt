import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'emr-list-item',
  exportAs: 'emrListItem',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  host: {
    'class': 'emr-list-item',
    'role': 'listitem',
    '[class.is-interactive]': 'interactive()',
    '[class.is-selected]': 'selected()',
    '[class.is-disabled]': 'disabled()',
  }
})
export class ListItemComponent {
  interactive = input(false, { transform: booleanAttribute });
  selected = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
}
