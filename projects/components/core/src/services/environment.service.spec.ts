import { TestBed } from '@angular/core/testing';

import { ENVIRONMENT, EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  it('should return the configured value for a known key', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ENVIRONMENT, useValue: { apiUrl: 'https://api.example.com' } }],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getValue('apiUrl')).toBe('https://api.example.com');
  });

  it('should fall back to the default value when the key is missing', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ENVIRONMENT, useValue: {} }],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getValue('missing', 'fallback')).toBe('fallback');
  });

  it('should default to an empty environment when the token is not provided', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(EnvironmentService);
    expect(service.getValue('anything')).toBeUndefined();
  });
});
