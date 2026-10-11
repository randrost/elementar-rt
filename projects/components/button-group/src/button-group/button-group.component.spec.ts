import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from '@elementar-rt/components/toggle';

import { ButtonGroupComponent, ButtonGroupVariant } from './button-group.component';

@Component({
  imports: [ButtonGroupComponent, ToggleComponent],
  template: `
    <emr-button-group [variant]="variant()" [multiple]="multiple()" [required]="required()"
                      [disabled]="disabled()" [(value)]="value">
      <button emrToggle value="wifi">Wi-Fi</button>
      <button emrToggle value="bluetooth">Bluetooth</button>
      <button emrToggle value="alarm">Alarm</button>
    </emr-button-group>
  `
})
class TestHostComponent {
  variant = signal<ButtonGroupVariant>('standard');
  multiple = signal(false);
  required = signal(false);
  disabled = signal(false);
  value = signal<unknown>(undefined);
}

describe('ButtonGroupComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const group = (): HTMLElement => fixture.nativeElement.querySelector('emr-button-group');
  const toggles = (): HTMLButtonElement[] => Array.from(fixture.nativeElement.querySelectorAll('button'));
  const click = (index: number) => {
    toggles()[index].click();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a group with the standard variant by default', () => {
    expect(group().getAttribute('role')).toBe('group');
    expect(group().classList).toContain('is-standard');
    host.variant.set('connected');
    fixture.detectChanges();
    expect(group().classList).toContain('is-connected');
  });

  it('should select a single value and deselect it again', () => {
    click(1);
    expect(host.value()).toBe('bluetooth');
    expect(toggles()[1].getAttribute('aria-pressed')).toBe('true');
    click(0);
    expect(host.value()).toBe('wifi');
    expect(toggles()[1].getAttribute('aria-pressed')).toBe('false');
    click(0);
    expect(host.value()).toBeUndefined();
  });

  it('should keep the selection when required', () => {
    host.required.set(true);
    host.value.set('alarm');
    fixture.detectChanges();
    click(2);
    expect(host.value()).toBe('alarm');
  });

  it('should select several values when multiple', () => {
    host.multiple.set(true);
    fixture.detectChanges();
    click(0);
    click(2);
    expect(host.value()).toEqual(['wifi', 'alarm']);
    click(0);
    expect(host.value()).toEqual(['alarm']);
    expect(toggles()[2].classList).toContain('is-pressed');
  });

  it('should keep the last value when multiple and required', () => {
    host.multiple.set(true);
    host.required.set(true);
    host.value.set(['wifi']);
    fixture.detectChanges();
    click(0);
    expect(host.value()).toEqual(['wifi']);
  });

  it('should disable every toggle when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    expect(toggles().every(t => t.disabled)).toBeTrue();
  });
});
