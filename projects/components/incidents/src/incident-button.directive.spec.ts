import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentButtonDirective } from './incident-button.directive';

@Component({
  imports: [IncidentButtonDirective],
  template: `<span emrIncidentButton>x</span>`
})
class HostComponent {}

describe('IncidentButtonDirective', () => {
  it('should apply its host class', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').classList.contains('emr-incident-button')).toBe(true);
  });
});
