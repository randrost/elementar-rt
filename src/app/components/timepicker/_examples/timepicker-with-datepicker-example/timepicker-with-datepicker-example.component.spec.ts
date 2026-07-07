import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { TimepickerWithDatepickerExampleComponent } from './timepicker-with-datepicker-example.component';

describe('TimepickerWithDatepickerExampleComponent', () => {
  let component: TimepickerWithDatepickerExampleComponent;
  let fixture: ComponentFixture<TimepickerWithDatepickerExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimepickerWithDatepickerExampleComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimepickerWithDatepickerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
