import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationItemBadgeDirective } from './navigation-item-badge.directive';

@Component({
  imports: [NavigationItemBadgeDirective],
  template: `<span emrNavigationItemBadge>3</span>`
})
class HostComponent {}

describe('NavigationItemBadgeDirective', () => {
  it('should apply its host class', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').classList.contains('emr-navigation-item-badge')).toBe(true);
  });
});
