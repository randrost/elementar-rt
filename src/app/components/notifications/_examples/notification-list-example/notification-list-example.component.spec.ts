import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NotificationListExampleComponent } from './notification-list-example.component';

describe('NotificationListExampleComponent', () => {
  let component: NotificationListExampleComponent;
  let fixture: ComponentFixture<NotificationListExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationListExampleComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationListExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
