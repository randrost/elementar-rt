import { Component, viewChild } from '@angular/core';
import { SidenavComponent, SidenavContainerComponent } from '@elementar-rt/components/sidenav';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-persistent-example',
  imports: [SidenavComponent, SidenavContainerComponent, MatButton, MatIconButton, MatIcon],
  templateUrl: './sidenav-persistent-example.component.html',
  styleUrl: './sidenav-persistent-example.component.scss'
})
export class SidenavPersistentExampleComponent {
  container = viewChild.required(SidenavContainerComponent);

  toggle(): void { this.container().toggle(); }
}
