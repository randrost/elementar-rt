import { NavigationBarItemIconDirective } from './navigation-bar-item-icon.directive';
import { NavigationBarItemBadgeDirective } from './navigation-bar-item-badge.directive';

describe('NavigationBarItemIconDirective', () => {
  it('should create an instance', () => {
    expect(new NavigationBarItemIconDirective()).toBeTruthy();
    expect(new NavigationBarItemBadgeDirective()).toBeTruthy();
  });
});
