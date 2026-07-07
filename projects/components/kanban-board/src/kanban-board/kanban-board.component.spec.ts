import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanItemDefDirective } from '../kanban-item-def.directive';
import { KanbanColumn, KanbanItem } from '../types';

interface Task extends KanbanItem {
  id: number;
}

@Component({
  standalone: true,
  imports: [KanbanBoardComponent, KanbanItemDefDirective],
  template: `
    <emr-kanban-board [columns]="columns">
      <ng-template emrKanbanItemDef let-item>{{ item.name }}</ng-template>
    </emr-kanban-board>
  `,
})
class HostComponent {
  columns: KanbanColumn<Task>[] = [
    { id: 1, name: 'Todo', color: 'blue', items: [{ id: 1, name: 'A', position: 0 }, { id: 2, name: 'B', position: 1 }] },
    { id: 2, name: 'Done', color: 'green', items: [] },
  ];
  @ViewChild(KanbanBoardComponent) board!: KanbanBoardComponent<KanbanColumn<Task>, Task>;
}

describe('KanbanBoardComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let board: KanbanBoardComponent<KanbanColumn<Task>, Task>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    board = fixture.componentInstance.board;
  });

  it('should reorder items within the same column and emit itemSorted', () => {
    const columnData = fixture.componentInstance.columns[0].items;
    const emitted: any[] = [];
    board.itemSorted.subscribe((e) => emitted.push(e));

    // Same-column moves are detected by container *reference* equality, so
    // previousContainer and container must be the same object.
    const container = { data: columnData };
    board.onDropped({
      previousContainer: container,
      container,
      previousIndex: 0,
      currentIndex: 1,
    } as any);

    expect(columnData.map((i) => i.id)).toEqual([2, 1]);
    expect(emitted).toEqual([{ previousIndex: 0, currentIndex: 1 }]);
  });

  it('should transfer an item between columns and emit itemTransferred', () => {
    const todoItems = fixture.componentInstance.columns[0].items;
    const doneItems = fixture.componentInstance.columns[1].items;
    const emitted: any[] = [];
    board.itemTransferred.subscribe((e) => emitted.push(e));

    board.onDropped({
      previousContainer: { data: todoItems },
      container: { data: doneItems },
      previousIndex: 0,
      currentIndex: 0,
    } as any);

    expect(todoItems.length).toBe(1);
    expect(doneItems.length).toBe(1);
    expect(doneItems[0].id).toBe(1);
    expect(emitted[0].previousIndex).toBe(0);
  });

  it('should always emit itemDropped regardless of same/different container', () => {
    const columnData = fixture.componentInstance.columns[0].items;
    const emitted: any[] = [];
    board.itemDropped.subscribe((e) => emitted.push(e));
    const event = {
      previousContainer: { data: columnData },
      container: { data: columnData },
      previousIndex: 0,
      currentIndex: 1,
    };
    board.onDropped(event as any);
    expect(emitted).toEqual([event]);
  });

  it('should track dragging state via onDragStarted/onDragEnded', () => {
    board.onDragStarted({} as any, document.createElement('div'));
    expect((board as any).isDraggingActive).toBe(true);
    board.onDragEnded({} as any);
    expect((board as any).isDraggingActive).toBe(false);
  });
});
