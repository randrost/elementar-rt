import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselNextDirective } from './carousel-next.directive';
import { CAROUSEL, CarouselInterface } from './types';

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
  let carousel: jasmine.SpyObj<CarouselInterface['api']>;

  beforeEach(() => {
    carousel = jasmine.createSpyObj('CarouselApi', ['previous', 'next', 'isPreviousDisabled', 'isNextDisabled', 'selectedIndex']);
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: CAROUSEL, useValue: { api: carousel } }],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should call the carousel api next() when clicked', () => {
    fixture.componentInstance.directive._handleClick();
    expect(carousel.next).toHaveBeenCalled();
  });

  it('should disable the button when the carousel reports next as disabled', () => {
    carousel.isNextDisabled.and.returnValue(true);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(true);
  });
});
