import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'emr-context-menu-separator',
  template: '',
  styles: `
    @reference 'tailwindcss';

    :host {
      display: block;
      height: 1px;
      margin: --spacing(1) --spacing(2);
      background: var(--emr-context-menu-divider);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-context-menu-separator',
    'role': 'separator'
  }
})
export class ContextMenuSeparatorComponent {
}
