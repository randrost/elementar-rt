import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsToggleIconDirective } from './incidents-toggle-icon.directive';

@Component({
  imports: [IncidentsToggleIconDirective],
  template: `<span emrIncidentsToggleIcon>x</span>`
})
class HostComponent {}

describe('IncidentsToggleIconDirective', () => {
  it('should apply its host class', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').classList.contains('emr-incidents-toggle-icon')).toBe(true);
  });
});
