import { Component, computed, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  SuggestionBlockComponent,
  SuggestionComponent,
  SuggestionIconDirective,
  SuggestionsComponent
} from '@elementar-rt/components/suggestions';
import { FormsModule } from '@angular/forms';

interface SearchItem {
  label: string;
  sublabel: string;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-suggestions-with-search-example',
  imports: [
    MatIcon,
    SuggestionBlockComponent,
    SuggestionComponent,
    SuggestionIconDirective,
    SuggestionsComponent,
    FormsModule
  ],
  templateUrl: './suggestions-with-search-example.component.html',
  styleUrl: './suggestions-with-search-example.component.scss'
})
export class SuggestionsWithSearchExampleComponent {
  query = signal('');
  focused = signal(false);

  allItems: SearchItem[] = [
    { label: 'Dashboard', sublabel: 'Analytics', icon: 'dashboard', category: 'Pages' },
    { label: 'User Settings', sublabel: 'Profile', icon: 'manage_accounts', category: 'Pages' },
    { label: 'Reports', sublabel: 'Finance', icon: 'bar_chart', category: 'Pages' },
    { label: 'Team Members', sublabel: 'Admin', icon: 'group', category: 'Pages' },
    { label: 'Notifications', sublabel: 'Settings', icon: 'notifications', category: 'Pages' },
    { label: 'API Keys', sublabel: 'Developer', icon: 'key', category: 'Settings' },
    { label: 'Billing', sublabel: 'Subscription', icon: 'credit_card', category: 'Settings' }
  ];

  filtered = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return this.allItems;
    return this.allItems.filter(i =>
      i.label.toLowerCase().includes(q) || i.sublabel.toLowerCase().includes(q)
    );
  });

  showDropdown = computed(() => this.focused() && this.query().length > 0);
}
