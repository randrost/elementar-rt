import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageViewerPictureTitleDirective } from './image-viewer-picture-title.directive';

@Component({
  standalone: true,
  imports: [ImageViewerPictureTitleDirective],
  template: `<ng-template emrImageViewerPictureTitle></ng-template>`,
})
class HostComponent {
  @ViewChild(ImageViewerPictureTitleDirective) directive!: ImageViewerPictureTitleDirective;
}

describe('ImageViewerPictureTitleDirective', () => {
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
