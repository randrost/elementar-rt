import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerDirective } from './image-viewer.directive';
import { ImageViewerPictureDirective } from './image-viewer-picture.directive';

@Component({
  standalone: true,
  imports: [ImageViewerPictureDirective, ImageViewerDirective],
  template: `
    <div emrImageViewer>
      <img emrImageViewerPicture [sourceUrl]="'https://example.com/a.jpg'" [title]="'A title'">
    </div>
  `,
})
class HostComponent {
  @ViewChild(ImageViewerDirective) viewer!: ImageViewerDirective;
  @ViewChild(ImageViewerPictureDirective) directive!: ImageViewerPictureDirective;
}

describe('ImageViewerPictureDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('.cdk-overlay-container').forEach((el) => el.remove());
  });

  it('should open the parent image viewer with this picture\'s data when clicked', () => {
    // `.api` is a getter that returns a fresh object literal on every access,
    // so spying on one accessed instance would not intercept the directive's
    // own (separate) `.api.open(...)` call. Spy on the private implementation
    // that every `.api.open` call actually delegates to instead.
    const openSpy = spyOn(fixture.componentInstance.viewer as any, '_open').and.callThrough();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    img.dispatchEvent(new MouseEvent('click', { cancelable: true }));
    expect(openSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      sourceUrl: 'https://example.com/a.jpg',
      title: 'A title',
    }));
  });

  it('should prevent the default click behavior', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    const event = new MouseEvent('click', { cancelable: true });
    img.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });
});
