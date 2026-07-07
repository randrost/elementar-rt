import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SafeResourceUrlPipe } from './safe-resource-url.pipe';

describe('SafeResourceUrlPipe', () => {
  let pipe: SafeResourceUrlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = TestBed.runInInjectionContext(() => new SafeResourceUrlPipe());
  });

  it('should delegate to DomSanitizer.bypassSecurityTrustResourceUrl', () => {
    spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();
    pipe.transform('https://example.com/video.mp4');
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith('https://example.com/video.mp4');
  });
});
