import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { NavigationGroupComponent } from '../navigation-group/navigation-group.component';
import { NavigationGroupMenuComponent } from './navigation-group-menu.component';
import { NavigationStore } from '../navigation.store';

@Component({
  imports: [NavigationComponent, NavigationItemComponent, NavigationGroupComponent, NavigationGroupMenuComponent],
  template: `
    <emr-navigation [activeKey]="activeKey">
      <emr-navigation-group>
        <emr-navigation-group-menu>
          <emr-navigation-item key="profile">Profile</emr-navigation-item>
        </emr-navigation-group-menu>
      </emr-navigation-group>
    </emr-navigation>
  `
})
class HostComponent {
  activeKey: any = 'profile';
}

describe('NavigationGroupMenuComponent', () => {
  it('should mark the group active when it contains the currently active item', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const store = fixture.debugElement.children[0].injector.get(NavigationStore);
    const groupMenu = fixture.nativeElement.querySelector('emr-navigation-group-menu');
    const group = fixture.debugElement.query(By.directive(NavigationGroupComponent)).componentInstance as NavigationGroupComponent;

    expect(store.activeGroupKey()).toBe(group.key());
    expect(groupMenu.classList.contains('is-active')).toBe(true);
  });
});

@Component({
  imports: [NavigationComponent, NavigationItemComponent, NavigationGroupComponent, NavigationGroupMenuComponent],
  template: `
    <emr-navigation>
      <emr-navigation-group>
        <emr-navigation-group-menu>
          <emr-navigation-item key="a">A</emr-navigation-item>
        </emr-navigation-group-menu>
      </emr-navigation-group>
    </emr-navigation>
  `
})
class NoActiveItemHostComponent {}

describe('NavigationGroupMenuComponent (no active item in group)', () => {
  it('should still mark the group active on init even without a matching active item', async () => {
    // Documents the component's current ngAfterContentInit behavior: when a
    // group has no active item, it unconditionally becomes the active group
    // (rather than staying inactive) since the store starts with no active
    // group key. This may be worth revisiting, but the test pins current behavior.
    await TestBed.configureTestingModule({ imports: [NoActiveItemHostComponent] }).compileComponents();
    const fixture: ComponentFixture<NoActiveItemHostComponent> = TestBed.createComponent(NoActiveItemHostComponent);
    fixture.detectChanges();

    const store = fixture.debugElement.children[0].injector.get(NavigationStore);
    const group = fixture.debugElement.query(By.directive(NavigationGroupComponent)).componentInstance as NavigationGroupComponent;

    expect(store.activeGroupKey()).toBe(group.key());
  });
});
