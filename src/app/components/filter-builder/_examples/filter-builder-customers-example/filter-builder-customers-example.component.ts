import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FilterBuilderComponent,
  FilterBuilderFieldDef,
  FilterBuilderGroup
} from '@elementar-rt/components/filter-builder';

@Component({
  selector: 'app-filter-builder-customers-example',
  imports: [
    JsonPipe,
    FilterBuilderComponent
  ],
  templateUrl: './filter-builder-customers-example.component.html',
  styleUrl: './filter-builder-customers-example.component.scss'
})
export class FilterBuilderCustomersExampleComponent {
  value: FilterBuilderGroup[] = [];

  fieldDefs: FilterBuilderFieldDef[] = [
    {
      name: 'First Name',
      dataType: 'string',
      dataField: 'firstName'
    },
    {
      name: 'Last Name',
      dataType: 'string',
      dataField: 'lastName'
    },
    {
      name: 'Email',
      dataType: 'string',
      dataField: 'email'
    },
    {
      name: 'Plan',
      dataType: 'array',
      dataField: 'plan',
      lookup: {
        dataSource: [
          { id: 'free', name: 'Free' },
          { id: 'starter', name: 'Starter' },
          { id: 'pro', name: 'Pro' },
          { id: 'enterprise', name: 'Enterprise' }
        ]
      }
    },
    {
      name: 'Revenue',
      dataType: 'number',
      format: 'currency',
      dataField: 'revenue'
    }
  ];
}
