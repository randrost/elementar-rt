import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { InviteToEditFilesInFolderNotification } from './invite-to-edit-files-in-folder.notification';

describe('InviteToEditFilesInFolderNotification', () => {
  let component: InviteToEditFilesInFolderNotification;
  let fixture: ComponentFixture<InviteToEditFilesInFolderNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteToEditFilesInFolderNotification],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteToEditFilesInFolderNotification);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('notification', { id: '1', actor: { id: '1', name: 'User', avatarUrl: '' }, notifier: { username: 'user' }, payload: { content: 'hi' }, createdAt: new Date().toISOString(), read: false } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
