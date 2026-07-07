import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { EmrDialog } from './dialog.service';

@Component({ standalone: true, template: 'hello dialog' })
class ContentComponent {}

describe('EmrDialog', () => {
  let service: EmrDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmrDialog);
  });

  afterEach(() => {
    // open() attaches the DialogComponent directly onto a plain <div> host
    // (via createComponent's hostElement option), so it renders as a <div
    // class="emr-dialog-overlay">, not a custom <emr-dialog> tag.
    document.querySelectorAll('.emr-dialog-overlay').forEach((el) => el.remove());
  });

  it('should mount a dialog overlay element into the document body', () => {
    service.open(ContentComponent);
    expect(document.body.querySelector('.emr-dialog-overlay')).toBeTruthy();
  });

  it('should remove the dialog from the DOM when closed', () => {
    const ref = service.open(ContentComponent);
    ref.close();
    expect(document.body.querySelector('.emr-dialog-overlay')).toBeFalsy();
  });

  it('should resolve afterClosed with the value passed to close', async () => {
    const ref = service.open<ContentComponent, string>(ContentComponent);
    const resultPromise = ref.afterClosed();
    ref.close('confirmed');
    expect(await resultPromise).toBe('confirmed');
  });
});
