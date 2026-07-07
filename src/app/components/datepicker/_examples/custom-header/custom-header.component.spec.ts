import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject } from 'rxjs';

import { CustomHeaderComponent } from './custom-header.component';

describe('CustomHeaderComponent', () => {
  let component: CustomHeaderComponent<any>;
  let fixture: ComponentFixture<CustomHeaderComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomHeaderComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
        { provide: MatCalendar, useValue: { stateChanges: new Subject(), activeDate: new Date() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent<CustomHeaderComponent<any>>(CustomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
