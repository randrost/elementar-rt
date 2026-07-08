import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerDirective } from './image-viewer.directive';

@Component({
  standalone: true,
  imports: [ImageViewerDirective],
  template: `<div emrImageViewer></div>`,
})
class HostComponent {
  @ViewChild(ImageViewerDirective) directive!: ImageViewerDirective;
}

describe('ImageViewerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('.cdk-overlay-container').forEach((el) => el.remove());
  });

  it('should attach an ImageViewerComponent into a CDK overlay when opened', () => {
    fixture.componentInstance.directive.api.open({ sourceUrl: 'https://example.com/a.jpg' } as any);
    expect(document.querySelector('.cdk-overlay-container .emr-image-viewer')).toBeTruthy();
  });

  it('should detach the overlay once the returned PictureRef is closed', () => {
    const ref = fixture.componentInstance.directive.api.open({ sourceUrl: 'https://example.com/a.jpg' } as any);
    ref.close();
    expect(document.querySelector('.cdk-overlay-container .emr-image-viewer')).toBeFalsy();
  });
});
