import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementGlobalComponent } from './announcement-global.component';
import { AnnouncementStore } from '../announcement.store';

describe('AnnouncementGlobalComponent', () => {
  let fixture: ComponentFixture<AnnouncementGlobalComponent>;
  let component: AnnouncementGlobalComponent;
  let store: InstanceType<typeof AnnouncementStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AnnouncementGlobalComponent] }).compileComponents();
    fixture = TestBed.createComponent(AnnouncementGlobalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(AnnouncementStore);
    fixture.detectChanges();
  });

  it('should reflect the store announcement through the computed signal', () => {
    expect(component.announcement()).toBeNull();

    store.show({ variant: 'negative', message: 'Oops' });
    fixture.detectChanges();

    expect(component.announcement()).toEqual({ variant: 'negative', message: 'Oops' });
  });

  it('should hide the store announcement on close', () => {
    store.show({ variant: 'negative', message: 'Oops' });
    fixture.detectChanges();

    component.onClose();

    expect(store.announcement()).toBeNull();
  });
});
