import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@app/sidebar/sidebar.component';
import {
  LayoutBodyComponent,
  LayoutComponent,
  LayoutSidebarComponent,
  LayoutTopbarComponent,
} from '@elementar-rt/components/layout';
import { AnnouncementGlobalComponent } from '@elementar-rt/components/announcement';
import { IncidentsContainerComponent } from '@elementar-rt/components/incidents';

@Component({
  imports: [
    RouterOutlet,
    SidebarComponent,
    LayoutComponent,
    LayoutBodyComponent,
    LayoutSidebarComponent,
    LayoutTopbarComponent,
    IncidentsContainerComponent,
    AnnouncementGlobalComponent
  ],
  templateUrl: './common.component.html'
})
export class CommonComponent {
}
