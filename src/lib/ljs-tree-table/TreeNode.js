class TreeNode {
  constructor (opt = {}) {
    this.expandVal = false
    this.checkVal = false
    //
    this.data = undefined
    this.parent = undefined
    this.loading = false
    this.store = undefined
    this.dataType = undefined
    this.childs = undefined
    this.isLeaf = undefined
    this.tds = []
    this.index = undefined
    this.level = 0
    for (let name in opt) if (opt.hasOwnProperty(name)) this[name] = opt[name]
    if (!this.store && opt.parent && opt.parent.store) this.store = opt.parent.store

    if (!this.store) throw new Error('store can\'t null')
    if (!this.level && this.parent) this.level = this.parent.level + 1
    if (this.isLeaf === undefined) this.isLeaf = this.isRoot() ? false : this.store.isLeaf(this)
    let dataTypeField = this.store.dataTypeField
    dataTypeField && this.data && this.data.hasOwnProperty(dataTypeField) && (this.dataType = this.data[dataTypeField])
    // check事件是否冒泡到父节点
    this.checkBubble = true
  }

  setDataType (dataType) {
    this.dataType = dataType
    return this
  }

  isRoot () {
    return !this.parent
  }

  set expand (newVal) {
    this.expandVal = newVal
    if (!this.childs) this.load()
  }

  halfCheck () {
    this.check = undefined
  }

  get expand () {
    return this.expandVal
  }

  isEmpty () {
    return !this.childs || this.childs.length === 0
  }

  allChildCheck () {
    let re = this.childs[0].check
    for (let i = 0; i < this.childs.length; i++) {
      let child = this.childs[i]
      if (child.check !== re) {
        re = undefined
        break
      }
    }
    return re
  }

  onParentCheckChanged () {
    if (this.parent.check === true || this.parent.check === false) {
      this.checkBubble = false
      this.check = this.parent.check
      this.checkBubble = true
    }
  }

  onChildCheckChanged () {
    let newCheck = this.allChildCheck()
    if (newCheck !== this.check) {
      this.check = newCheck
    }
  }

  set check (newVal) {
    this.checkVal = newVal
    // 设置子节点
    this.childs && this.childs.forEach(it => it.onParentCheckChanged())
    // 提醒父节点
    this.checkBubble && this.parent && this.parent.onChildCheckChanged()
  }

  get check () {
    return this.checkVal
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

  load () {
    this.loading = true
    this.childs = []
    this.setExpand(true)
    this.store.treeLoader.load({
      onLoad: data => {
        data.forEach(it => this.childs.push(new TreeNode({
          data: it,
          parent: this,
          store: this.store,
          check: this.check
        })))
      },
      onError (e) {},
      onEnd: () => { setTimeout(() => { this.loading = false }, 100) }
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

  insert (data) {
    const newNode = new TreeNode({
      data: data,
      parent: this,
      store: this.store,
      check: this.check
    })
    if (!this.childs) this.childs = []
    this.childs.push(newNode)
    return newNode
  }

  getCheckedNode () {
    const checked = []
    if (this.check === true) checked.push(this)
    if (this.childs) this.childs.forEach(it => it.getCheckedNode().forEach(cIt => checked.push(cIt)))
    return checked
  }

  bindTd (td) {
    this.tds[td.column.index] = td
  }

  xTd (xindex) {
    if (xindex >= 0 && xindex < this.tds.length) return this.tds[xindex]
  }

  yNode (move) {
    const yIndex = this.index + move
    if (yIndex >= 0 && yIndex < this.store.nodes.length) return this.store.nodes[yIndex]
  }
}

export default TreeNode

