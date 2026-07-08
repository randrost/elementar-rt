import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoFocusDirective } from './auto-focus.directive';

@Component({
  standalone: true,
  imports: [AutoFocusDirective],
  template: `<input emrAutoFocus><input id="other">`,
})
class HostComponent {
  @ViewChild(AutoFocusDirective, { read: AutoFocusDirective }) directive!: AutoFocusDirective;
}

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
  });

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should focus its host element after view init', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(document.activeElement).toBe(input);
  });
});
