import { Component } from '@angular/core';
import {
  LayoutBodyComponent,
  LayoutComponent, LayoutFooterComponent,
  LayoutHeaderComponent,
  LayoutSidebarComponent, LayoutTopbarComponent
} from '@elementar-rt/components/layout';
import { AnnouncementComponent } from '@elementar-rt/components/announcement';

@Component({
  selector: 'app-layout-with-nested-layouts-example',
  imports: [
    LayoutBodyComponent,
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutSidebarComponent,
    LayoutFooterComponent,
    LayoutTopbarComponent,
    AnnouncementComponent
  ],
  templateUrl: './layout-with-nested-layouts-example.component.html',
  styleUrl: './layout-with-nested-layouts-example.component.scss'
})
export class LayoutWithNestedLayoutsExampleComponent {

}
