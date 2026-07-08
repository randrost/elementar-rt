import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { CarouselCardComponent } from '../carousel-card/carousel-card.component';

@Component({
  standalone: true,
  imports: [CarouselComponent, CarouselCardComponent],
  // Cards must be direct children of emr-carousel (matching its internal
  // ng-content selector) — the component's own template supplies the
  // #content wrapper, projecting these cards into it internally.
  template: `
    <emr-carousel (indexChange)="lastIndex = $event">
      <emr-carousel-card style="min-width:100px;">A</emr-carousel-card>
      <emr-carousel-card style="min-width:100px;">B</emr-carousel-card>
      <emr-carousel-card style="min-width:100px;">C</emr-carousel-card>
    </emr-carousel>
  `,
})
class HostComponent {
  lastIndex: number | null = null;
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;
}

describe('CarouselComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let carousel: CarouselComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    carousel = fixture.componentInstance.carousel;
  });

  it('should start at index 0 with previous disabled', () => {
    expect(carousel.api.selectedIndex()).toBe(0);
    expect(carousel.api.isPreviousDisabled()).toBe(true);
  });

  it('should report next as disabled once on the last card', () => {
    // Force the index to the last card without relying on real scroll geometry.
    (carousel as any)._index.set(2);
    expect(carousel.api.isNextDisabled()).toBe(true);
  });

  it('should not emit indexChange when set to the same index', () => {
    (carousel as any)._index.set(1);
    fixture.componentInstance.lastIndex = null;
    (carousel as any).onIndexChanged(1);
    expect(fixture.componentInstance.lastIndex).toBeNull();
  });

  it('should emit indexChange when the index actually changes', () => {
    (carousel as any).onIndexChanged(2);
    expect(fixture.componentInstance.lastIndex).toBe(2);
    expect(carousel.api.selectedIndex()).toBe(2);
  });
});
