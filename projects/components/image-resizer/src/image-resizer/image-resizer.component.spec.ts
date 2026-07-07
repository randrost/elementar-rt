import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizerComponent } from './image-resizer.component';
import { ImageResizerImageDirective } from '../image-resizer-image.directive';

@Component({
  standalone: true,
  imports: [ImageResizerComponent, ImageResizerImageDirective],
  template: `<emr-image-resizer><img emrImageResizerImage src="https://example.com/a.jpg"></emr-image-resizer>`,
})
class HostComponent {
  @ViewChild(ImageResizerComponent) resizer!: ImageResizerComponent;
}

describe('ImageResizerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance.resizer).toBeTruthy();
  });
});
