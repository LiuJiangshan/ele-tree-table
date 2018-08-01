const minWidth = 80
export default class Column {
  constructor (data) {
    this.data = data
    this.mixWidth = this.data.minWidth ? this.data.minWidth : minWidth
    this.width = this.data.width ? this.data.width : this.mixWidth
    this.render = data.render
    this.autoLine = data.autoLine
    this.key = data.key
    this.label = data.label
    this.check = undefined
    this.allowExpand = this.data.type && this.data.type === 'expand'
    this.allowSelection = this.data.type && this.data.type === 'selection'
    this.allowEdit = !this.allowExpand && !this.allowSelection
  }
}
