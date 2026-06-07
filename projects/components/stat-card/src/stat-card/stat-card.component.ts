import { Component, input, numberAttribute } from '@angular/core';

export type StatCardTrend = 'up' | 'down' | 'neutral';

@Component({
  selector: 'emr-stat-card',
  exportAs: 'emrStatCard',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  host: {
    'class': 'emr-stat-card',
    '[attr.data-trend]': 'trend()',
  }
})
export class StatCardComponent {
  label = input('');
  value = input('');
  trend = input<StatCardTrend>('neutral');
  trendValue = input('');
  trendLabel = input('vs last period');
  icon = input('');
}
