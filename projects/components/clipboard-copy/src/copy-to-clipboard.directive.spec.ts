import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CopyToClipboardDirective } from './copy-to-clipboard.directive';

@Component({
  standalone: true,
  imports: [CopyToClipboardDirective],
  template: `<button [emrCopyToClipboard]="'copy me'" [resetDelay]="500"></button>`,
})
class HostComponent {
  @ViewChild(CopyToClipboardDirective) directive!: CopyToClipboardDirective;
}

describe('CopyToClipboardDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let button: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should copy the bound text and emit copied on click', fakeAsync(() => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    const emitted: string[] = [];
    fixture.componentInstance.directive.copied.subscribe((t) => emitted.push(t));
    button.click();
    tick();
    fixture.detectChanges(); // flush the host binding after the async copy resolves
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('copy me');
    expect(emitted).toEqual(['copy me']);
    expect(button.getAttribute('data-copied')).toBe('true');
  }));

  it('should emit copyError when the clipboard write rejects', fakeAsync(() => {
    const error = new Error('denied');
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.reject(error));
    const emitted: Error[] = [];
    fixture.componentInstance.directive.copyError.subscribe((e) => emitted.push(e));
    button.click();
    tick();
    expect(emitted).toEqual([error]);
  }));

  it('should clear the copied state after resetDelay', fakeAsync(() => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    button.click();
    tick();
    fixture.detectChanges();
    expect(button.getAttribute('data-copied')).toBe('true');
    tick(500);
    fixture.detectChanges();
    expect(button.hasAttribute('data-copied')).toBe(false);
  }));
});
