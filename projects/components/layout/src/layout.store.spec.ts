import { TestBed } from '@angular/core/testing';

import { LayoutSidebarStore } from './layout.store';

describe('LayoutSidebarStore', () => {
  let store: InstanceType<typeof LayoutSidebarStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(LayoutSidebarStore);
  });

  it('should default the root layout to shown', () => {
    expect(store.isVisible('root')).toBe(true);
  });

  it('should default an unknown layout id to shown', () => {
    expect(store.isVisible('unknown-layout')).toBe(true);
  });

  it('should update visibility for a given layout id', () => {
    store.showSidebarVisibility('main', false);
    expect(store.isVisible('main')).toBe(false);
    store.showSidebarVisibility('main', true);
    expect(store.isVisible('main')).toBe(true);
  });

  it('should track visibility independently per layout id', () => {
    store.showSidebarVisibility('main', false);
    expect(store.isVisible('root')).toBe(true);
  });
});
