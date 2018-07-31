export default class RootNode {
  constructor (childs) {
    this.childs = childs
  }

  getExpandNodes () {
    const expandNodes = []
    if (this.childs) this.childs.forEach(it => expandNodes.push(it.getExpandNodes()))
  }
}
