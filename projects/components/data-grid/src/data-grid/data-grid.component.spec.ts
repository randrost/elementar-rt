import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridComponent, DataGridColumn } from './data-grid.component';

interface Person extends Record<string, unknown> {
  name: string;
  age: number;
}

describe('DataGridComponent', () => {
  let fixture: ComponentFixture<DataGridComponent<Person>>;
  let component: DataGridComponent<Person>;
  let columns: DataGridColumn<Person>[];
  let rows: Person[];

  beforeEach(async () => {
    // Fresh columns/rows per test: _commitEdit mutates row objects in place,
    // so sharing one array across tests would leak state between them.
    columns = [
      { field: 'name', header: 'Name', sortable: true, editable: true },
      { field: 'age', header: 'Age', sortable: true },
    ];
    rows = [{ name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }];

    await TestBed.configureTestingModule({ imports: [DataGridComponent] }).compileComponents();
    fixture = TestBed.createComponent<DataGridComponent<Person>>(DataGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('rows', rows);
    fixture.detectChanges();
  });

  it('should leave rows unsorted until a sort is applied', () => {
    expect((component as any)._sortedRows()).toEqual(rows);
  });

  it('should sort rows ascending then descending by string field', () => {
    (component as any)._sort(columns[0]);
    expect((component as any)._sortedRows().map((r: any) => r.name)).toEqual(['Alice', 'Bob']);
    (component as any)._sort(columns[0]);
    expect((component as any)._sortedRows().map((r: any) => r.name)).toEqual(['Bob', 'Alice']);
  });

  it('should sort rows numerically for numeric fields', () => {
    (component as any)._sort(columns[1]);
    expect((component as any)._sortedRows().map((r: any) => r.age)).toEqual([25, 30]);
  });

  it('should emit sortChange with the resulting field and direction', () => {
    const emitted: any[] = [];
    component.sortChange.subscribe((e) => emitted.push(e));
    (component as any)._sort(columns[0]);
    expect(emitted).toEqual([{ field: 'name', direction: 'asc' }]);
  });

  it('should ignore sorting a non-sortable column', () => {
    const nonSortable: DataGridColumn<Person> = { field: 'name', header: 'Name' };
    const emitted: any[] = [];
    component.sortChange.subscribe((e) => emitted.push(e));
    (component as any)._sort(nonSortable);
    expect(emitted).toEqual([]);
  });

  it('should only allow a single selected row when multiSelect is disabled', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    (component as any)._toggleRow(rows[0]);
    (component as any)._toggleRow(rows[1]);
    expect((component as any)._isSelected(rows[0])).toBe(false);
    expect((component as any)._isSelected(rows[1])).toBe(true);
  });

  it('should allow multiple selected rows when multiSelect is enabled', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('multiSelect', true);
    fixture.detectChanges();
    (component as any)._toggleRow(rows[0]);
    (component as any)._toggleRow(rows[1]);
    expect((component as any)._isSelected(rows[0])).toBe(true);
    expect((component as any)._isSelected(rows[1])).toBe(true);
  });

  it('should ignore row toggling when not selectable', () => {
    (component as any)._toggleRow(rows[0]);
    expect((component as any)._isSelected(rows[0])).toBe(false);
  });

  it('should toggle all rows selected/unselected via _toggleAll', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('multiSelect', true);
    fixture.detectChanges();
    (component as any)._toggleAll();
    expect((component as any)._allSelected()).toBe(true);
    (component as any)._toggleAll();
    expect((component as any)._allSelected()).toBe(false);
  });

  it('should start and commit a cell edit, emitting cellEdit with old/new values', () => {
    const emitted: any[] = [];
    component.cellEdit.subscribe((e) => emitted.push(e));
    (component as any)._startEdit(0, columns[0], 'Bob');
    expect((component as any)._isEditing(0, 'name')).toBe(true);
    (component as any)._editValue.set('Bobby');
    (component as any)._commitEdit(rows[0], columns[0]);
    expect(emitted).toEqual([{ row: rows[0], field: 'name', oldValue: 'Bob', newValue: 'Bobby' }]);
    expect(rows[0].name).toBe('Bobby');
    expect((component as any)._isEditing(0, 'name')).toBe(false);
  });

  it('should not start editing a non-editable column', () => {
    (component as any)._startEdit(1, columns[1], 25);
    expect((component as any)._isEditing(1, 'age')).toBe(false);
  });

  it('should compute grid-template-columns with a selection gutter when selectable', () => {
    const withoutSelection = (component as any)._gridTemplateColumns();
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    const withSelection = (component as any)._gridTemplateColumns();
    expect(withSelection.startsWith('--spacing(10) ')).toBe(true);
    expect(withoutSelection.startsWith('--spacing(10) ')).toBe(false);
  });
});
