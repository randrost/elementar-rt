import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

import { DatepickerFieldComponent } from './datepicker-field.component';

describe('DatepickerFieldComponent', () => {
  let component: DatepickerFieldComponent;
  let fixture: ComponentFixture<DatepickerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerFieldComponent],
      providers: [provideNativeDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('control', new FormControl(''));
    fixture.componentRef.setInput('config', { name: 'date', type: 'date', kind: 'field', label: 'Date', validators: [] } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
