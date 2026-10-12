import { Component, signal } from '@angular/core';
import { SearchComponent, SearchLeadingDirective } from '@elementar-rt/components/search';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-submit-example',
  imports: [
    SearchComponent,
    SearchLeadingDirective,
    MatIcon
  ],
  templateUrl: './search-submit-example.component.html',
  styleUrl: './search-submit-example.component.scss'
})
export class SearchSubmitExampleComponent {
  submitted = signal<string[]>([]);

  onSearch(query: string): void {
    if (query.trim()) {
      this.submitted.update(list => [query.trim(), ...list].slice(0, 5));
    }
  }
}
