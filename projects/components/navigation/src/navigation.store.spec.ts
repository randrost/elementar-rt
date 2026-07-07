import { TestBed } from '@angular/core/testing';

import { NavigationStore } from './navigation.store';

describe('NavigationStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NavigationStore] });
  });

  it('should start with no active key/group', () => {
    const store = TestBed.inject(NavigationStore);
    expect(store.activeKey()).toBeNull();
    expect(store.activeGroupKey()).toBeNull();
  });

  it('should set the active key and active group key', () => {
    const store = TestBed.inject(NavigationStore);

    store.setActiveKey('item-1');
    expect(store.activeKey()).toBe('item-1');

    store.setActiveGroupKey('group-1');
    expect(store.activeGroupKey()).toBe('group-1');
  });
});
