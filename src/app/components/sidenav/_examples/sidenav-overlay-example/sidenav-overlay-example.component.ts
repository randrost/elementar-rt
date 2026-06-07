import { Component, viewChild } from '@angular/core';
import { SidenavComponent, SidenavContainerComponent } from '@elementar-rt/components/sidenav';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-overlay-example',
  imports: [SidenavComponent, SidenavContainerComponent, MatButton, MatIconButton, MatIcon],
  templateUrl: './sidenav-overlay-example.component.html',
  styleUrl: './sidenav-overlay-example.component.scss'
})
export class SidenavOverlayExampleComponent {
  container = viewChild.required(SidenavContainerComponent);

  open(): void { this.container().open(); }
}
