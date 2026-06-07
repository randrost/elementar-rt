import {
  Component, input, output, signal, computed,
  ChangeDetectionStrategy, model
} from '@angular/core';
import { TitleCasePipe } from '@angular/common';

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end?: Date;
  color?: string;
  allDay?: boolean;
  data?: unknown;
}

export type CalendarView = 'month' | 'week' | 'day';

@Component({
  selector: 'emr-calendar',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-view]': 'view()',
  }
})
export class CalendarComponent {
  events = input<CalendarEvent[]>([]);
  view = model<CalendarView>('month');
  date = model<Date>(new Date());

  eventClick = output<CalendarEvent>();
  dateClick = output<Date>();
  viewChange = output<CalendarView>();

  protected _DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  protected _MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  protected _title = computed(() => {
    const d = this.date();
    const v = this.view();
    if (v === 'month') return `${this._MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    if (v === 'week') {
      const start = this._weekStart(d);
      const end = new Date(start); end.setDate(end.getDate() + 6);
      return `${this._MONTHS[start.getMonth()]} ${start.getDate()} – ${this._MONTHS[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
    }
    return `${this._MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });

  protected _calendarDays = computed((): Date[] => {
    const d = this.date();
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const days: Date[] = [];
    const startPad = firstDay.getDay();
    for (let i = startPad; i > 0; i--) {
      const prev = new Date(firstDay); prev.setDate(prev.getDate() - i);
      days.push(prev);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(d.getFullYear(), d.getMonth(), i));
    }
    while (days.length % 7 !== 0) {
      const next = new Date(days[days.length - 1]); next.setDate(next.getDate() + 1);
      days.push(next);
    }
    return days;
  });

  protected _weekDays = computed((): Date[] => {
    const start = this._weekStart(this.date());
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(d.getDate() + i); return d; });
  });

  protected _hours = Array.from({ length: 24 }, (_, i) => i);

  protected _getEventsForDay(day: Date): CalendarEvent[] {
    return this.events().filter(e => this._sameDay(e.start, day));
  }

  protected _getEventsForHour(day: Date, hour: number): CalendarEvent[] {
    return this.events().filter(e => this._sameDay(e.start, day) && e.start.getHours() === hour);
  }

  protected _isToday(d: Date): boolean {
    return this._sameDay(d, new Date());
  }

  protected _isCurrentMonth(d: Date): boolean {
    const cur = this.date();
    return d.getMonth() === cur.getMonth() && d.getFullYear() === cur.getFullYear();
  }

  protected _isSelected(d: Date): boolean {
    return this._sameDay(d, this.date());
  }

  protected _navigate(delta: number): void {
    const d = new Date(this.date());
    const v = this.view();
    if (v === 'month') d.setMonth(d.getMonth() + delta);
    else if (v === 'week') d.setDate(d.getDate() + delta * 7);
    else d.setDate(d.getDate() + delta);
    this.date.set(d);
  }

  protected _goToToday(): void { this.date.set(new Date()); }

  protected _setView(v: CalendarView): void {
    this.view.set(v);
    this.viewChange.emit(v);
  }

  protected _onDateClick(d: Date): void {
    this.date.set(d);
    this.dateClick.emit(d);
  }

  protected _onEventClick(e: CalendarEvent, event: MouseEvent): void {
    event.stopPropagation();
    this.eventClick.emit(e);
  }

  protected _formatHour(h: number): string {
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  }

  private _weekStart(d: Date): Date {
    const start = new Date(d);
    start.setDate(d.getDate() - d.getDay());
    return start;
  }

  private _sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }
}
