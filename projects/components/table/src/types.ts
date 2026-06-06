export interface EmrTableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  sticky?: boolean;
  cell?: (row: T) => string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string;
  direction: SortDirection;
}
