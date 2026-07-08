import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverOriginDirective } from './popover-origin.directive';

@Component({
  standalone: true,
  imports: [PopoverOriginDirective],
  template: `<button emrPopoverOrigin></button>`,
})
class HostComponent {
  @ViewChild(PopoverOriginDirective) origin!: PopoverOriginDirective;
}

describe('PopoverOriginDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should expose its host native element via the api', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(fixture.componentInstance.origin.api.nativeElement()).toBe(button);
  });
});
