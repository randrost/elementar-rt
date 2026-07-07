import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBuilderComponent } from './filter-builder.component';
import { FilterBuilderFieldDef, FilterBuilderGroup } from '../types';

describe('FilterBuilderComponent', () => {
  let fixture: ComponentFixture<FilterBuilderComponent>;
  let component: FilterBuilderComponent;

  const fieldDefs: FilterBuilderFieldDef[] = [
    { name: 'Name', dataField: 'name', dataType: 'string' },
    { name: 'Age', dataField: 'age', dataType: 'number' },
    { name: 'Tags', dataField: 'tags', dataType: 'array' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FilterBuilderComponent] }).compileComponents();
    fixture = TestBed.createComponent(FilterBuilderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('fieldDefs', fieldDefs);
    fixture.detectChanges();
  });

  it('should register the built-in operations after view init', () => {
    expect((component as any)._operations.length).toBeGreaterThan(0);
    expect((component as any)._operations.some((op: any) => op.id === 'contains')).toBe(true);
    expect((component as any)._operations.some((op: any) => op.id === 'isBetween')).toBe(true);
  });

  it('should map allowed operations per data type', () => {
    expect(component.isOperationAllowedForCondition('name', 'contains')).toBe(true);
    expect(component.isOperationAllowedForCondition('age', 'contains')).toBe(false);
    expect(component.isOperationAllowedForCondition('age', 'isLessThen')).toBe(true);
  });

  it('should throw when checking an operation for a datatype with no allowed operations', () => {
    fixture.componentRef.setInput('fieldDefs', [
      ...fieldDefs,
      { name: 'Unsupported', dataField: 'weird', dataType: 'nope' } as any
    ]);
    fixture.detectChanges();

    expect(() => component.isOperationAllowedForCondition('weird', 'contains')).toThrowError(
      'There are not operations for the datatype: nope'
    );
  });

  it('should add a condition to the root group using the first field and first operation', () => {
    component.addCondition();
    expect((component as any)._value.length).toBe(1);
    expect((component as any)._value[0].value[0]).toBe('name');
  });

  it('should add a condition to a nested group when a target group is given', () => {
    const group: FilterBuilderGroup = { logicalOperator: 'and', value: [] };
    component.addCondition(group);
    expect(group.value.length).toBe(1);
    expect((component as any)._value.length).toBe(0);
  });

  it('should add a nested group with the default logical operator', () => {
    component.addGroup();
    expect((component as any)._value.length).toBe(1);
    expect((component as any)._value[0].logicalOperator).toBe('and');
    expect((component as any)._value[0].value).toEqual([]);
  });

  it('should reset value to an array when switching from equals to isAnyOf', () => {
    const item = { value: ['tags', 'equals', 'x'] } as any;
    component.operationChanged(item, 'isAnyOf');
    expect(item.value[1]).toBe('isAnyOf');
    expect(item.value[2]).toEqual([]);
  });

  it('should reset value to null when switching from isAnyOf to equals', () => {
    const item = { value: ['tags', 'isAnyOf', ['a', 'b']] } as any;
    component.operationChanged(item, 'equals');
    expect(item.value[2]).toBeNull();
  });

  it('should reset value to an array when switching to isBetween, and back to null when switching away', () => {
    const item = { value: ['age', 'equals', 5] } as any;
    component.operationChanged(item, 'isBetween');
    expect(item.value[2]).toEqual([]);

    component.operationChanged(item, 'equals');
    expect(item.value[2]).toBeNull();
  });

  it('should null out the value for isBlank/isNotBlank operations', () => {
    const item = { value: ['name', 'contains', 'foo'] } as any;
    component.operationChanged(item, 'isBlank');
    expect(item.value[2]).toBeNull();
  });

  it('should emit valueChanged after operationChanged', () => {
    const emitted: any[] = [];
    component.valueChanged.subscribe(v => emitted.push(v));
    component.addCondition();
    (component as any)._value[0].value[2] = 'x';

    component.operationChanged((component as any)._value[0], 'startsWith');

    expect(emitted.length).toBe(1);
  });

  it('should remove a condition by index and emit the change', () => {
    component.addCondition();
    component.addCondition();
    const emitted: any[] = [];
    component.valueChanged.subscribe(v => emitted.push(v));

    component.removeCondition(0, (component as any)._value);

    expect((component as any)._value.length).toBe(1);
    expect(emitted.length).toBe(1);
  });

  describe('isValueNotEmpty', () => {
    it('should be false for an empty string value', () => {
      expect(component.isValueNotEmpty({ value: ['name', 'contains', ''] } as any)).toBe(false);
    });

    it('should be true for a non-empty string value', () => {
      expect(component.isValueNotEmpty({ value: ['name', 'contains', 'x'] } as any)).toBe(true);
    });

    it('should require both bounds for isBetween to count as not-empty', () => {
      expect(component.isValueNotEmpty({ value: ['age', 'isBetween', [1, null]] } as any)).toBe(false);
      expect(component.isValueNotEmpty({ value: ['age', 'isBetween', [1, 2]] } as any)).toBe(true);
    });

    it('should require a non-empty array for array-type isAnyOf conditions', () => {
      expect(component.isValueNotEmpty({ value: ['tags', 'isAnyOf', []] } as any)).toBe(false);
      expect(component.isValueNotEmpty({ value: ['tags', 'isAnyOf', ['a']] } as any)).toBe(true);
    });

    it('should treat array-type equals like a scalar not-null check', () => {
      expect(component.isValueNotEmpty({ value: ['tags', 'equals', null] } as any)).toBe(false);
      expect(component.isValueNotEmpty({ value: ['tags', 'equals', 'a'] } as any)).toBe(true);
    });
  });

  it('should recursively strip empty conditions and empty groups from emitted value', () => {
    const emitted: any[] = [];
    component.valueChanged.subscribe(v => emitted.push(v));

    (component as any)._value = [
      { value: ['name', 'contains', ''] },
      {
        logicalOperator: 'or',
        value: [
          { value: ['name', 'contains', 'ok'] },
          { value: ['age', 'equals', null] }
        ]
      },
      { logicalOperator: 'and', value: [{ value: ['name', 'contains', '' ] }] }
    ];

    (component as any)._emitChangeEvent();

    expect(emitted[0]).toEqual([
      {
        logicalOperator: 'and',
        value: [
          {
            logicalOperator: 'or',
            value: [{ value: ['name', 'contains', 'ok'] }]
          }
        ]
      }
    ]);
  });

  it('should emit an empty array when every condition normalizes away', () => {
    const emitted: any[] = [];
    component.valueChanged.subscribe(v => emitted.push(v));
    (component as any)._value = [{ value: ['name', 'contains', ''] }];

    (component as any)._emitChangeEvent();

    expect(emitted[0]).toEqual([]);
  });

  it('should throw on init when the provided value does not start with a group', () => {
    const fixture2 = TestBed.createComponent(FilterBuilderComponent);
    fixture2.componentRef.setInput('fieldDefs', fieldDefs);
    fixture2.componentRef.setInput('value', [{ value: ['name', 'contains', 'x'] } as any]);

    expect(() => fixture2.detectChanges()).toThrowError('Invalid filter value, first element should be a filter group');
  });

  it('should hydrate _value and _logicalOperator from an initial group value', () => {
    const fixture2 = TestBed.createComponent(FilterBuilderComponent);
    fixture2.componentRef.setInput('fieldDefs', fieldDefs);
    fixture2.componentRef.setInput('value', [
      { logicalOperator: 'or', value: [{ value: ['name', 'contains', 'hi'] }] }
    ]);
    fixture2.detectChanges();

    const c2 = fixture2.componentInstance as any;
    expect(c2._logicalOperator).toBe('or');
    expect(c2._value).toEqual([{ value: ['name', 'contains', 'hi'] }]);
  });
});
