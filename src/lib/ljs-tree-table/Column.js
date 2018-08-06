const minWidth = 80
export default class Column {
  constructor (data) {
    this.data = data
    this.minWidth = this.data.minWidth ? this.data.minWidth : minWidth
    this.width = this.data.width ? this.data.width : this.minWidth
    this.render = data.render
    this.autoLine = data.autoLine
    this.key = data.key
    this.label = data.label
    this.dataType = data.dataType
    this.check = undefined
    this.allowExpand = this.data.type && this.data.type === 'expand'
    this.allowSelection = this.data.type && this.data.type === 'selection'
    this.allowEdit = !this.allowExpand && !this.allowSelection
  }

  matchNode (node) {
    const columnType = this.dataType
    const nodeType = node.dataType
    return !this.dataType ||
      (columnType.search(`^${nodeType}$`) >= 0 ||
        columnType.search(`!^|${nodeType}|!$`) >= 0 ||
        columnType.search(`^${nodeType}|!$`) >= 0 ||
        columnType.search(`!^|${nodeType}$`) >= 0)
  }
}
