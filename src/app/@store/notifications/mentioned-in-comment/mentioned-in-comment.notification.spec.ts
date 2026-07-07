import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { MentionedInCommentNotification } from './mentioned-in-comment.notification';

describe('MentionedInCommentNotification', () => {
  let component: MentionedInCommentNotification;
  let fixture: ComponentFixture<MentionedInCommentNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentionedInCommentNotification],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MentionedInCommentNotification);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('notification', { id: '1', actor: { id: '1', name: 'User', avatarUrl: '' }, notifier: { username: 'user' }, payload: { content: 'hi' }, createdAt: new Date().toISOString(), read: false } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
