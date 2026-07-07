import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarqueeItemDirective } from './marquee-item.directive';

@Component({
  standalone: true,
  imports: [MarqueeItemDirective],
  template: `<div emrMarqueeItem></div>`,
})
class HostComponent {
  @ViewChild(MarqueeItemDirective) directive!: MarqueeItemDirective;
}

describe('MarqueeItemDirective', () => {
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
