import { booleanAttribute, Component, input, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'emr-tab',
  exportAs: 'emrTab',
  template: `
    <ng-template #content>
      <ng-content/>
    </ng-template>
  `,
})
export class TabComponent {
  label = input('');
  icon = input('');
  disabled = input(false, { transform: booleanAttribute });

  readonly contentRef = viewChild.required<TemplateRef<any>>('content');
}
