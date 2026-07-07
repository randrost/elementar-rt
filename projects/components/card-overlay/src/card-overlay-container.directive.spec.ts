import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOverlayContainerDirective } from './card-overlay-container.directive';

@Component({
  imports: [CardOverlayContainerDirective],
  template: `<div emrCardOverlayContainer></div>`
})
class HostComponent {}

describe('CardOverlayContainerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should set position relative and overflow hidden on init', () => {
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.style.position).toBe('relative');
    expect(el.style.overflow).toBe('hidden');
  });
});
