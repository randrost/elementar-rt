import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageResizeHandlerDirective } from './image-resize-handler.directive';

@Component({
  standalone: true,
  imports: [ImageResizeHandlerDirective],
  template: `<div emrImageResizeHandler [maxWidth]="800" [minWidth]="100" [targetElement]="target" direction="se"></div><div #target></div>`,
})
class HostComponent {
  target!: HTMLElement;
  @ViewChild(ImageResizeHandlerDirective) directive!: ImageResizeHandlerDirective;
}

describe('ImageResizeHandlerDirective', () => {
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
