import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'emr-toolbar',
  exportAs: 'emrToolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  host: {
    'class': 'emr-toolbar',
    '[class.is-dense]': 'dense()',
    '[class.is-sticky]': 'sticky()',
  }
})
export class ToolbarComponent {
  dense = input(false, { transform: booleanAttribute });
  sticky = input(false, { transform: booleanAttribute });
}
