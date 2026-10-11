import { Component } from '@angular/core';
import { NavigationBarComponent, NavigationBarItemComponent, NavigationBarItemIconDirective, NavigationBarItemBadgeDirective } from '@elementar-rt/components/navigation-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navigation-bar-badges-example',
  imports: [
    NavigationBarComponent,
    NavigationBarItemComponent,
    NavigationBarItemIconDirective,
    MatIcon,
    NavigationBarItemBadgeDirective
  ],
  templateUrl: './navigation-bar-badges-example.component.html',
  styleUrl: './navigation-bar-badges-example.component.scss'
})
export class NavigationBarBadgesExampleComponent {}
