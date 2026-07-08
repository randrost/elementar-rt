import { TestBed } from '@angular/core/testing';

import { AlertIconDirective } from './alert-icon.directive';

describe('AlertIconDirective', () => {
  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new AlertIconDirective());
    expect(directive).toBeTruthy();
  });
});
