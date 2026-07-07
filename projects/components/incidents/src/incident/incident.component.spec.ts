import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentComponent } from './incident.component';
import { IncidentsStore } from '../incidents.store';

describe('IncidentComponent', () => {
  let fixture: ComponentFixture<IncidentComponent>;
  let component: IncidentComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [IncidentComponent] }).compileComponents();
    fixture = TestBed.createComponent(IncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should assign each instance a unique default incidentId', () => {
    const fixture2 = TestBed.createComponent(IncidentComponent);
    fixture2.detectChanges();

    expect(component.incidentId()).not.toBe(fixture2.componentInstance.incidentId());
  });

  it('should hide the incidents store when closed', () => {
    const store = TestBed.inject(IncidentsStore);
    store.show({ incidents: [{ id: 1, title: 'x' }], title: '', description: '' });

    component.close();

    expect(store.incidents()).toEqual([]);
  });
});
