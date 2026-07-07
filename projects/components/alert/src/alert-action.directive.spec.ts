import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertActionDirective } from './alert-action.directive';

@Component({
  imports: [AlertActionDirective],
  template: `<button emrAlertAction>action</button>`
})
class HostComponent {}

describe('AlertActionDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should apply the emr-alert-action host class', () => {
    expect(fixture.nativeElement.querySelector('button').classList.contains('emr-alert-action')).toBe(true);
  });
});
