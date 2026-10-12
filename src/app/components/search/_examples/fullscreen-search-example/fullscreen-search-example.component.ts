import { Component, signal } from '@angular/core';
import { SearchComponent, SearchItemComponent, SearchLeadingDirective, SearchTrailingDirective, SearchItemLeadingDirective, SearchItemSupportingDirective } from '@elementar-rt/components/search';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-fullscreen-search-example',
  imports: [
    SearchComponent,
    SearchItemComponent,
    SearchLeadingDirective,
    SearchTrailingDirective,
    SearchItemLeadingDirective,
    SearchItemSupportingDirective,
    MatIcon
  ],
  templateUrl: './fullscreen-search-example.component.html',
  styleUrl: './fullscreen-search-example.component.scss'
})
export class FullscreenSearchExampleComponent {
  readonly results = [
    { title: 'Design system tokens', supporting: 'Docs · Updated 2 days ago', icon: 'palette' },
    { title: 'Quarterly roadmap', supporting: 'Spreadsheet · Shared with you', icon: 'table_chart' },
    { title: 'Onboarding checklist', supporting: 'Doc · Edited yesterday', icon: 'checklist' },
    { title: 'Team offsite photos', supporting: 'Album · 128 items', icon: 'photo_library' }
  ];

  open = signal(false);
}
