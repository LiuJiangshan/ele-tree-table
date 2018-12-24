import {Column} from '@/package/treeNode'
import config from "@/package/config";

export interface TableStoreProps {
  columns: Array<Column>
  data: Array<any>
}

export default class TableStore {
  width: number = 0
  columns: Array<Column> = []
  data: Array<any> = []
  tableWrapRef?: HTMLElement
  tableHeadRef?: HTMLElement
  tableBodyRef?: HTMLElement

  constructor(props: TableStoreProps) {
    this.columns = props.columns
    this.data = props.data

    this.columns.forEach((column) => {
      let width = (column.width as number)

      // 设置默认列宽
      if (!width || width < 0) {
        width = config.deafultColumnWidth
        column.width = width
      }
      // 统计总宽度
      this.width += width
    })
  }

  public setTableHeadRef(tableHeadRef: HTMLElement) {
    this.tableHeadRef = tableHeadRef
  }

  public setTableBodyRef(tableBodyRef: HTMLElement) {
    this.tableBodyRef = tableBodyRef
  }

  public setTableWrapRef(tableWrapRef: HTMLElement) {
    this.tableWrapRef = tableWrapRef
  }
}
