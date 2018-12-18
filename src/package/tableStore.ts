import Props from '@/package/props'
import { Column } from '@/package/treeNode'

export interface TableStoreProps {
  columns: Array<Column>
  data: Array<any>
  tableRef: Element
}

export default class TableStore extends Props<TableStoreProps> {
}
