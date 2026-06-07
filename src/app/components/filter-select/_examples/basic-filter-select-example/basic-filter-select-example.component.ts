import { Component, signal } from '@angular/core';
import { FilterSelectComponent, FilterSelectOption } from '@elementar-rt/components/filter-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-filter-select-example',
  imports: [FilterSelectComponent, FormsModule],
  templateUrl: './basic-filter-select-example.component.html',
  styleUrl: './basic-filter-select-example.component.scss'
})
export class BasicFilterSelectExampleComponent {
  selected = signal<unknown>(null);
  selectedMulti = signal<unknown[]>([]);

  options: FilterSelectOption[] = [
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'angular', label: 'Angular', group: 'Frontend' },
    { value: 'vue', label: 'Vue', group: 'Frontend' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
    { value: 'django', label: 'Django', group: 'Backend' },
    { value: 'rails', label: 'Ruby on Rails', group: 'Backend' },
  ];
}
