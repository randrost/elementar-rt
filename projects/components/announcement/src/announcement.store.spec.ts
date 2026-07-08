import { TestBed } from '@angular/core/testing';

import { AnnouncementStore } from './announcement.store';

describe('AnnouncementStore', () => {
  it('should have no announcement by default', () => {
    const store = TestBed.inject(AnnouncementStore);
    expect(store.announcement()).toBeNull();
  });

  it('should show and hide an announcement', () => {
    const store = TestBed.inject(AnnouncementStore);

    store.show({ variant: 'informative', message: 'Hello' });
    expect(store.announcement()).toEqual({ variant: 'informative', message: 'Hello' });

    store.hide();
    expect(store.announcement()).toBeNull();
  });
});
