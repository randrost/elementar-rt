import { ElementRef, Renderer2 } from '@angular/core';
import { DebounceTimeDirective } from './debounce-time.directive';

describe('DebounceTimeDirective', () => {
  it('should create an instance', () => {
    const elementRef = { nativeElement: document.createElement('input') } as ElementRef<HTMLInputElement>;
    const renderer = {} as Renderer2;
    const directive = new DebounceTimeDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
