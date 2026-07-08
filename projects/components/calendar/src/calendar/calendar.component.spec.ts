import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent, CalendarEvent } from './calendar.component';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CalendarComponent] }).compileComponents();
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('date', new Date(2024, 2, 15));
    fixture.detectChanges();
  });

  it('should title the month view with the month name and year', () => {
    expect((component as any)._title()).toBe('March 2024');
  });

  it('should pad the month grid to full weeks starting from the correct weekday', () => {
    const days: Date[] = (component as any)._calendarDays();
    expect(days.length % 7).toBe(0);
    // March 1 2024 is a Friday; grid should start on the preceding Sunday (Feb 25).
    expect(days[0].getDate()).toBe(25);
    expect(days[0].getMonth()).toBe(1);
  });

  it('should navigate months forward and backward', () => {
    (component as any)._navigate(1);
    expect(component.date().getMonth()).toBe(3);

    (component as any)._navigate(-2);
    expect(component.date().getMonth()).toBe(1);
  });

  it('should switch views and emit viewChange', () => {
    const emitted: string[] = [];
    component.viewChange.subscribe(v => emitted.push(v));

    (component as any)._setView('week');
    fixture.detectChanges();

    expect(component.view()).toBe('week');
    expect(emitted).toEqual(['week']);
    expect(fixture.nativeElement.getAttribute('data-view')).toBe('week');
  });

  it('should title the week view as a date range', () => {
    (component as any)._setView('week');
    expect((component as any)._title()).toContain('–');
  });

  it('should title the day view with the full date', () => {
    (component as any)._setView('day');
    expect((component as any)._title()).toBe('March 15, 2024');
  });

  it('should select a date on click and emit dateClick', () => {
    const emitted: Date[] = [];
    component.dateClick.subscribe(d => emitted.push(d));
    const target = new Date(2024, 2, 20);

    (component as any)._onDateClick(target);

    expect(component.date()).toBe(target);
    expect(emitted).toEqual([target]);
  });

  it('should emit eventClick and stop propagation', () => {
    const emitted: CalendarEvent[] = [];
    component.eventClick.subscribe(e => emitted.push(e));
    const event: CalendarEvent = { id: 1, title: 'Meeting', start: new Date(2024, 2, 15) };
    const mouseEvent = new MouseEvent('click');
    spyOn(mouseEvent, 'stopPropagation');

    (component as any)._onEventClick(event, mouseEvent);

    expect(mouseEvent.stopPropagation).toHaveBeenCalled();
    expect(emitted).toEqual([event]);
  });

  it('should filter events for a specific day', () => {
    fixture.componentRef.setInput('events', [
      { id: 1, title: 'A', start: new Date(2024, 2, 15) },
      { id: 2, title: 'B', start: new Date(2024, 2, 16) }
    ]);
    fixture.detectChanges();

    const results = (component as any)._getEventsForDay(new Date(2024, 2, 15));
    expect(results.map((e: CalendarEvent) => e.id)).toEqual([1]);
  });

  it('should filter events for a specific day and hour', () => {
    const morning = new Date(2024, 2, 15, 9);
    const afternoon = new Date(2024, 2, 15, 14);
    fixture.componentRef.setInput('events', [
      { id: 1, title: 'A', start: morning },
      { id: 2, title: 'B', start: afternoon }
    ]);
    fixture.detectChanges();

    expect((component as any)._getEventsForHour(new Date(2024, 2, 15), 9).map((e: CalendarEvent) => e.id)).toEqual([1]);
    expect((component as any)._getEventsForHour(new Date(2024, 2, 15), 14).map((e: CalendarEvent) => e.id)).toEqual([2]);
  });

  it('should identify today, current month, and selected day', () => {
    expect((component as any)._isToday(new Date())).toBe(true);
    expect((component as any)._isToday(new Date(2020, 0, 1))).toBe(false);

    expect((component as any)._isCurrentMonth(new Date(2024, 2, 1))).toBe(true);
    expect((component as any)._isCurrentMonth(new Date(2024, 3, 1))).toBe(false);

    expect((component as any)._isSelected(new Date(2024, 2, 15))).toBe(true);
    expect((component as any)._isSelected(new Date(2024, 2, 16))).toBe(false);
  });

  it('should format hours in 12-hour AM/PM style', () => {
    expect((component as any)._formatHour(0)).toBe('12 AM');
    expect((component as any)._formatHour(9)).toBe('9 AM');
    expect((component as any)._formatHour(12)).toBe('12 PM');
    expect((component as any)._formatHour(15)).toBe('3 PM');
  });

  it('should jump to today via _goToToday', () => {
    (component as any)._goToToday();
    expect((component as any)._isToday(component.date())).toBe(true);
  });
});
