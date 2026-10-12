import { Component, computed, signal } from '@angular/core';
import { SearchComponent, SearchItemComponent, SearchLeadingDirective, SearchTrailingDirective, SearchItemLeadingDirective, SearchItemSupportingDirective } from '@elementar-rt/components/search';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-basic-search-example',
  imports: [
    SearchComponent,
    SearchItemComponent,
    SearchLeadingDirective,
    SearchTrailingDirective,
    SearchItemLeadingDirective,
    SearchItemSupportingDirective,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './basic-search-example.component.html',
  styleUrl: './basic-search-example.component.scss'
})
export class BasicSearchExampleComponent {
  readonly cities = [
    { name: 'Amsterdam', country: 'Netherlands' },
    { name: 'Barcelona', country: 'Spain' },
    { name: 'Berlin', country: 'Germany' },
    { name: 'Copenhagen', country: 'Denmark' },
    { name: 'Lisbon', country: 'Portugal' },
    { name: 'London', country: 'United Kingdom' },
    { name: 'Paris', country: 'France' },
    { name: 'Prague', country: 'Czechia' },
    { name: 'Rome', country: 'Italy' },
    { name: 'Vienna', country: 'Austria' }
  ];
  readonly recent = ['Berlin', 'Lisbon', 'Vienna'];

  query = signal('');
  picked = signal<string | null>(null);
  results = computed(() => {
    const query = this.query().trim().toLowerCase();
    return query ? this.cities.filter(city => city.name.toLowerCase().includes(query)) : [];
  });

  pick(value: unknown): void {
    this.picked.set(value as string);
    this.query.set(value as string);
  }
}
