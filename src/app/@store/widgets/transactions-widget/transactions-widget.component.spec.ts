import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { TransactionsWidgetComponent } from './transactions-widget.component';

describe('TransactionsWidgetComponent', () => {
  let component: TransactionsWidgetComponent;
  let fixture: ComponentFixture<TransactionsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsWidgetComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
