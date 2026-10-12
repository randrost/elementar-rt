import { Component } from '@angular/core';
import { NavigationBarComponent, NavigationBarItemComponent, NavigationBarItemIconDirective } from '@elementar-rt/components/navigation-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-wide-navigation-bar-example',
  imports: [
    NavigationBarComponent,
    NavigationBarItemComponent,
    NavigationBarItemIconDirective,
    MatIcon
  ],
  templateUrl: './wide-navigation-bar-example.component.html',
  styleUrl: './wide-navigation-bar-example.component.scss'
})
export class WideNavigationBarExampleComponent {}
