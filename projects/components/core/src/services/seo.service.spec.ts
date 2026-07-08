import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    meta = TestBed.inject(Meta);
  });

  afterEach(() => {
    meta.removeTag('name="description"');
    meta.removeTag('name="og:description"');
    meta.removeTag('name="og:image"');
  });

  it('should set the description and og:description meta tags', () => {
    service.updateDescription('A great page');
    expect(meta.getTag('name="description"')?.content).toBe('A great page');
    expect(meta.getTag('name="og:description"')?.content).toBe('A great page');
  });

  it('should do nothing when updateDescription is called without content', () => {
    service.updateDescription(undefined);
    expect(meta.getTag('name="description"')).toBeNull();
  });

  it('should set the og:image meta tag', () => {
    service.updateOgImage('https://example.com/img.png');
    expect(meta.getTag('name="og:image"')?.content).toBe('https://example.com/img.png');
  });
});
