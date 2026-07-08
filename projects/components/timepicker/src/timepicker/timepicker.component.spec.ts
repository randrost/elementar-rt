import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerComponent } from './timepicker.component';

describe('TimepickerComponent', () => {
  let fixture: ComponentFixture<TimepickerComponent>;
  let component: TimepickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimepickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should parse a written HH:mm value into hours/minutes/period', () => {
    component.writeValue('14:30');
    expect((component as any)._hours()).toBe(14);
    expect((component as any)._minutes()).toBe(30);
    expect((component as any)._period()).toBe('PM');
    expect((component as any)._displayValue).toBe('14:30');
  });

  it('should wrap hours around the 24h boundary and emit the formatted value', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    component.writeValue('23:00');

    (component as any)._changeHours(1);

    expect((component as any)._hours()).toBe(0);
    expect(onChange).toHaveBeenCalledWith('00:00');
  });

  it('should wrap hours around the 12h boundary in 12h mode', () => {
    fixture.componentRef.setInput('mode', '12h');
    fixture.detectChanges();
    component.writeValue('11:00');

    (component as any)._changeHours(1);

    expect((component as any)._hours()).toBe(0);
  });

  it('should wrap minutes around 60', () => {
    component.writeValue('10:59');
    (component as any)._changeMinutes(1);
    expect((component as any)._minutes()).toBe(0);

    (component as any)._changeMinutes(-1);
    expect((component as any)._minutes()).toBe(59);
  });

  it('should toggle the AM/PM period', () => {
    component.writeValue('09:00');
    expect((component as any)._period()).toBe('AM');

    (component as any)._togglePeriod();
    expect((component as any)._period()).toBe('PM');
  });

  it('should display the period suffix only in 12h mode', () => {
    component.writeValue('09:05');
    expect((component as any)._displayValue).toBe('09:05');

    fixture.componentRef.setInput('mode', '12h');
    fixture.detectChanges();
    expect((component as any)._displayValue).toBe('09:05 AM');
  });

  it('should toggle open/closed unless disabled', () => {
    (component as any)._toggle();
    expect((component as any)._open()).toBe(true);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    (component as any)._open.set(false);
    (component as any)._toggle();
    expect((component as any)._open()).toBe(false);
  });
});
