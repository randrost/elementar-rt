import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';
import { ToggleShape, ToggleSize, ToggleVariant } from '../types';

@Component({
  imports: [ToggleComponent],
  template: `
    <button emrToggle [(pressed)]="pressed" [variant]="variant()" [size]="size()" [shape]="shape()"
            [iconOnly]="iconOnly()" [disabled]="disabled()">Label</button>
  `
})
class TestHostComponent {
  pressed = signal(false);
  variant = signal<ToggleVariant>('filled');
  size = signal<ToggleSize>('sm');
  shape = signal<ToggleShape>('round');
  iconOnly = signal(false);
  disabled = signal(false);
}

describe('ToggleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should render an unpressed button toggle', () => {
    expect(button.classList).toContain('emr-toggle');
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.type).toBe('button');
  });

  it('should toggle the pressed state on click', () => {
    button.click();
    fixture.detectChanges();
    expect(host.pressed()).toBeTrue();
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.classList).toContain('is-pressed');
    button.click();
    fixture.detectChanges();
    expect(host.pressed()).toBeFalse();
  });

  it('should reflect variant, size and shape', () => {
    host.variant.set('outlined');
    host.size.set('lg');
    host.shape.set('square');
    host.iconOnly.set(true);
    fixture.detectChanges();
    expect(button.dataset['variant']).toBe('outlined');
    expect(button.dataset['size']).toBe('lg');
    expect(button.dataset['shape']).toBe('square');
    expect(button.classList).toContain('is-icon-only');
  });

  it('should not toggle when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();
    button.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(host.pressed()).toBeFalse();
  });
});
