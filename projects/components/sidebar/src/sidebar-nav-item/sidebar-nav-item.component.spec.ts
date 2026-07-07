import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SIDEBAR_NAVIGATION } from '../types';
import { SidebarNavStore } from '../sidebar.store';
import { SidebarNavItemComponent } from './sidebar-nav-item.component';

const navigationStub = { itemClicked: new EventEmitter<any>() };

@Component({
  standalone: true,
  imports: [SidebarNavItemComponent],
  template: `<div emr-sidebar-nav-item [key]="'item-1'"></div>`,
  providers: [
    SidebarNavStore,
    { provide: SIDEBAR_NAVIGATION, useValue: navigationStub },
  ],
})
class HostComponent {
  @ViewChild(SidebarNavItemComponent) item!: SidebarNavItemComponent;
}

describe('SidebarNavItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should not be active before it is clicked', () => {
    expect(fixture.componentInstance.item.active).toBe(false);
  });

  it('should mark itself active and notify the parent navigation when clicked', () => {
    const emitted: any[] = [];
    navigationStub.itemClicked.subscribe((k) => emitted.push(k));
    fixture.componentInstance.item.click(new MouseEvent('click'));
    expect(fixture.componentInstance.item.active).toBe(true);
    expect(emitted).toEqual(['item-1']);
  });

  it('should expose active state through its api', () => {
    fixture.componentInstance.item.click(new MouseEvent('click'));
    expect(fixture.componentInstance.item.api.isActive()).toBe(true);
  });
});
