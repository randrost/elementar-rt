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
