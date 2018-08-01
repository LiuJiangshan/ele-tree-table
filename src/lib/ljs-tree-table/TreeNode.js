export default class TreeNode {
  constructor (data) {
    this.data = data
    this.parent = undefined
    this.childs = undefined
    this.expand = undefined
    this.check = undefined
    this.level = 0
  }

  setParent (parent) {
    this.parent = parent
    this.level = parent.level ? parent.level + 1 : 1
    return this
  }

  getExpandNodes () {
    const expandNodes = []
    expandNodes.push(this)
    if (this.childs && this.expand) {
      this.childs.forEach(it => {
        const subs = it.getExpandNodes()
        if (subs) subs.forEach(it => expandNodes.push(it))
      })
    }
    return expandNodes
  }

  switchExpand () {
    return this.setExpand(!this.expand)
  }

  setExpand (newValue) {
    if (this.expand !== newValue) this.expand = newValue
    return this
  }

  setCheck (newValue) {
    if (this.check !== newValue) this.check = newValue
    return this
  }

  onCheckChanged (newValue) {
    this.getExpandNodes().forEach(it => it.setCheck(newValue))
  }
}
