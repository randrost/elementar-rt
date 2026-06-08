import { Component, computed, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FilterSelectComponent, FilterSelectOption } from '@elementar-rt/components/filter-select';
import { FormsModule } from '@angular/forms';

interface Employee {
  name: string;
  department: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-filter-select-table-example',
  imports: [FilterSelectComponent, FormsModule, TitleCasePipe],
  templateUrl: './filter-select-table-example.component.html',
  styleUrl: './filter-select-table-example.component.scss'
})
export class FilterSelectTableExampleComponent {
  selectedDepts = signal<unknown[]>([]);
  selectedStatus = signal<unknown>(null);

  deptOptions: FilterSelectOption[] = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' },
    { value: 'marketing', label: 'Marketing' }
  ];

  statusOptions: FilterSelectOption[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  private _allEmployees: Employee[] = [
    { name: 'Alice Martin', department: 'engineering', role: 'Senior Engineer', status: 'active' },
    { name: 'Bob Chen', department: 'design', role: 'UX Designer', status: 'active' },
    { name: 'Carol White', department: 'product', role: 'Product Manager', status: 'inactive' },
    { name: 'Dan Lee', department: 'engineering', role: 'Frontend Dev', status: 'active' },
    { name: 'Eva Brown', department: 'marketing', role: 'Growth Lead', status: 'active' },
    { name: 'Frank Kim', department: 'design', role: 'Visual Designer', status: 'inactive' },
    { name: 'Grace Liu', department: 'engineering', role: 'Backend Dev', status: 'active' }
  ];

  employees = computed(() => {
    const depts = this.selectedDepts() as string[];
    const status = this.selectedStatus() as string | null;
    return this._allEmployees.filter(e => {
      if (depts.length && !depts.includes(e.department)) return false;
      if (status && e.status !== status) return false;
      return true;
    });
  });
}
