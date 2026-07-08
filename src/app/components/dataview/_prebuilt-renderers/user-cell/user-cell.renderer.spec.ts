import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { UserCellRenderer } from './user-cell.renderer';

describe('UserCellRenderer', () => {
  let component: UserCellRenderer;
  let fixture: ComponentFixture<UserCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCellRenderer],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCellRenderer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', { name: 'Jane Doe', email: 'jane@example.com', avatarUrl: '' } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
