import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoFocusDirective } from './auto-focus.directive';

@Component({
  standalone: true,
  imports: [AutoFocusDirective],
  template: `<input emrAutoFocus>`,
})
class HostComponent {
  @ViewChild(AutoFocusDirective) directive!: AutoFocusDirective;
}

describe('AutoFocusDirective', () => {
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
