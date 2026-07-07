import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DataViewComponent } from './data-view.component';
import { DataViewColumnDef } from '../types';

describe('DataViewComponent', () => {
  let fixture: ComponentFixture<DataViewComponent<any>>;
  let component: DataViewComponent<any>;
  const columnDefs: DataViewColumnDef[] = [
    { name: 'Name', dataField: 'name', visible: true },
    { name: 'Hidden', dataField: 'hidden', visible: false },
  ];
  const data = [{ name: 'Alice' }, { name: 'Bob' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataViewComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DataViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columnDefs', columnDefs);
    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
  });

  it('should only include visible columns plus the action-bar column', () => {
    expect(component.displayedColumns()).toEqual(['name', '__actionBar']);
  });

  it('should prepend a selection column when withSelection is enabled', () => {
    fixture.componentRef.setInput('withSelection', true);
    fixture.detectChanges();
    expect(component.displayedColumns()).toEqual(['selection', 'name', '__actionBar']);
  });

  it('should filter the data source via the api.search method', () => {
    component.api.search('alice');
    expect(component.dataSource().filteredData).toEqual([data[0]]);
  });

  it('should select and unselect all rows through the api', () => {
    const emitted: any[] = [];
    component.selectionChanged.subscribe((rows) => emitted.push(rows));
    component.api.selectAll();
    expect(component.isAllSelected()).toBe(true);
    expect(emitted[0]).toEqual(data);
    component.api.unselectAll();
    expect(component.isAllSelected()).toBe(false);
    expect(emitted[1]).toEqual([]);
  });

  it('should toggle a single row selection and emit rowSelectionChanged', () => {
    const emitted: any[] = [];
    component.rowSelectionChanged.subscribe((e) => emitted.push(e));
    const change = { checked: true } as any;
    component.rowSelectionToggle(change, data[0]);
    expect((component as any).selection.isSelected(data[0])).toBe(true);
    expect(emitted[0].row).toBe(data[0]);
    expect(emitted[0].checked).toBe(true);
  });

  it('should toggle all rows via toggleAllRows', () => {
    component.toggleAllRows();
    expect(component.isAllSelected()).toBe(true);
    component.toggleAllRows();
    expect(component.isAllSelected()).toBe(false);
  });

  it('should forward sort events through onSortChange', () => {
    const emitted: any[] = [];
    component.sortChange.subscribe((e) => emitted.push(e));
    (component as any).onSortChange({ active: 'name', direction: 'asc' });
    expect(emitted).toEqual([{ active: 'name', direction: 'asc' }]);
  });
});
