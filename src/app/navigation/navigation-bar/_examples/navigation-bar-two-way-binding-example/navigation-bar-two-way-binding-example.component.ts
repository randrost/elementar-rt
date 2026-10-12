import { Component, signal } from '@angular/core';
import { NavigationBarComponent, NavigationBarItemComponent, NavigationBarItemIconDirective } from '@elementar-rt/components/navigation-bar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-navigation-bar-two-way-binding-example',
  imports: [
    NavigationBarComponent,
    NavigationBarItemComponent,
    NavigationBarItemIconDirective,
    MatIcon,
    MatButton
  ],
  templateUrl: './navigation-bar-two-way-binding-example.component.html',
  styleUrl: './navigation-bar-two-way-binding-example.component.scss'
})
export class NavigationBarTwoWayBindingExampleComponent {
  activeKey = signal<string>('photos');
}
