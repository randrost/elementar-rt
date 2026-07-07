import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsListComponent } from './incidents-list.component';
import { IncidentsComponent } from '../incidents/incidents.component';
import { IncidentComponent } from '../incident/incident.component';

@Component({
  // IncidentsListComponent only projects elements matching the `emr-incident`
  // tag selector; anything else (including a plain div with that class) is
  // dropped entirely, so a real projected <emr-incident> is required here.
  imports: [IncidentsComponent, IncidentsListComponent, IncidentComponent],
  template: `
    <emr-incidents>
      <emr-incidents-list>
        <emr-incident>an incident</emr-incident>
      </emr-incidents-list>
    </emr-incidents>
  `
})
class HostComponent {}

describe('IncidentsListComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let incidents: IncidentsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    incidents = fixture.debugElement.children[0].componentInstance as IncidentsComponent;
  });

  it('should toggle visibility when clicking the list host outside any incident item', () => {
    (fixture.nativeElement.querySelector('emr-incidents-list') as HTMLElement).click();
    expect(incidents.isVisible).toBe(true);
  });

  it('should not toggle visibility when clicking within a projected incident item', () => {
    (fixture.nativeElement.querySelector('emr-incident') as HTMLElement).click();
    expect(incidents.isVisible).toBe(false);
  });

});

describe('IncidentsListComponent (standalone)', () => {
  it('should reflect the fixed input as a host class', async () => {
    await TestBed.configureTestingModule({ imports: [IncidentsListComponent] }).compileComponents();
    const fixture = TestBed.createComponent(IncidentsListComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-fixed')).toBe(false);

    fixture.componentRef.setInput('fixed', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-fixed')).toBe(true);
  });
});
