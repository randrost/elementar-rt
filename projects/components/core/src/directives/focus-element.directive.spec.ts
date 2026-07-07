import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusElementDirective } from './focus-element.directive';

@Component({
  standalone: true,
  imports: [FocusElementDirective],
  template: `<div emrFocusElement></div>`,
})
class HostComponent {
  @ViewChild(FocusElementDirective) directive!: FocusElementDirective;
}

describe('FocusElementDirective', () => {
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
