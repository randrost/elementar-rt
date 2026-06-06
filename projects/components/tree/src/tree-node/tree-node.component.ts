import { Component, inject, input } from '@angular/core';
import { TreeComponent } from '../tree/tree.component';
import { TreeNode } from '../types';

@Component({
  selector: 'emr-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
  host: { 'class': 'emr-tree-node', 'role': 'treeitem' }
})
export class TreeNodeComponent<T = any> {
  node = input.required<TreeNode<T>>();
  tree = input.required<TreeComponent<T>>();
  depth = input(0);
}
