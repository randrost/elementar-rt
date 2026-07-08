import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCloseDirective } from './incident-close.directive';

@Component({
  imports: [IncidentCloseDirective],
  template: `<span emrIncidentClose>x</span>`
})
class HostComponent {}

describe('IncidentCloseDirective', () => {
  it('should apply its host class', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').classList.contains('emr-incident-close')).toBe(true);
  });
});
