import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicCalendarExampleComponent } from '../_examples/basic-calendar-example/basic-calendar-example.component';
import { CalendarEventExampleComponent } from '../_examples/calendar-event-example/calendar-event-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicCalendarExampleComponent,
    CalendarEventExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective, MatDivider
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
