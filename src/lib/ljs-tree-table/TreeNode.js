class TreeNode {
  constructor (opt = {}) {
    this.expandVal = false
    //
    this.data = undefined
    this.parent = undefined
    this.store = undefined
    this.dataType = undefined
    this.childs = undefined
    this.check = false
    this.level = 0
    for (let name in opt) if (opt.hasOwnProperty(name)) this[name] = opt[name]
    if (!this.store && opt.parent && opt.parent.store) this.store = opt.parent.store

    if (!this.store) throw new Error('store can\'t null')
    if (!this.level && this.parent) this.level = this.parent.level + 1
  }

  setDataType (dataType) {
    this.dataType = dataType
    return this
  }

  set expand (newVal) {
    this.expandVal = newVal
    if (!this.childs) this.load()
  }

  get expand () {
    return this.expandVal
  }

  setParent (parent) {
    this.parent = parent
    this.level = parent.level ? parent.level + 1 : 1
    if (!this.parent.childs) this.parent.childs = []
    this.parent.childs.push(this)
    return this
  }

  switchExpand () {
    return this.setExpand(!this.expand)
  }

  setExpand (newValue) {
    if (this.childs) {
      if (this.expand !== newValue) this.expand = newValue
    } else this.load()
    return this
  }

  setCheck (newValue) {
    if (this.check !== newValue) this.check = newValue
    return this
  }

  setLoader (loader) {
    this.loader = loader
    return this
  }

  onCheckChanged (newValue) {
    this.getExpandNodes().forEach(it => it.setCheck(newValue))
  }

  load () {
    this.childs = []
    this.setExpand(true)
    this.store.treeLoader.load({
      onLoad: data => data.forEach(it => this.childs.push(new TreeNode({
        data: it,
        parent: this,
        store: this.store
      }))),
      onError (e) {},
      onEnd () {}
    }, this)
  }

  childAt (index) {
    return this.childs[index]
  }

  indexOfParent () {
    return this.parent.childs.indexOf(this)
  }

  remove () {
    const index = this.indexOfParent()
    if (index !== -1) this.parent.childs.splice(index, 1)
  }
}

export default TreeNode

