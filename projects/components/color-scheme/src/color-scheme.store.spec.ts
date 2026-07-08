import { TestBed } from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';

import { ColorSchemeStore } from './color-scheme.store';
import { COLOR_SCHEME_LOCAL_KEY } from './color-scheme.model';

describe('ColorSchemeStore', () => {
  let store: InstanceType<typeof ColorSchemeStore>;
  let appRef: ApplicationRef;

  beforeEach(() => {
    localStorage.removeItem(COLOR_SCHEME_LOCAL_KEY);
    document.documentElement.classList.remove('dark');
    // Unlike the other stores in this codebase, ColorSchemeStore is not
    // providedIn: 'root' — it must be explicitly provided.
    TestBed.configureTestingModule({ providers: [ColorSchemeStore] });
    store = TestBed.inject(ColorSchemeStore);
    appRef = TestBed.inject(ApplicationRef);
  });

  afterEach(() => {
    localStorage.removeItem(COLOR_SCHEME_LOCAL_KEY);
    document.documentElement.classList.remove('dark');
  });

  it('should default to the light theme', () => {
    expect(store.theme()).toBe('light');
  });

  it('should add the dark class to the document root when set to dark', () => {
    store.setScheme('dark');
    appRef.tick(); // flush the onInit effect that syncs the DOM class
    expect(store.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should remove the dark class when set back to light', () => {
    store.setScheme('dark');
    appRef.tick();
    store.setScheme('light');
    appRef.tick();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should persist the scheme to localStorage', () => {
    store.setScheme('dark');
    expect(localStorage.getItem(COLOR_SCHEME_LOCAL_KEY)).toBe('dark');
  });
});
