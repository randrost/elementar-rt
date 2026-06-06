export interface TreeNode<T = any> {
  id: string | number;
  label: string;
  icon?: string;
  data?: T;
  children?: TreeNode<T>[];
  loading?: boolean;
}
