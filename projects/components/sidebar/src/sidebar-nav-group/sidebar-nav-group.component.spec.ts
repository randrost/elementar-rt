import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { SIDEBAR_NAVIGATION, SIDEBAR_NAVIGATION_GROUP } from '../types';
import { SidebarNavStore } from '../sidebar.store';
import { SidebarNavGroupComponent } from './sidebar-nav-group.component';
import { SidebarNavGroupToggleComponent } from '../sidebar-nav-group-toggle/sidebar-nav-group-toggle.component';
import { SidebarNavGroupMenuComponent } from '../sidebar-nav-group-menu/sidebar-nav-group-menu.component';

const navigationStub = { itemClicked: new Subject<void>() };
const groupStub = { _groupId: 'group-1' };

// The group requires a toggle and a menu as projected content children.
@Component({
  standalone: true,
  imports: [SidebarNavGroupComponent, SidebarNavGroupToggleComponent, SidebarNavGroupMenuComponent],
  template: `
    <emr-sidebar-nav-group>
      <emr-sidebar-nav-group-toggle>Toggle</emr-sidebar-nav-group-toggle>
      <emr-sidebar-nav-group-menu></emr-sidebar-nav-group-menu>
    </emr-sidebar-nav-group>
  `,
})
class HostComponent {
  @ViewChild(SidebarNavGroupComponent) group!: SidebarNavGroupComponent;
}

describe('SidebarNavGroupComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        SidebarNavStore,
        { provide: SIDEBAR_NAVIGATION, useValue: navigationStub },
        { provide: SIDEBAR_NAVIGATION_GROUP, useValue: groupStub },
      ],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance.group).toBeTruthy();
  });
});
