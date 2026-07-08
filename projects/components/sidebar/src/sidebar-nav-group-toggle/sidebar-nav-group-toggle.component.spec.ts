import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavStore } from '../sidebar.store';
import { SidebarNavGroupToggleComponent } from './sidebar-nav-group-toggle.component';

describe('SidebarNavGroupToggleComponent', () => {
  let fixture: ComponentFixture<SidebarNavGroupToggleComponent>;
  let component: SidebarNavGroupToggleComponent;
  let store: InstanceType<typeof SidebarNavStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavGroupToggleComponent],
      providers: [SidebarNavStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarNavGroupToggleComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SidebarNavStore);
    component.for.set('group-1');
    fixture.detectChanges();
  });

  it('should be inactive when its group is not the active one', () => {
    expect(component.active).toBe(false);
  });

  it('should activate its group on toggle', () => {
    component.toggle(new MouseEvent('click'));
    expect(store.isGroupActive('group-1')).toBe(true);
    expect(component.active).toBe(true);
  });

  it('should deactivate its group when toggled again', () => {
    component.toggle(new MouseEvent('click'));
    component.toggle(new MouseEvent('click'));
    expect(store.isGroupActive('group-1')).toBe(false);
  });
});
