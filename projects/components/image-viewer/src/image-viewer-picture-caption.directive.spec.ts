import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageViewerPictureCaptionDirective } from './image-viewer-picture-caption.directive';

@Component({
  standalone: true,
  imports: [ImageViewerPictureCaptionDirective],
  template: `<ng-template emrImageViewerPictureCaption></ng-template>`,
})
class HostComponent {
  @ViewChild(ImageViewerPictureCaptionDirective) directive!: ImageViewerPictureCaptionDirective;
}

describe('ImageViewerPictureCaptionDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });
});
