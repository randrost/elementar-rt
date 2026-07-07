import { TestBed } from '@angular/core/testing';

import { EmrSortDirective, EmrSortEvent } from './sort.directive';

describe('EmrSortDirective', () => {
  let directive: EmrSortDirective;

  beforeEach(() => {
    // output() must be initialized within an injection context.
    directive = TestBed.runInInjectionContext(() => new EmrSortDirective());
  });

  it('should sort ascending by a new field', () => {
    directive.sort('name');
    expect(directive.activeField()).toBe('name');
    expect(directive.activeDirection()).toBe('asc');
  });

  it('should toggle direction when sorting the same field again', () => {
    directive.sort('name');
    directive.sort('name');
    expect(directive.activeDirection()).toBe('desc');
  });

  it('should reset to ascending when switching to a different field', () => {
    directive.sort('name');
    directive.sort('name');
    directive.sort('date');
    expect(directive.activeField()).toBe('date');
    expect(directive.activeDirection()).toBe('asc');
  });

  it('should emit sortChange with the resulting field and direction', () => {
    const emitted: EmrSortEvent[] = [];
    directive.sortChange.subscribe((e) => emitted.push(e));
    directive.sort('name');
    directive.sort('name');
    expect(emitted).toEqual([
      { field: 'name', direction: 'asc' },
      { field: 'name', direction: 'desc' },
    ]);
  });
});
