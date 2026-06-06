import { booleanAttribute, Component, input, output, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TreeNode } from '../types';
import { TreeNodeComponent } from '../tree-node/tree-node.component';

@Component({
  selector: 'emr-tree',
  exportAs: 'emrTree',
  imports: [TreeNodeComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  host: {
    'class': 'emr-tree',
    'role': 'tree',
  }
})
export class TreeComponent<T = any> {
  nodes = input<TreeNode<T>[]>([]);
  selectable = input(false, { transform: booleanAttribute });
  multiSelect = input(false, { transform: booleanAttribute });
  checkable = input(false, { transform: booleanAttribute });

  readonly nodeSelect = output<TreeNode<T>>();
  readonly nodeExpand = output<TreeNode<T>>();
  readonly nodeCollapse = output<TreeNode<T>>();

  protected _expanded = signal(new Set<string | number>());
  protected _selected = signal(new Set<string | number>());
  protected _checked = signal(new Set<string | number>());

  _isExpanded(node: TreeNode<T>): boolean { return this._expanded().has(node.id); }
  _isSelected(node: TreeNode<T>): boolean { return this._selected().has(node.id); }
  _isChecked(node: TreeNode<T>): boolean { return this._checked().has(node.id); }

  _toggleExpand(node: TreeNode<T>) {
    const next = new Set(this._expanded());
    if (next.has(node.id)) { next.delete(node.id); this.nodeCollapse.emit(node); }
    else { next.add(node.id); this.nodeExpand.emit(node); }
    this._expanded.set(next);
  }

  _toggleSelect(node: TreeNode<T>) {
    if (!this.selectable()) return;
    const next = new Set(this.multiSelect() ? this._selected() : new Set<string | number>());
    if (next.has(node.id)) next.delete(node.id);
    else next.add(node.id);
    this._selected.set(next);
    this.nodeSelect.emit(node);
  }

  _toggleCheck(node: TreeNode<T>) {
    const next = new Set(this._checked());
    if (next.has(node.id)) next.delete(node.id);
    else next.add(node.id);
    this._checked.set(next);
  }
}
