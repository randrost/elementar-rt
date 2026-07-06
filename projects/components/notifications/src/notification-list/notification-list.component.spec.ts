import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListComponent } from './notification-list.component';
import { Notification } from '../types';

describe('NotificationListComponent', () => {
  let component: NotificationListComponent<Notification>;
  let fixture: ComponentFixture<NotificationListComponent<Notification>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
