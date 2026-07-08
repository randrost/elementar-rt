import { TestBed } from '@angular/core/testing';

import { GlobalStore } from './global.state';

describe('GlobalStore', () => {
  let store: InstanceType<typeof GlobalStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(GlobalStore);
  });

  it('should start with screenLoading true and an empty page title', () => {
    expect(store.screenLoading()).toBe(true);
    expect(store.pageTitle()).toBe('');
    expect(store.sidebarHidden()).toBe(false);
  });

  it('should update screenLoading via setScreenLoading', () => {
    store.setScreenLoading(false);
    expect(store.screenLoading()).toBe(false);
  });

  it('should update pageTitle via setPageTitle', () => {
    store.setPageTitle('Dashboard');
    expect(store.pageTitle()).toBe('Dashboard');
  });
});
