import { Directive } from '@angular/core';

/** Marks the icon of an `emr-navigation-bar-item`. */
@Directive({
  selector: '[emrNavigationBarItemIcon]',
  host: {
    'class': 'emr-navigation-bar-item-icon'
  }
})
export class NavigationBarItemIconDirective {
}
