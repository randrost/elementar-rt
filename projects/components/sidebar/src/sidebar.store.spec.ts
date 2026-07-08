import { TestBed } from '@angular/core/testing';

import { SidebarNavStore } from './sidebar.store';

describe('SidebarNavStore', () => {
  let store: InstanceType<typeof SidebarNavStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SidebarNavStore] });
    store = TestBed.inject(SidebarNavStore);
  });

  it('should start with nothing active', () => {
    expect(store.isItemActive('a')).toBe(false);
    expect(store.isGroupActive('g1')).toBe(false);
  });

  it('should track the active item key', () => {
    store.setItemActiveKey('a');
    expect(store.isItemActive('a')).toBe(true);
    expect(store.isItemActive('b')).toBe(false);
  });

  it('should track the active group key', () => {
    store.setGroupActiveKey('g1');
    expect(store.isGroupActive('g1')).toBe(true);
    store.setGroupActiveKey(null);
    expect(store.isGroupActive('g1')).toBe(false);
  });
});
