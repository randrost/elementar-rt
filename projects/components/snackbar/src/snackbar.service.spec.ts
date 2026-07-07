import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EmrSnackbar } from './snackbar.service';

describe('EmrSnackbar', () => {
  let service: EmrSnackbar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmrSnackbar);
  });

  afterEach(() => {
    document.querySelectorAll('.emr-snackbar-container').forEach((el) => el.remove());
  });

  it('should render the message into a snackbar container appended to the body', () => {
    service.open({ message: 'Saved!' });
    // open() attaches SnackbarComponent onto a plain <div> host, so it
    // renders as <div class="emr-snackbar">, not a custom <emr-snackbar> tag.
    const el = document.body.querySelector('.emr-snackbar-container .emr-snackbar');
    expect(el).toBeTruthy();
  });

  it('should reuse the same container for the same position', () => {
    service.open({ message: 'One', position: 'bottom-left' });
    service.open({ message: 'Two', position: 'bottom-left' });
    const containers = document.body.querySelectorAll('.emr-snackbar-bottom-left');
    expect(containers.length).toBe(1);
    expect(containers[0].querySelectorAll('.emr-snackbar').length).toBe(2);
  });

  it('should auto-dismiss after the configured duration', fakeAsync(() => {
    service.open({ message: 'Bye', duration: 1000 });
    expect(document.body.querySelector('.emr-snackbar')).toBeTruthy();
    tick(1000);
    expect(document.body.querySelector('.emr-snackbar')).toBeFalsy();
  }));

  it('should not auto-dismiss when duration is 0', fakeAsync(() => {
    service.open({ message: 'Sticky', duration: 0 });
    tick(10000);
    expect(document.body.querySelector('.emr-snackbar')).toBeTruthy();
  }));

  it('should set the variant via the success/error/warning/info helpers', fakeAsync(() => {
    service.error('Oops', { duration: 0 });
    const el = document.body.querySelector('.emr-snackbar');
    expect(el?.getAttribute('data-variant')).toBe('error');
  }));
});
