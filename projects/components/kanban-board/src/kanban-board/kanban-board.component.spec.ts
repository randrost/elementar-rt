import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanColumn, KanbanItem } from '../types';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent<KanbanColumn<KanbanItem>, KanbanItem>;
  let fixture: ComponentFixture<KanbanBoardComponent<KanbanColumn<KanbanItem>, KanbanItem>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
