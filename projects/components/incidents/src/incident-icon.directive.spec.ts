import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentIconDirective } from './incident-icon.directive';

@Component({
  imports: [IncidentIconDirective],
  template: `<span emrIncidentIcon>x</span>`
})
class HostComponent {}

describe('IncidentIconDirective', () => {
  it('should apply its host class', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').classList.contains('emr-incident-icon')).toBe(true);
  });
});
