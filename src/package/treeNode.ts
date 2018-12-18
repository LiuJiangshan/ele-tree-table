export class Column {
  prop?: string
  label?: string
  minWidth?: number
  width?: number
  realWidth?: number
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
