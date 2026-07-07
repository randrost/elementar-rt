import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanItemDefDirective } from './kanban-item-def.directive';

@Component({
  standalone: true,
  imports: [KanbanItemDefDirective],
  template: `<ng-template emrKanbanItemDef></ng-template>`,
})
class HostComponent {
  @ViewChild(KanbanItemDefDirective) directive!: KanbanItemDefDirective;
}

describe('KanbanItemDefDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });
});
