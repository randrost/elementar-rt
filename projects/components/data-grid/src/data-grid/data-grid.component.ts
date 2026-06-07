import {
  Component, input, output, signal, computed,
  ChangeDetectionStrategy, booleanAttribute, contentChildren, TemplateRef
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';

export interface DataGridColumn<T = unknown> {
  field: keyof T & string;
  header: string;
  width?: number;
  minWidth?: number;
  sortable?: boolean;
  editable?: boolean;
  frozen?: boolean;
  cellTemplate?: TemplateRef<{ $implicit: T; value: unknown }>;
}

export interface SortEvent {
  field: string;
  direction: 'asc' | 'desc';
}

export interface CellEditEvent<T = unknown> {
  row: T;
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

@Component({
  selector: 'emr-data-grid',
  standalone: true,
  imports: [NgTemplateOutlet, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent<T extends Record<string, unknown> = Record<string, unknown>> {
  rows = input<T[]>([]);
  columns = input<DataGridColumn<T>[]>([]);
  rowHeight = input(48);
  virtualScrollHeight = input(400);
  selectable = input(false, { transform: booleanAttribute });
  multiSelect = input(false, { transform: booleanAttribute });
  loading = input(false, { transform: booleanAttribute });
  emptyMessage = input('No data available');

  sortChange = output<SortEvent>();
  cellEdit = output<CellEditEvent<T>>();
  rowSelect = output<T[]>();

  protected _sortField = signal('');
  protected _sortDir = signal<'asc' | 'desc'>('asc');
  protected _selectedRows = signal<Set<T>>(new Set());
  protected _editingCell = signal<{ rowIdx: number; field: string } | null>(null);
  protected _editValue = signal<unknown>('');

  protected _sortedRows = computed(() => {
    const field = this._sortField();
    const dir = this._sortDir();
    const data = [...this.rows()];
    if (!field) return data;
    return data.sort((a, b) => {
      const av = a[field]; const bv = b[field];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return dir === 'asc' ? cmp : -cmp;
    });
  });

  protected _sort(col: DataGridColumn<T>): void {
    if (!col.sortable) return;
    if (this._sortField() === col.field) {
      this._sortDir.set(this._sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this._sortField.set(col.field);
      this._sortDir.set('asc');
    }
    this.sortChange.emit({ field: this._sortField(), direction: this._sortDir() });
  }

  protected _isSelected(row: T): boolean { return this._selectedRows().has(row); }

  protected _allSelected = computed(() => {
    const rows = this._sortedRows();
    return rows.length > 0 && rows.every(r => this._selectedRows().has(r));
  });

  protected _toggleRow(row: T): void {
    if (!this.selectable()) return;
    const sel = new Set(this._selectedRows());
    if (sel.has(row)) {
      sel.delete(row);
    } else {
      if (!this.multiSelect()) sel.clear();
      sel.add(row);
    }
    this._selectedRows.set(sel);
    this.rowSelect.emit([...sel]);
  }

  protected _toggleAll(): void {
    const rows = this._sortedRows();
    const sel = this._allSelected() ? new Set<T>() : new Set(rows);
    this._selectedRows.set(sel);
    this.rowSelect.emit([...sel]);
  }

  protected _startEdit(rowIdx: number, col: DataGridColumn<T>, value: unknown): void {
    if (!col.editable) return;
    this._editingCell.set({ rowIdx, field: col.field });
    this._editValue.set(value);
  }

  protected _commitEdit(row: T, col: DataGridColumn<T>): void {
    const editing = this._editingCell();
    if (!editing) return;
    const oldValue = row[col.field];
    const newValue = this._editValue();
    (row as Record<string, unknown>)[col.field] = newValue;
    this.cellEdit.emit({ row, field: col.field, oldValue, newValue });
    this._editingCell.set(null);
  }

  protected _isEditing(rowIdx: number, field: string): boolean {
    const e = this._editingCell();
    return !!e && e.rowIdx === rowIdx && e.field === field;
  }

  protected _getCellValue(row: T, col: DataGridColumn<T>): unknown {
    return row[col.field];
  }

  protected _colWidth(col: DataGridColumn<T>): string {
    return col.width ? `${col.width}px` : col.minWidth ? `minmax(${col.minWidth}px, 1fr)` : '1fr';
  }

  protected _gridTemplateColumns = computed(() => {
    const cols = this.columns();
    const check = this.selectable() ? '--spacing(10) ' : '';
    return check + cols.map(c => this._colWidth(c)).join(' ');
  });
}
