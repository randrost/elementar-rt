import { Component, computed, signal } from '@angular/core';
import { EmrSortDirective, EmrSortHeaderDirective, EmrSortEvent } from '@elementar-rt/components/sort';
import { CurrencyPipe } from '@angular/common';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-sort-products-example',
  imports: [EmrSortDirective, EmrSortHeaderDirective, CurrencyPipe],
  templateUrl: './sort-products-example.component.html',
  styleUrl: './sort-products-example.component.scss'
})
export class SortProductsExampleComponent {
  private _sortField = signal('');
  private _sortDir = signal<'asc' | 'desc'>('asc');

  private _data: Product[] = [
    { name: 'Wireless Headphones', category: 'Audio', price: 79.99, stock: 45 },
    { name: 'USB-C Hub', category: 'Accessories', price: 34.99, stock: 120 },
    { name: '4K Monitor', category: 'Displays', price: 349.00, stock: 12 },
    { name: 'Mechanical Keyboard', category: 'Input', price: 129.99, stock: 67 },
    { name: 'Webcam 1080p', category: 'Accessories', price: 54.99, stock: 89 },
    { name: 'SSD 1TB', category: 'Storage', price: 89.99, stock: 200 },
  ];

  rows = computed(() => {
    const field = this._sortField();
    const dir = this._sortDir();
    if (!field) return this._data;
    return [...this._data].sort((a, b) => {
      const av = a[field as keyof Product];
      const bv = b[field as keyof Product];
      const result = typeof av === 'number' ? (av as number) - (bv as number) : String(av).localeCompare(String(bv));
      return dir === 'asc' ? result : -result;
    });
  });

  onSort(event: EmrSortEvent): void {
    this._sortField.set(event.field);
    this._sortDir.set(event.direction);
  }
}
