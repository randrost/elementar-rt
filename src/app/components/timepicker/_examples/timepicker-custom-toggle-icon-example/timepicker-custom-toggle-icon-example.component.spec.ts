import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { TimepickerCustomToggleIconExampleComponent } from './timepicker-custom-toggle-icon-example.component';

describe('TimepickerCustomToggleIconExampleComponent', () => {
  let component: TimepickerCustomToggleIconExampleComponent;
  let fixture: ComponentFixture<TimepickerCustomToggleIconExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimepickerCustomToggleIconExampleComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimepickerCustomToggleIconExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
