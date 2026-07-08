import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { SIDEBAR_NAVIGATION, SIDEBAR_NAVIGATION_GROUP } from '../types';
import { SidebarNavStore } from '../sidebar.store';
import { SidebarNavGroupMenuComponent } from './sidebar-nav-group-menu.component';

const navigationStub = { itemClicked: new Subject<void>() };
const groupStub = { _groupId: 'group-1' };

describe('SidebarNavGroupMenuComponent', () => {
  let component: SidebarNavGroupMenuComponent;
  let fixture: ComponentFixture<SidebarNavGroupMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavGroupMenuComponent],
      providers: [
        SidebarNavStore,
        { provide: SIDEBAR_NAVIGATION, useValue: navigationStub },
        { provide: SIDEBAR_NAVIGATION_GROUP, useValue: groupStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarNavGroupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
