import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { EmrTableColumn, SortState } from '../types';

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let component: TableComponent;
  const columns: EmrTableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: false },
  ];
  const rows = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableComponent] }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('rows', rows);
    fixture.detectChanges();
  });

  it('should render a cell value via a custom cell function when provided', () => {
    const col: EmrTableColumn = { key: 'name', label: 'Name', cell: (r: any) => r.name.toUpperCase() };
    expect((component as any)._cellValue(rows[0], col)).toBe('ALICE');
  });

  it('should fall back to the raw property value when there is no cell function', () => {
    expect((component as any)._cellValue(rows[0], columns[0])).toBe('Alice');
  });

  it('should sort ascending, then descending, then clear on repeated clicks of a sortable column', () => {
    const emitted: SortState[] = [];
    component.sortChange.subscribe((e) => emitted.push(e));
    (component as any)._onSort(columns[0]);
    (component as any)._onSort(columns[0]);
    (component as any)._onSort(columns[0]);
    expect(emitted).toEqual([
      { column: 'name', direction: 'asc' },
      { column: 'name', direction: 'desc' },
      { column: 'name', direction: null },
    ]);
  });

  it('should ignore sorting a non-sortable column', () => {
    const emitted: SortState[] = [];
    component.sortChange.subscribe((e) => emitted.push(e));
    (component as any)._onSort(columns[1]);
    expect(emitted).toEqual([]);
  });

  it('should select and deselect all rows', () => {
    const emitted: any[][] = [];
    component.selectionChange.subscribe((sel) => emitted.push(sel));
    (component as any)._toggleAll(true);
    expect((component as any)._allSelected()).toBe(true);
    expect(emitted[0]).toEqual(rows);
    (component as any)._toggleAll(false);
    expect((component as any)._allSelected()).toBe(false);
    expect(emitted[1]).toEqual([]);
  });

  it('should toggle a single row selection', () => {
    (component as any)._toggleRow(rows[0], true);
    expect((component as any)._isSelected(rows[0])).toBe(true);
    expect((component as any)._isSelected(rows[1])).toBe(false);
    (component as any)._toggleRow(rows[0], false);
    expect((component as any)._isSelected(rows[0])).toBe(false);
  });

  it('should report the correct sort icon for the active column and direction', () => {
    expect((component as any)._sortIcon(columns[0])).toBe('unfold_more');
    (component as any)._onSort(columns[0]);
    expect((component as any)._sortIcon(columns[0])).toBe('arrow_upward');
    (component as any)._onSort(columns[0]);
    expect((component as any)._sortIcon(columns[0])).toBe('arrow_downward');
  });
});
