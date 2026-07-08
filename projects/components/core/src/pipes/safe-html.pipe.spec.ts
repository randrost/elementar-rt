import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = TestBed.runInInjectionContext(() => new SafeHtmlPipe());
  });

  it('should delegate to DomSanitizer.bypassSecurityTrustHtml', () => {
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();
    const result = pipe.transform('<b>hi</b>');
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('<b>hi</b>');
    expect(sanitizer.sanitize).toBeDefined();
    expect(result).toBeTruthy();
  });
});
