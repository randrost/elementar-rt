import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselNextDirective } from './carousel-next.directive';

@Component({
  standalone: true,
  imports: [CarouselNextDirective],
  template: `<button emrCarouselNext></button>`,
})
class HostComponent {
  @ViewChild(CarouselNextDirective) directive!: CarouselNextDirective;
}

describe('CarouselNextDirective', () => {
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
