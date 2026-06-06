import {
  booleanAttribute,
  Component,
  computed,
  input,
  output,
  signal,
  TemplateRef
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { EmrTableColumn, SortDirection, SortState } from '../types';

@Component({
  selector: 'emr-table',
  exportAs: 'emrTable',
  imports: [NgTemplateOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  host: {
    'class': 'emr-table-wrapper',
    '[class.is-striped]': 'striped()',
    '[class.is-bordered]': 'bordered()',
    '[class.is-hoverable]': 'hoverable()',
  }
})
export class TableComponent<T = any> {
  columns = input<EmrTableColumn<T>[]>([]);
  rows = input<T[]>([]);
  striped = input(false, { transform: booleanAttribute });
  bordered = input(false, { transform: booleanAttribute });
  hoverable = input(true, { transform: booleanAttribute });
  selectable = input(false, { transform: booleanAttribute });
  stickyHeader = input(false, { transform: booleanAttribute });
  rowTemplate = input<TemplateRef<any> | null>(null);

  readonly sortChange = output<SortState>();
  readonly selectionChange = output<T[]>();

  protected _sortColumn = signal<string>('');
  protected _sortDirection = signal<SortDirection>(null);
  protected _selectedRows = signal<Set<T>>(new Set());

  protected _allSelected = computed(() => {
    const rows = this.rows();
    return rows.length > 0 && this._selectedRows().size === rows.length;
  });

  protected _cellValue(row: T, col: EmrTableColumn<T>): string {
    if (col.cell) return col.cell(row);
    return String((row as any)[col.key] ?? '');
  }

  protected _onSort(col: EmrTableColumn<T>) {
    if (!col.sortable) return;
    const current = this._sortColumn();
    const dir = this._sortDirection();
    let next: SortDirection;
    if (current !== col.key) {
      next = 'asc';
    } else if (dir === 'asc') {
      next = 'desc';
    } else {
      next = null;
    }
    this._sortColumn.set(next ? col.key : '');
    this._sortDirection.set(next);
    this.sortChange.emit({ column: col.key, direction: next });
  }

  protected _toggleAll(checked: boolean) {
    const next = checked ? new Set(this.rows()) : new Set<T>();
    this._selectedRows.set(next);
    this.selectionChange.emit([...next]);
  }

  protected _toggleRow(row: T, checked: boolean) {
    const next = new Set(this._selectedRows());
    checked ? next.add(row) : next.delete(row);
    this._selectedRows.set(next);
    this.selectionChange.emit([...next]);
  }

  protected _isSelected(row: T): boolean {
    return this._selectedRows().has(row);
  }

  protected _sortIcon(col: EmrTableColumn<T>): string {
    if (this._sortColumn() !== col.key) return 'unfold_more';
    return this._sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }
}
