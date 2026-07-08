import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EmrToast } from './toast.service';

describe('EmrToast', () => {
  let service: EmrToast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmrToast);
  });

  afterEach(() => {
    document.querySelectorAll('.emr-toast-container').forEach((el) => el.remove());
  });

  it('should create a separate container per position', () => {
    service.open({ message: 'A', position: 'top-left', duration: 0 });
    service.open({ message: 'B', position: 'bottom-right', duration: 0 });
    expect(document.body.querySelector('.emr-toast-top-left')).toBeTruthy();
    expect(document.body.querySelector('.emr-toast-bottom-right')).toBeTruthy();
  });

  it('should reuse the same container for repeated toasts at the same position', () => {
    service.open({ message: 'A', duration: 0 });
    service.open({ message: 'B', duration: 0 });
    const containers = document.body.querySelectorAll('.emr-toast-top-right');
    expect(containers.length).toBe(1);
    expect(containers[0].querySelectorAll('.emr-toast').length).toBe(2);
  });

  it('should remove the toast once it dismisses itself after its duration', fakeAsync(() => {
    service.open({ message: 'Bye', duration: 300 });
    expect(document.body.querySelector('.emr-toast')).toBeTruthy();
    tick(300);
    expect(document.body.querySelector('.emr-toast')).toBeFalsy();
  }));

  it('should set the variant through the success/error/warning/info helpers', () => {
    service.warning('Careful', { duration: 0 });
    const el = document.body.querySelector('.emr-toast');
    expect(el?.getAttribute('data-variant')).toBe('warning');
  });
});
