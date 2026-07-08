import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { ButtonToggleComponent } from './button-toggle.component';

@Component({
  imports: [ButtonToggleGroupComponent, ButtonToggleComponent, FormsModule],
  template: `
    <emr-button-toggle-group [(ngModel)]="value" [multiple]="multiple">
      <emr-button-toggle [value]="'a'">A</emr-button-toggle>
      <emr-button-toggle [value]="'b'">B</emr-button-toggle>
      <emr-button-toggle [value]="'c'">C</emr-button-toggle>
    </emr-button-toggle-group>
  `
})
class HostComponent {
  value: unknown = null;
  multiple = false;
}

describe('ButtonToggleGroupComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let group: ButtonToggleGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    group = fixture.debugElement.children[0].componentInstance as ButtonToggleGroupComponent;
  });

  it('should select a single value on click and update ngModel', () => {
    const buttons = fixture.nativeElement.querySelectorAll('emr-button-toggle');
    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('b');
    expect(buttons[1].getAttribute('data-active')).toBe('true');
    expect(buttons[0].getAttribute('data-active')).toBeNull();
  });

  it('should replace the selection when clicking another toggle in single mode', () => {
    const buttons = fixture.nativeElement.querySelectorAll('emr-button-toggle');
    buttons[0].click();
    fixture.detectChanges();
    buttons[2].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('c');
  });

  it('should accumulate values in multiple mode and toggle them off on re-click', () => {
    fixture.componentInstance.multiple = true;
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('emr-button-toggle');
    buttons[0].click();
    fixture.detectChanges();
    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toEqual(['a', 'b']);

    buttons[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toEqual(['b']);
  });

  it('should default the variant attribute on the group', () => {
    expect(fixture.nativeElement.querySelector('emr-button-toggle-group').getAttribute('data-variant')).toBe('default');
  });

  it('should write external ngModel values back onto the group via writeValue', fakeAsync(() => {
    fixture.componentInstance.value = 'c';
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('emr-button-toggle');
    expect(buttons[2].getAttribute('data-active')).toBe('true');
  }));
});
