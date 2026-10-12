import { InjectionToken, Signal } from '@angular/core';

export type ToggleVariant = 'filled' | 'tonal' | 'outlined' | 'elevated';
export type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ToggleShape = 'round' | 'square';

/** Implemented by containers (such as `emr-button-group`) that manage toggle selection. */
export interface ToggleGroup {
  readonly disabled: Signal<boolean>;
  isSelected(value: unknown): boolean;
  toggle(value: unknown): void;
}

export const TOGGLE_GROUP = new InjectionToken<ToggleGroup>('EMR_TOGGLE_GROUP');
