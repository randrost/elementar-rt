import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePlaceholderComponent } from './image-placeholder.component';

describe('ImagePlaceholderComponent', () => {
  let fixture: ComponentFixture<ImagePlaceholderComponent>;
  let component: ImagePlaceholderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ImagePlaceholderComponent] }).compileComponents();
    fixture = TestBed.createComponent(ImagePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should default to the skeleton mode with no loaded/error state', () => {
    expect(fixture.nativeElement.getAttribute('data-mode')).toBe('skeleton');
    expect(fixture.nativeElement.getAttribute('data-loaded')).toBeNull();
    expect(fixture.nativeElement.getAttribute('data-error')).toBeNull();
  });

  it('should mark itself loaded and clear any error on a successful load', () => {
    (component as any)._error.set(true);
    (component as any)._onLoad();
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-loaded')).toBe('true');
    expect(fixture.nativeElement.getAttribute('data-error')).toBeNull();
  });

  it('should mark an error and clear loaded state on a failed load', () => {
    (component as any)._onLoad();
    (component as any)._onError();
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-error')).toBe('true');
    expect(fixture.nativeElement.getAttribute('data-loaded')).toBeNull();
  });
});
