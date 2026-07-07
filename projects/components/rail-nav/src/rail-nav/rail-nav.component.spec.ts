import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailNavComponent } from './rail-nav.component';
import { RailNavItemComponent } from '../rail-nav-item/rail-nav-item.component';

@Component({
  standalone: true,
  imports: [RailNavComponent, RailNavItemComponent],
  template: `
    <emr-rail-nav [activeKey]="'home'">
      <emr-rail-nav-item key="home">Home</emr-rail-nav-item>
      <emr-rail-nav-item key="settings">Settings</emr-rail-nav-item>
    </emr-rail-nav>
  `,
})
class HostComponent {
  @ViewChild(RailNavComponent) railNav!: RailNavComponent;
}

describe('RailNavComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should initialize the active key from the activeKey input', () => {
    const railNav = fixture.componentInstance.railNav;
    expect(railNav.api.getActiveKey()).toBe('home');
    expect(railNav.api.isActive('home')).toBe(true);
  });

  it('should activate a different item when clicked', () => {
    const items = fixture.debugElement.queryAll(
      (de: any) => true
    );
    const railNav = fixture.componentInstance.railNav;
    const settingsItem = fixture.nativeElement.querySelectorAll('emr-rail-nav-item')[1];
    settingsItem.click();
    expect(railNav.api.getActiveKey()).toBe('settings');
    expect(railNav.api.isActive('settings')).toBe(true);
    expect(railNav.api.isActive('home')).toBe(false);
  });
});
