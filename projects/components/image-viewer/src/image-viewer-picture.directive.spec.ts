import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageViewerDirective } from './image-viewer.directive';
import { ImageViewerPictureDirective } from './image-viewer-picture.directive';

@Component({
  standalone: true,
  imports: [ImageViewerPictureDirective, ImageViewerDirective],
  template: `<div emrImageViewer><img emrImageViewerPicture [sourceUrl]="'https://example.com/a.jpg'"></div>`,
})
class HostComponent {
  @ViewChild(ImageViewerPictureDirective) directive!: ImageViewerPictureDirective;
}

describe('ImageViewerPictureDirective', () => {
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
