import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'emr-list',
  exportAs: 'emrList',
  template: `<ng-content/>`,
  styleUrl: './list.component.scss',
  host: {
    'class': 'emr-list',
    'role': 'list',
    '[class.is-dense]': 'dense()',
    '[class.is-divided]': 'divided()',
  }
})
export class ListComponent {
  dense = input(false, { transform: booleanAttribute });
  divided = input(false, { transform: booleanAttribute });
}
