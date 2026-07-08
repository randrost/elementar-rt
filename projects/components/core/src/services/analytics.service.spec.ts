import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ENVIRONMENT } from './environment.service';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  it('should not inject a GA script when no googleAnalyticsId is configured', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: ENVIRONMENT, useValue: {} }],
    });
    const service = TestBed.inject(AnalyticsService);
    const scriptsBefore = document.head.querySelectorAll('script').length;
    service.trackPageViews();
    expect(document.head.querySelectorAll('script').length).toBe(scriptsBefore);
  });
});
