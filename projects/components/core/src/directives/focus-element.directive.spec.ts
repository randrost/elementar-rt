import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusElementDirective } from './focus-element.directive';

@Component({
  standalone: true,
  imports: [FocusElementDirective],
  template: `
    <div emrFocusElement (elementFocused)="focused = true" (elementBlurred)="blurred = true">
      <input>
    </div>
  `,
})
class HostComponent {
  focused = false;
  blurred = false;
  @ViewChild(FocusElementDirective) directive!: FocusElementDirective;
}

describe('FocusElementDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should emit elementFocused when a descendant gains focus', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.focus();
    fixture.detectChanges();
    expect(fixture.componentInstance.focused).toBe(true);
  });

  it('should emit elementBlurred when focus leaves the element', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.focus();
    fixture.detectChanges();
    input.blur();
    fixture.detectChanges();
    expect(fixture.componentInstance.blurred).toBe(true);
  });
});
