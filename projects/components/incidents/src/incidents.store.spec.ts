import { TestBed } from '@angular/core/testing';

import { IncidentsStore } from './incidents.store';

describe('IncidentsStore', () => {
  it('should start with no incidents', () => {
    const store = TestBed.inject(IncidentsStore);
    expect(store.incidents()).toEqual([]);
    expect(store.title()).toBe('');
  });

  it('should show incidents with title/description and hide by clearing them', () => {
    const store = TestBed.inject(IncidentsStore);

    store.show({
      incidents: [{ id: 1, title: 'Down' }],
      title: 'Outage',
      description: 'Investigating'
    });

    expect(store.incidents()).toEqual([{ id: 1, title: 'Down' }]);
    expect(store.title()).toBe('Outage');
    expect(store.description()).toBe('Investigating');

    store.hide();

    expect(store.incidents()).toEqual([]);
    expect(store.title()).toBe('Outage');
  });
});
