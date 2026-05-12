import { Component } from '@angular/core';
import { DrawerComponent } from '@elementar-rt/components/drawer';
import { MatButton } from '@angular/material/button';
import {
  PanelBodyComponent,
  PanelComponent,
  PanelFooterComponent,
  PanelHeaderComponent
} from '@elementar-rt/components/panel';

@Component({
  selector: 'app-drawer-without-backdrop-example',
  imports: [
    DrawerComponent,
    MatButton,
    PanelBodyComponent,
    PanelComponent,
    PanelFooterComponent,
    PanelHeaderComponent
  ],
  templateUrl: './drawer-without-backdrop-example.component.html',
  styleUrl: './drawer-without-backdrop-example.component.scss'
})
export class DrawerWithoutBackdropExampleComponent {

}
