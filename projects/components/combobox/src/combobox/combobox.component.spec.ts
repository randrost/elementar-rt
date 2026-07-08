import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxComponent, ComboboxOption } from './combobox.component';

describe('ComboboxComponent', () => {
  let fixture: ComponentFixture<ComboboxComponent>;
  let component: ComboboxComponent;
  const options: ComboboxOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ComboboxComponent] }).compileComponents();
    fixture = TestBed.createComponent(ComboboxComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
  });

  it('should select an option, close the dropdown, and propagate its value', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    const emitted: ComboboxOption[] = [];
    component.optionSelect.subscribe((o) => emitted.push(o));

    (component as any)._select(options[0]);

    expect(onChange).toHaveBeenCalledWith('apple');
    expect((component as any)._open()).toBe(false);
    expect(emitted).toEqual([options[0]]);
  });

  it('should ignore selecting a disabled option', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    (component as any)._select(options[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should populate the query and selection via writeValue', () => {
    component.writeValue('apple');
    expect((component as any)._query()).toBe('Apple');
    expect((component as any)._isSelected(options[0])).toBe(true);
  });

  it('should filter options as the user types', () => {
    (component as any)._onInput('ban');
    expect((component as any)._filtered()).toEqual([options[1]]);
  });

  it('should propagate freeform text as the value when allowFreeform is enabled', () => {
    fixture.componentRef.setInput('allowFreeform', true);
    fixture.detectChanges();
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    (component as any)._onInput('custom text');
    expect(onChange).toHaveBeenCalledWith('custom text');
  });

  it('should not propagate freeform text when disabled', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    (component as any)._onInput('custom text');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should emit the search term as the user types', () => {
    const emitted: string[] = [];
    component.search.subscribe((q) => emitted.push(q));
    (component as any)._onInput('app');
    expect(emitted).toEqual(['app']);
  });
});
