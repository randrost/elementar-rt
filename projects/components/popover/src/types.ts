import { OverlayPosition } from '@elementar-rt/components/overlay';
import { InjectionToken } from '@angular/core';

export type PopoverTrigger = 'click' | 'hover';
export type PopoverPosition = OverlayPosition;

export const POPOVER_TRIGGER = new InjectionToken<PopoverTrigger>('POPOVER_TRIGGER');
