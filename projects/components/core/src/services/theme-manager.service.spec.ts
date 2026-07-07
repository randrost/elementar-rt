import { TestBed } from '@angular/core/testing';

import { ThemeManagerService } from './theme-manager.service';

describe('ThemeManagerService', () => {
  let service: ThemeManagerService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeManagerService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should add the dark class and report "dark" when set to dark', () => {
    service.setColorScheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(service.getColorScheme()).toBe('dark');
  });

  it('should remove the dark class and report "light" when set to light', () => {
    service.setColorScheme('dark');
    service.setColorScheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(service.getColorScheme()).toBe('light');
  });

  it('should persist the scheme to localStorage on changeColorScheme', () => {
    service.changeColorScheme('dark');
    const stored = JSON.parse(localStorage.getItem('emr-admin') ?? '{}');
    expect(stored.colorScheme).toBe('dark');
  });

  it('should toggle from dark to light', () => {
    service.changeColorScheme('dark');
    service.toggleColorScheme();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle from light (or unset) to dark', () => {
    service.changeColorScheme('light');
    service.toggleColorScheme();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should read back a previously stored preference via getPreferredColorScheme', () => {
    localStorage.setItem('emr-admin', JSON.stringify({ colorScheme: 'dark' }));
    expect(service.getPreferredColorScheme()).toBe('dark');
  });
});
