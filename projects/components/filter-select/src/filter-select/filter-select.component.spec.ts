import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectComponent, FilterSelectOption } from './filter-select.component';

describe('FilterSelectComponent', () => {
  let fixture: ComponentFixture<FilterSelectComponent>;
  let component: FilterSelectComponent;
  const options: FilterSelectOption[] = [
    { value: 1, label: 'One', group: 'Odd' },
    { value: 2, label: 'Two', group: 'Even' },
    { value: 3, label: 'Three', group: 'Odd' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FilterSelectComponent] }).compileComponents();
    fixture = TestBed.createComponent(FilterSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
  });

  it('should show the placeholder as the display label when nothing is selected', () => {
    fixture.componentRef.setInput('placeholder', 'Pick one');
    fixture.detectChanges();
    expect((component as any)._displayLabel()).toBe('Pick one');
    expect((component as any)._hasValue()).toBe(false);
  });

  it('should select a single value and emit valueChange', () => {
    const emitted: unknown[] = [];
    component.valueChange.subscribe((v) => emitted.push(v));
    (component as any)._select(options[0]);
    expect((component as any)._selected()).toBe(1);
    expect((component as any)._displayLabel()).toBe('One');
    expect(emitted).toEqual([1]);
  });

  it('should close the dropdown after a single selection', () => {
    (component as any)._toggle();
    (component as any)._select(options[0]);
    expect((component as any)._open()).toBe(false);
  });

  it('should support toggling multiple values when multiple is enabled', () => {
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    (component as any)._select(options[0]);
    (component as any)._select(options[1]);
    expect((component as any)._selected()).toEqual([1, 2]);
    (component as any)._select(options[0]);
    expect((component as any)._selected()).toEqual([2]);
  });

  it('should group filtered options by their group label', () => {
    const groups = (component as any)._groups() as Map<string, FilterSelectOption[]>;
    expect(groups.get('Odd')?.length).toBe(2);
    expect(groups.get('Even')?.length).toBe(1);
  });

  it('should filter options by the search text', () => {
    (component as any)._search.set('tw');
    expect((component as any)._filtered()).toEqual([options[1]]);
  });

  it('should clear the value via _clear', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    (component as any)._select(options[0]);
    (component as any)._clear(new MouseEvent('click'));
    expect((component as any)._hasValue()).toBe(false);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('should not toggle open when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    (component as any)._toggle();
    expect((component as any)._open()).toBe(false);
  });

  it('should abbreviate the display label for more than two selected values', () => {
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    (component as any)._select(options[0]);
    (component as any)._select(options[1]);
    (component as any)._select(options[2]);
    expect((component as any)._displayLabel()).toBe('One, Two +1');
  });
});
