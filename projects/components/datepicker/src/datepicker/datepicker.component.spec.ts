import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let fixture: ComponentFixture<DatepickerComponent>;
  let component: DatepickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DatepickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the placeholder as the display value until a value is written', () => {
    expect((component as any)._displayValue).toBe('Select date');

    component.writeValue('2024-03-15');
    expect((component as any)._displayValue).toBe('2024-03-15');
  });

  it('should toggle open/closed unless disabled', () => {
    (component as any)._toggle();
    expect((component as any)._open()).toBe(true);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    (component as any)._toggle();
    expect((component as any)._open()).toBe(true);
  });

  it('should select a day, propagate it via registered onChange, and close the picker', () => {
    const onChange = jasmine.createSpy('onChange');
    const onTouched = jasmine.createSpy('onTouched');
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);
    (component as any)._open.set(true);

    (component as any)._selectDay(new Date(2024, 2, 15));

    expect(onChange).toHaveBeenCalledWith('2024-03-15');
    expect(onTouched).toHaveBeenCalled();
    expect((component as any)._open()).toBe(false);
  });

  it('should build a calendar grid padded with leading nulls for the first week', () => {
    (component as any)._viewDate.set(new Date(2024, 2, 1));
    const days = (component as any)._calendarDays;
    // March 1 2024 is a Friday (day index 5), so 5 leading nulls.
    expect(days.slice(0, 5)).toEqual([null, null, null, null, null]);
    expect(days[5]).toEqual(new Date(2024, 2, 1));
  });

  it('should navigate to the previous/next month', () => {
    (component as any)._viewDate.set(new Date(2024, 2, 1));
    (component as any)._nextMonth();
    expect((component as any)._viewDate().getMonth()).toBe(3);

    (component as any)._prevMonth();
    (component as any)._prevMonth();
    expect((component as any)._viewDate().getMonth()).toBe(1);
  });

  it('should mark the selected and today days', () => {
    component.writeValue('2024-03-15');
    expect((component as any)._isSelected(new Date(2024, 2, 15))).toBe(true);
    expect((component as any)._isSelected(new Date(2024, 2, 16))).toBe(false);
    expect((component as any)._isSelected(null)).toBe(false);

    expect((component as any)._isToday(new Date())).toBe(true);
    expect((component as any)._isToday(null)).toBe(false);
  });
});
