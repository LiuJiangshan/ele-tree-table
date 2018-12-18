import Props from '@/package/props'
import TableStore from '@/package/tableStore'
import Config from '@/package/config'
import { Column } from '@/package/treeNode'

export interface TableLayoutProps {
  store: TableStore
}

export default class TableLayout extends Props<TableLayoutProps> {
  width = 0

  private get settedWidth (): number {
    let settedWidth = 0
    this.eachColumn((column) => {
      if (column.width) settedWidth++
    })
    return settedWidth
  }

  private get noSettedWidth (): number {
    const { columns } = this.props.store.props
    return columns.length - this.settedWidth
  }

  private eachColumn (eachHandler: (column: Column, index: number) => void) {
    const { columns } = this.props.store.props
    columns.forEach(eachHandler)
  }

  private get totalWidth (): number {
    let total = 0
    this.eachColumn((column) => {
      total += column.width || column.minWidth || 0
    })
    return total
  }

  private get totalRealWidth (): number {
    let total = 0
    this.eachColumn(column => {
      total += column.realWidth || 0
    })
    return total
  }

  private onTableResizeListener () {
    const { store } = this.props
    const { tableRef, columns } = store.props
    let { totalWidth } = this
    this.width = tableRef.clientWidth as number

    // 自动为未设置宽的列设置width
    if (this.settedWidth < columns.length) {
      const { width, totalWidth } = this
      const laveWidth = width - totalWidth
      const laveAvgWidth = laveWidth / this.noSettedWidth
      this.eachColumn(column => {
        if (column.width || column.minWidth) {
          column.width = laveAvgWidth
        }
      })
    }

    // set realWidth
    {
      this.eachColumn(column => {
        column.realWidth = this.width * (column.width || Config.minColumnWidth) / totalWidth
      })
    }
  }

  mounted () {
    this.onTableResizeListener()
    window.addEventListener('resize', this.onTableResizeListener.bind(this))
  }

  destroy () {
    window.removeEventListener('resize', this.onTableResizeListener.bind(this))
  }
}
