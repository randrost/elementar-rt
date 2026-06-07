import { Component } from '@angular/core';
import { CalendarComponent, CalendarEvent } from '@elementar-rt/components/calendar';

@Component({
  selector: 'app-calendar-event-example',
  imports: [CalendarComponent],
  templateUrl: './calendar-event-example.component.html',
  styleUrl: './calendar-event-example.component.scss'
})
export class CalendarEventExampleComponent {
  events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Team standup',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 3, 9, 0),
      color: '#6366f1',
    },
    {
      id: 2,
      title: 'Product review',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 14, 0),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 15, 30),
      color: '#22c55e',
    },
    {
      id: 3,
      title: 'Release day',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
      allDay: true,
      color: '#f59e0b',
    },
    {
      id: 4,
      title: 'Design sprint',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 10, 0),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 24, 18, 0),
      color: '#ec4899',
    },
  ];
}
