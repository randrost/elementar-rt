import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardOverlayContainerDirective } from './card-overlay-container.directive';

@Component({
  standalone: true,
  imports: [CardOverlayContainerDirective],
  template: `<div emrCardOverlayContainer></div>`,
})
class HostComponent {
  @ViewChild(CardOverlayContainerDirective) directive!: CardOverlayContainerDirective;
}

describe('CardOverlayContainerDirective', () => {
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
