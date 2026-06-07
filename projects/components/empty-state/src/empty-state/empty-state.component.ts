import { Component, input } from '@angular/core';

export type EmptyStatePreset = 'no-results' | 'no-data' | 'error' | 'offline' | 'custom';

const PRESET_CONFIG: Record<EmptyStatePreset, { icon: string; title: string; description: string }> = {
  'no-results': { icon: '🔍', title: 'No results found', description: 'Try adjusting your search or filters.' },
  'no-data':    { icon: '📭', title: 'Nothing here yet', description: 'Data will appear here once it is available.' },
  'error':      { icon: '⚠️', title: 'Something went wrong', description: 'An error occurred. Please try again.' },
  'offline':    { icon: '📡', title: 'You are offline', description: 'Check your connection and try again.' },
  'custom':     { icon: '', title: '', description: '' },
};

@Component({
  selector: 'emr-empty-state',
  exportAs: 'emrEmptyState',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  host: {
    'class': 'emr-empty-state',
    '[attr.data-preset]': 'preset()',
  }
})
export class EmptyStateComponent {
  preset = input<EmptyStatePreset>('no-data');
  title = input('');
  description = input('');
  icon = input('');

  protected get _icon(): string { return this.icon() || PRESET_CONFIG[this.preset()].icon; }
  protected get _title(): string { return this.title() || PRESET_CONFIG[this.preset()].title; }
  protected get _description(): string { return this.description() || PRESET_CONFIG[this.preset()].description; }
}
