import { Component } from '@angular/core';
import { DicebearComponent } from '@elementar-rt/components/avatar';
import { KanbanBoardComponent, KanbanColumn, KanbanItemDefDirective } from '@elementar-rt/components/kanban-board';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [
    MatIcon,
    DicebearComponent,
    KanbanItemDefDirective,
    KanbanBoardComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  columns: KanbanColumn<any>[] = [
    {
      id: 1,
      name: 'To Do',
      color: '#06b6d4',
      items: [
        {
          name: 'HINT: Check Dark Theme',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        }
      ]
    },
    {
      id: 2,
      name: 'In Progress',
      color: '#a855f7',
      items: [
        {
          name: 'Urgent Issue',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        }
      ]
    },
    {
      id: 3,
      name: 'Under Review',
      color: '#eab308',
      items: [
        {
          name: 'References research',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        },
        {
          name: 'Fix UI bug',
          position: 1,
          reporter: {
            id: 1,
            name: 'John Doe'
          },
          assignee: {
            id: 1,
            name: 'John Doe'
          },
          priority: 'none'
        }
      ]
    },
    {
      id: 4,
      name: 'Done',
      color: '#22c55e',
      items: [
      ]
    },
    {
      id: 5,
      name: 'Custom',
      color: '#2d22c5',
      items: [
      ]
    }
  ];
}
