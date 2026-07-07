import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { EmrBottomSheet } from './bottom-sheet.service';

@Component({ standalone: true, template: 'sheet content' })
class ContentComponent {}

describe('EmrBottomSheet', () => {
  let service: EmrBottomSheet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmrBottomSheet);
  });

  afterEach(() => {
    // open() attaches BottomSheetComponent onto a plain <div> host, so it
    // renders as <div class="emr-bottom-sheet-overlay">, not a custom tag.
    document.querySelectorAll('.emr-bottom-sheet-overlay').forEach((el) => el.remove());
  });

  it('should mount a bottom sheet and open it shortly after', fakeAsync(() => {
    service.open(ContentComponent);
    const el = document.body.querySelector('.emr-bottom-sheet-overlay') as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.classList.contains('is-open')).toBe(false);
    tick(16);
    expect(el.classList.contains('is-open')).toBe(true);
  }));

  it('should close and remove the sheet from the DOM after the close animation delay', fakeAsync(() => {
    const ref = service.open(ContentComponent);
    tick(16);
    ref.close();
    tick(); // let the zone-driven CD tick pick up the setInput('open', false) call
    expect(document.body.querySelector('.emr-bottom-sheet-overlay')?.classList.contains('is-open')).toBe(false);
    tick(350);
    expect(document.body.querySelector('.emr-bottom-sheet-overlay')).toBeFalsy();
  }));
});
