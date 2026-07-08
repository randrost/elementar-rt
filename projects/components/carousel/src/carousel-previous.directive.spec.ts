import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPreviousDirective } from './carousel-previous.directive';
import { CAROUSEL, CarouselInterface } from './types';

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

  it('should call the carousel api previous() when clicked', () => {
    fixture.componentInstance.directive._handleClick();
    expect(carousel.previous).toHaveBeenCalled();
  });

  it('should disable the button when the carousel reports previous as disabled', () => {
    carousel.isPreviousDisabled.and.returnValue(true);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(true);
  });
});
