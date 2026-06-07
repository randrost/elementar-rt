import { Component, signal } from '@angular/core';
import { CalendarComponent } from '@elementar-rt/components/calendar';

@Component({
  selector: 'app-basic-calendar-example',
  imports: [CalendarComponent],
  templateUrl: './basic-calendar-example.component.html',
  styleUrl: './basic-calendar-example.component.scss'
})
export class BasicCalendarExampleComponent {
  selected = signal<Date | null>(null);
}
