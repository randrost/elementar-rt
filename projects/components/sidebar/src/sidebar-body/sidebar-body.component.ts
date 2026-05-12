import { Component } from '@angular/core';
import { OverlayScrollbarComponent } from '@elementar-rt/components/overlay-scrollbar';

@Component({
  selector: 'emr-sidebar-body',
  exportAs: 'emrSidebarBody',
  templateUrl: './sidebar-body.component.html',
  styleUrl: './sidebar-body.component.scss',
  imports: [
    OverlayScrollbarComponent
  ],
  host: {
    'class': 'emr-sidebar-body'
  }
})
export class SidebarBodyComponent {

}
