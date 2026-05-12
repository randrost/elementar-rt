import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import {
  TabPanelAsideComponent,
  TabPanelAsideContentDirective, TabPanelBodyComponent, TabPanelComponent,
  TabPanelCustomItemComponent, TabPanelFooterComponent, TabPanelHeaderComponent,
  TabPanelItemComponent,
  TabPanelItemIconDirective, TabPanelNavComponent
} from '@elementar-rt/components/tab-panel';
import { IconComponent } from '@elementar-rt/components/icon';
import { HorizontalDividerComponent } from '@elementar-rt/components/divider';
import { AvatarComponent } from '@elementar-rt/components/avatar';

@Component({
  selector: 'app-tab-panel-compact-example',
  imports: [
    IconComponent,
    MatTooltip,
    HorizontalDividerComponent,
    AvatarComponent,
    TabPanelItemIconDirective,
    TabPanelItemComponent,
    TabPanelCustomItemComponent,
    TabPanelAsideContentDirective,
    TabPanelAsideComponent,
    TabPanelNavComponent,
    TabPanelFooterComponent,
    TabPanelBodyComponent,
    TabPanelHeaderComponent,
    TabPanelComponent
  ],
  templateUrl: './tab-panel-compact-example.component.html',
  styleUrl: './tab-panel-compact-example.component.scss'
})
export class TabPanelCompactExampleComponent {

}
