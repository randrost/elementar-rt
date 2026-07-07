import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsContainerComponent } from './incidents-container.component';
import { IncidentsStore } from '../incidents.store';

describe('IncidentsContainerComponent', () => {
  let fixture: ComponentFixture<IncidentsContainerComponent>;
  let store: InstanceType<typeof IncidentsStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [IncidentsContainerComponent] }).compileComponents();
    fixture = TestBed.createComponent(IncidentsContainerComponent);
    store = TestBed.inject(IncidentsStore);
    fixture.detectChanges();
  });

  it('should stay inactive with no rendered incidents when the store is empty', () => {
    expect(fixture.nativeElement.classList.contains('is-active')).toBe(false);
    expect(fixture.nativeElement.querySelector('emr-incidents')).toBeNull();
  });

  it('should become active and render incidents once the store is populated', () => {
    store.show({
      incidents: [{ id: 1, title: 'API down' }],
      title: 'Service disruption',
      description: 'We are on it'
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-active')).toBe(true);
    expect(fixture.nativeElement.querySelector('emr-incidents-title').textContent).toContain('Service disruption');
    expect(fixture.nativeElement.querySelector('emr-incident-title').textContent).toContain('API down');
  });

  it('should become inactive again once the store is cleared', () => {
    store.show({ incidents: [{ id: 1, title: 'x' }], title: 't', description: '' });
    fixture.detectChanges();

    store.hide();
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-active')).toBe(false);
  });
});
