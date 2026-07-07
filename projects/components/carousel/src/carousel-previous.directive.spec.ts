import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselPreviousDirective } from './carousel-previous.directive';

@Component({
  standalone: true,
  imports: [CarouselPreviousDirective],
  template: `<button emrCarouselPrevious></button>`,
})
class HostComponent {
  @ViewChild(CarouselPreviousDirective) directive!: CarouselPreviousDirective;
}

describe('CarouselPreviousDirective', () => {
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
