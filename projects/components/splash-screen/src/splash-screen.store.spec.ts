import { TestBed } from '@angular/core/testing';

import { SplashScreenStore } from './splash-screen.store';

describe('SplashScreenStore', () => {
  it('should be visible by default', () => {
    const store = TestBed.inject(SplashScreenStore);
    expect(store.visible()).toBe(true);
  });

  it('should hide and show', () => {
    const store = TestBed.inject(SplashScreenStore);

    store.hide();
    expect(store.visible()).toBe(false);

    store.show();
    expect(store.visible()).toBe(true);
  });
});
