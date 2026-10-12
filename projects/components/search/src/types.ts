import { InjectionToken } from '@angular/core';

export type SearchVariant = 'docked' | 'fullscreen';

export interface SearchHost {
  selectItem(value: unknown): void;
}

export const SEARCH = new InjectionToken<SearchHost>('EMR_SEARCH');
