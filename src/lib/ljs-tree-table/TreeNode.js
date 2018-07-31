export default class TreeNode {
  constructor (data) {
    this.data = data
    this.childs = []
    this.parent = undefined
    this.expand = false
    this.check = false
  }

  getExpandNodes () {
    const expandNodes = []
    expandNodes.push(this)
    if (this.childs) {
      this.childs.forEach(it => {
        const subs = it.getExpandNodes()
        if (subs) subs.forEach(it => expandNodes.push(it))
      })
    }
    return expandNodes
  }

  switchExpand () {
    this.expand = !this.expand
  }

  setExpand (newValue) {
    if ((typeof newValue) === 'boolean' && this.expand !== newValue) this.expand = newValue
  }
}
