import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SIDEBAR_NAVIGATION, SIDEBAR_NAVIGATION_GROUP } from '../types';
import { SidebarNavStore } from '../sidebar.store';
import { SidebarNavItemComponent } from './sidebar-nav-item.component';

describe('SidebarNavItemComponent', () => {
  let component: SidebarNavItemComponent;
  let fixture: ComponentFixture<SidebarNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavItemComponent],
      providers: [
        SidebarNavStore,
        { provide: SIDEBAR_NAVIGATION, useValue: {} },
        { provide: SIDEBAR_NAVIGATION_GROUP, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
