import { CreateElement, VNode } from 'vue'

export type Tsx = (h: CreateElement, context: any) => VNode

export interface Column {
  prop?: string
  label?: string
  width?: number
  realWidth?: number
  render?: Tsx
}

export interface TreeNodeProps {
  data: any
  dataType?: string
  columns: Array<Column>
  parent?: TreeNode
}

export default class TreeNode {
  private props: TreeNodeProps
  public childs = new Array<TreeNode>()

  constructor (props: TreeNodeProps) {
    this.props = props
  }

  public isRoot (): boolean {
    return !this.props.parent
  }

  public isLeaf (): boolean {
    return !this.childs
  }
}
