import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { ButtonToggleComponent } from './button-toggle.component';

@Component({
  imports: [ButtonToggleGroupComponent, ButtonToggleComponent, FormsModule],
  template: `
    <emr-button-toggle-group [(ngModel)]="value">
      <emr-button-toggle [value]="'a'" [iconOnly]="true">A</emr-button-toggle>
      <emr-button-toggle [value]="'b'" [disabled]="true">B</emr-button-toggle>
    </emr-button-toggle-group>
  `
})
class HostComponent {
  value: any = 'a';
}

describe('ButtonToggleComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should reflect active/disabled/iconOnly state as host attributes', fakeAsync(() => {
    // NgModel's initial writeValue() is deferred a microtask; flush it before asserting.
    tick();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('emr-button-toggle');
    expect(buttons[0].getAttribute('data-active')).toBe('true');
    expect(buttons[1].getAttribute('data-active')).toBeNull();
    expect(buttons[1].getAttribute('data-disabled')).toBe('true');
    expect(buttons[0].getAttribute('data-icon-only')).toBe('true');
  }));

  it('should not select itself when clicked while disabled', () => {
    const buttons = fixture.nativeElement.querySelectorAll('emr-button-toggle');
    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('a');
    expect(buttons[1].getAttribute('data-active')).toBeNull();
  });
});
