export default class TreeStore {
  constructor (opt) {
    this.treeLoader = undefined
    this.dataTypeField = undefined
    this.isLeaf = undefined
    for (let name in opt) if (opt.hasOwnProperty(name)) this[name] = opt[name]
  }
}
