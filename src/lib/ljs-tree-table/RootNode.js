import TreeNode from './TreeNode'

export default class RootNode extends TreeNode {
  constructor (childs = []) {
    super()
    this.childs = childs
    this.level = -1
  }

  getExpandNodes () {
    const expandNodes = []
    if (this.childs) this.childs.forEach(it => it.getExpandNodes().forEach(it => expandNodes.push(it)))
    return expandNodes
  }
}
