import { Component, computed, input, model, numberAttribute, output } from '@angular/core';

export interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

@Component({
  selector: 'emr-paginator',
  exportAs: 'emrPaginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  host: { 'class': 'emr-paginator' }
})
export class PaginatorComponent {
  length = input(0, { transform: numberAttribute });
  pageSize = model(10);
  pageIndex = model(0);
  pageSizeOptions = input<number[]>([10, 25, 50, 100]);
  showFirstLastButtons = input(true);

  readonly pageChange = output<PageEvent>();

  protected _totalPages = computed(() => Math.ceil(this.length() / this.pageSize()) || 1);
  protected _startItem = computed(() => this.pageIndex() * this.pageSize() + 1);
  protected _endItem = computed(() => Math.min((this.pageIndex() + 1) * this.pageSize(), this.length()));

  protected _go(index: number) {
    const total = this._totalPages();
    if (index < 0 || index >= total) return;
    this.pageIndex.set(index);
    this.pageChange.emit({ pageIndex: index, pageSize: this.pageSize(), length: this.length() });
  }

  protected _onPageSizeChange(event: Event) {
    const size = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(size);
    this.pageIndex.set(0);
    this.pageChange.emit({ pageIndex: 0, pageSize: size, length: this.length() });
  }

  protected get _pages(): number[] {
    const total = this._totalPages();
    const cur = this.pageIndex();
    const range: number[] = [];
    const delta = 2;
    for (let i = Math.max(0, cur - delta); i <= Math.min(total - 1, cur + delta); i++) {
      range.push(i);
    }
    return range;
  }
}
