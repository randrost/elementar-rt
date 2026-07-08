import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeComponent } from './tree.component';
import { TreeNode } from '../types';

describe('TreeComponent', () => {
  let fixture: ComponentFixture<TreeComponent>;
  let component: TreeComponent;
  const nodeA: TreeNode = { id: 'a', label: 'A' };
  const nodeB: TreeNode = { id: 'b', label: 'B' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TreeComponent] }).compileComponents();
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('nodes', [nodeA, nodeB]);
    fixture.detectChanges();
  });

  it('should expand a collapsed node and emit nodeExpand', () => {
    const emitted: TreeNode[] = [];
    component.nodeExpand.subscribe((n) => emitted.push(n));
    component._toggleExpand(nodeA);
    expect(component._isExpanded(nodeA)).toBe(true);
    expect(emitted).toEqual([nodeA]);
  });

  it('should collapse an expanded node and emit nodeCollapse', () => {
    const emitted: TreeNode[] = [];
    component.nodeCollapse.subscribe((n) => emitted.push(n));
    component._toggleExpand(nodeA);
    component._toggleExpand(nodeA);
    expect(component._isExpanded(nodeA)).toBe(false);
    expect(emitted).toEqual([nodeA]);
  });

  it('should not select a node when selectable is false', () => {
    component._toggleSelect(nodeA);
    expect(component._isSelected(nodeA)).toBe(false);
  });

  it('should select a single node and replace the previous selection when multiSelect is off', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    component._toggleSelect(nodeA);
    component._toggleSelect(nodeB);
    expect(component._isSelected(nodeA)).toBe(false);
    expect(component._isSelected(nodeB)).toBe(true);
  });

  it('should accumulate selections when multiSelect is on', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('multiSelect', true);
    fixture.detectChanges();
    component._toggleSelect(nodeA);
    component._toggleSelect(nodeB);
    expect(component._isSelected(nodeA)).toBe(true);
    expect(component._isSelected(nodeB)).toBe(true);
  });

  it('should emit nodeSelect when a node is selected', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    const emitted: TreeNode[] = [];
    component.nodeSelect.subscribe((n) => emitted.push(n));
    component._toggleSelect(nodeA);
    expect(emitted).toEqual([nodeA]);
  });

  it('should toggle checkbox state independently of selection', () => {
    component._toggleCheck(nodeA);
    expect(component._isChecked(nodeA)).toBe(true);
    component._toggleCheck(nodeA);
    expect(component._isChecked(nodeA)).toBe(false);
  });
});
