import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeComponent } from '../tree/tree.component';
import { TreeNode } from '../types';

@Component({
  imports: [TreeComponent],
  template: `<emr-tree [nodes]="nodes" selectable checkable/>`
})
class HostComponent {
  nodes: TreeNode[] = [
    { id: 1, label: 'Root', children: [{ id: 2, label: 'Child' }] }
  ];
}

describe('TreeNodeComponent (via TreeComponent)', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should expose a treeitem role and indent nested nodes', () => {
    const row = fixture.nativeElement.querySelector('emr-tree-node');
    expect(row.getAttribute('role')).toBe('treeitem');
  });

  it('should expand to reveal children on toggle click', () => {
    expect(fixture.nativeElement.querySelectorAll('emr-tree-node').length).toBe(1);

    fixture.nativeElement.querySelector('.tn-expand').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('emr-tree-node').length).toBe(2);
  });

  it('should select a node on row click when selectable', () => {
    fixture.nativeElement.querySelector('.tn-row').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.tn-row').classList.contains('is-selected')).toBe(true);
  });

  it('should check a node via its checkbox without toggling selection', () => {
    fixture.nativeElement.querySelector('.tn-row input[type=checkbox]').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.tn-row').classList.contains('is-selected')).toBe(false);
    expect(fixture.nativeElement.querySelector('.tn-row input[type=checkbox]').checked).toBe(true);
  });
});
