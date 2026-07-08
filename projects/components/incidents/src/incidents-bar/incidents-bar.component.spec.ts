import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsBarComponent } from './incidents-bar.component';
import { IncidentsComponent } from '../incidents/incidents.component';

@Component({
  imports: [IncidentsComponent, IncidentsBarComponent],
  template: `<emr-incidents><emr-incidents-bar></emr-incidents-bar></emr-incidents>`
})
class HostComponent {}

describe('IncidentsBarComponent', () => {
  it('should toggle the parent incidents visibility on click', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const incidents = fixture.debugElement.children[0].componentInstance as IncidentsComponent;
    fixture.nativeElement.querySelector('emr-incidents-bar').click();

    expect(incidents.isVisible).toBe(true);
  });

  it('should not throw when used without a parent incidents component', async () => {
    await TestBed.configureTestingModule({ imports: [IncidentsBarComponent] }).compileComponents();
    const fixture = TestBed.createComponent(IncidentsBarComponent);
    fixture.detectChanges();

    expect(() => fixture.nativeElement.click()).not.toThrow();
  });
});
