import { Directive } from '@angular/core';

/** Marks a badge rendered on top of the icon of an `emr-navigation-bar-item`. */
@Directive({
  selector: '[emrNavigationBarItemBadge]',
  host: {
    'class': 'emr-navigation-bar-item-badge'
  }
})
export class NavigationBarItemBadgeDirective {
}
