import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectComponent, MultiSelectOption } from './multi-select.component';

describe('MultiSelectComponent', () => {
  let fixture: ComponentFixture<MultiSelectComponent>;
  let component: MultiSelectComponent;
  const options: MultiSelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectComponent] }).compileComponents();
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
  });

  it('should start with nothing selected', () => {
    expect((component as any)._selectedOptions()).toEqual([]);
  });

  it('should select an option on toggle and emit selectionChange', () => {
    const emitted: any[] = [];
    component.selectionChange.subscribe((v) => emitted.push(v));
    (component as any)._toggle(options[0]);
    expect((component as any)._isChecked(options[0])).toBe(true);
    expect(emitted).toEqual([['apple']]);
  });

  it('should deselect an option when toggled again', () => {
    (component as any)._toggle(options[0]);
    (component as any)._toggle(options[0]);
    expect((component as any)._isChecked(options[0])).toBe(false);
  });

  it('should ignore toggling a disabled option', () => {
    (component as any)._toggle(options[2]);
    expect((component as any)._isChecked(options[2])).toBe(false);
  });

  it('should populate selected values via writeValue', () => {
    component.writeValue(['banana']);
    expect((component as any)._isChecked(options[1])).toBe(true);
  });

  it('should remove a selection via _remove', () => {
    component.writeValue(['apple', 'banana']);
    const emitted: any[] = [];
    component.selectionChange.subscribe((v) => emitted.push(v));
    (component as any)._remove('apple', new MouseEvent('click'));
    expect((component as any)._isChecked(options[0])).toBe(false);
    expect(emitted[0]).toEqual(['banana']);
  });

  it('should filter options by the search query', () => {
    (component as any)._query.set('ban');
    expect((component as any)._filtered()).toEqual([options[1]]);
  });

  it('should not open the dropdown when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    (component as any)._toggle_open();
    expect((component as any)._open()).toBe(false);
  });
});
