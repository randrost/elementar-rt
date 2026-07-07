import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { InactivityTrackerService } from './inactivity-tracker.service';

describe('InactivityTrackerService', () => {
  let service: InactivityTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InactivityTrackerService);
  });

  it('should emit after the configured interval with no interaction', fakeAsync(() => {
    let emitted = false;
    service.setupInactivityTimer(1000).subscribe(() => (emitted = true));

    tick(999);
    expect(emitted).toBe(false);

    tick(1);
    expect(emitted).toBe(true);
  }));

  it('should restart the timer on reset()', fakeAsync(() => {
    let emitted = false;
    service.setupInactivityTimer(1000).subscribe(() => (emitted = true));

    tick(900);
    service.reset();
    tick(900);
    expect(emitted).toBe(false);

    tick(100);
    expect(emitted).toBe(true);
  }));
});
