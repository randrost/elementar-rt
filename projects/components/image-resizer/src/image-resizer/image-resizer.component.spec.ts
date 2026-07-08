import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizerComponent } from './image-resizer.component';
import { ImageResizerImageDirective } from '../image-resizer-image.directive';
import { ImageResizedEvent } from '../types';

@Component({
  standalone: true,
  imports: [ImageResizerComponent, ImageResizerImageDirective],
  template: `<emr-image-resizer><img emrImageResizerImage src="https://example.com/a.jpg"></emr-image-resizer>`,
})
class HostComponent {
  @ViewChild(ImageResizerComponent) resizer!: ImageResizerComponent;
}

// A separate host is used for the "explicit imageMaxWidth" case: binding the
// input at all — even to a falsy value — runs it through the numberAttribute
// transform, which turns null into NaN rather than preserving "unset".
@Component({
  standalone: true,
  imports: [ImageResizerComponent, ImageResizerImageDirective],
  template: `<emr-image-resizer [imageMaxWidth]="400"><img emrImageResizerImage src="https://example.com/a.jpg"></emr-image-resizer>`,
})
class HostWithMaxWidthComponent {
  @ViewChild(ImageResizerComponent) resizer!: ImageResizerComponent;
}

describe('ImageResizerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let resizer: ImageResizerComponent;
  let img: HTMLImageElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    resizer = fixture.componentInstance.resizer;
    img = fixture.nativeElement.querySelector('img');
  });

  it('should emit imageResized with the image element dimensions', () => {
    spyOn(img, 'getBoundingClientRect').and.returnValue({ width: 320, height: 240 } as DOMRect);
    Object.defineProperty(img, 'naturalWidth', { value: 640, configurable: true });
    Object.defineProperty(img, 'naturalHeight', { value: 480, configurable: true });

    const emitted: ImageResizedEvent[] = [];
    resizer.imageResized.subscribe((e) => emitted.push(e));
    resizer.onDimensionsChanged();

    expect(emitted).toEqual([{ width: 320, height: 240, naturalWidth: 640, naturalHeight: 480 }]);
  });

  it('should adopt the image natural width as maxWidth once it loads, if none was configured', (done) => {
    spyOn(img, 'getBoundingClientRect').and.returnValue({ width: 500 } as DOMRect);
    img.onload!(new Event('load'));
    setTimeout(() => {
      expect((resizer as any)._maxWidth()).toBe(500);
      done();
    }, 150);
  });

  it('should not override an explicitly configured imageMaxWidth on load', (done) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [HostWithMaxWidthComponent] });
    const fixture2 = TestBed.createComponent(HostWithMaxWidthComponent);
    fixture2.detectChanges();
    const resizer2 = fixture2.componentInstance.resizer;
    const img2: HTMLImageElement = fixture2.nativeElement.querySelector('img');
    spyOn(img2, 'getBoundingClientRect').and.returnValue({ width: 500 } as DOMRect);
    img2.onload!(new Event('load'));
    setTimeout(() => {
      expect((resizer2 as any)._maxWidth()).toBe(400);
      done();
    }, 150);
  });
});
