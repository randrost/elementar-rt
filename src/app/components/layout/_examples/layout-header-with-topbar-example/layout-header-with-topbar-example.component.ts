import { Component } from '@angular/core';
import {
  LayoutBodyComponent,
  LayoutComponent,
  LayoutHeaderComponent,
  LayoutTopbarComponent
} from '@elementar-rt/components/layout';
import { AnnouncementComponent } from '@elementar-rt/components/announcement';

@Component({
  selector: 'app-layout-header-with-topbar-example',
  imports: [
    LayoutBodyComponent,
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutTopbarComponent,
    AnnouncementComponent
  ],
  templateUrl: './layout-header-with-topbar-example.component.html',
  styleUrl: './layout-header-with-topbar-example.component.scss'
})
export class LayoutHeaderWithTopbarExampleComponent {

}
