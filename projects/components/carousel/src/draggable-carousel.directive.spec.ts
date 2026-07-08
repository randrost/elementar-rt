import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraggableCarouselDirective } from './draggable-carousel.directive';

@Component({
  standalone: true,
  imports: [DraggableCarouselDirective],
  template: `<div emrDraggableCarousel></div>`,
})
class HostComponent {
  @ViewChild(DraggableCarouselDirective) directive!: DraggableCarouselDirective;
}

describe('DraggableCarouselDirective', () => {
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
