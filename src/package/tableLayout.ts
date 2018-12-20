import Props from '@/package/props'
import TableStore from '@/package/tableStore'
import {Column} from '@/package/treeNode'

export interface TableLayoutProps {
  store: TableStore
}

export default class TableLayout extends Props<TableLayoutProps> {
  width = 0

  private eachColumn(eachHandler: (column: Column, index: number) => void) {
    const {columns} = this.props.store.props
    columns.forEach(eachHandler)
  }

  private get canScrollHorizontal() {
    const {store} = this.props
    const {tableRef} = store.props
    const computedStyle = getComputedStyle(tableRef)
    const {overflow, overflowX} = computedStyle
    return overflow === 'scroll' || overflowX === 'scroll' || overflow === 'auto' || overflowX === 'auto'
  }

  private onTableResizeListener() {
    const {store} = this.props
    const {tableRef, columns} = store.props
    this.width = tableRef.clientWidth as number
    console.log()
  }

  mounted() {
    this.onTableResizeListener()
    window.addEventListener('resize', this.onTableResizeListener.bind(this))
  }

  destroy() {
    window.removeEventListener('resize', this.onTableResizeListener.bind(this))
  }
}
