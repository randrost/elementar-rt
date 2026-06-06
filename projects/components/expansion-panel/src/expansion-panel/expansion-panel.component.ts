import { booleanAttribute, Component, input, model, output } from '@angular/core';

@Component({
  selector: 'emr-expansion-panel',
  exportAs: 'emrExpansionPanel',
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
  host: {
    'class': 'emr-expansion-panel',
    '[class.is-expanded]': 'expanded()',
    '[class.is-disabled]': 'disabled()',
  }
})
export class ExpansionPanelComponent {
  expanded = model(false);
  disabled = input(false, { transform: booleanAttribute });

  readonly expandedChange = output<boolean>();

  protected _toggle() {
    if (this.disabled()) return;
    const next = !this.expanded();
    this.expanded.set(next);
    this.expandedChange.emit(next);
  }
}
