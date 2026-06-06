import {
  booleanAttribute,
  Component,
  contentChildren,
  input,
  model,
  output
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TabComponent } from '../tab/tab.component';

export type TabsVariant = 'default' | 'pills' | 'underline';

@Component({
  selector: 'emr-tabs',
  exportAs: 'emrTabs',
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  host: {
    'class': 'emr-tabs',
    '[attr.data-variant]': 'variant()',
    '[class.is-scrollable]': 'scrollable()',
  }
})
export class TabsComponent {
  activeIndex = model(0);
  variant = input<TabsVariant>('default');
  scrollable = input(false, { transform: booleanAttribute });

  readonly tabChange = output<number>();

  protected readonly _tabs = contentChildren(TabComponent);

  protected _select(index: number) {
    if (this._tabs()[index]?.disabled()) return;
    this.activeIndex.set(index);
    this.tabChange.emit(index);
  }
}
