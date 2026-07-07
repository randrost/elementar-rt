import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageViewerPictureDescriptionDirective } from './image-viewer-picture-description.directive';

@Component({
  standalone: true,
  imports: [ImageViewerPictureDescriptionDirective],
  template: `<ng-template emrImageViewerPictureDescription></ng-template>`,
})
class HostComponent {
  @ViewChild(ImageViewerPictureDescriptionDirective) directive!: ImageViewerPictureDescriptionDirective;
}

describe('ImageViewerPictureDescriptionDirective', () => {
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
