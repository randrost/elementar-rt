import { Component } from '@angular/core';
import { NavigationBarComponent, NavigationBarItemComponent, NavigationBarItemIconDirective } from '@elementar-rt/components/navigation-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-basic-navigation-bar-example',
  imports: [
    NavigationBarComponent,
    NavigationBarItemComponent,
    NavigationBarItemIconDirective,
    MatIcon
  ],
  templateUrl: './basic-navigation-bar-example.component.html',
  styleUrl: './basic-navigation-bar-example.component.scss'
})
export class BasicNavigationBarExampleComponent {}
