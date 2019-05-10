<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { Table, TableColumn } from 'element-ui'
import { CreateElement } from 'vue'
import CellWrap from './cellWrap.vue'

/**
 * 事件:textChange
 * */
@Component({
  mixins: [TableColumn],
  props: { editable: { type: Boolean } }
})
export default class FocusElTableColumn extends Vue {
  get store () {
    return (this as any).owner.store
  }

  get table () {
    return this.store.table as Table
  }

  get states () {
    return this.store.states
  }

  mounted () {
    // @ts-ignore
    const { columnConfig, table } = this
    const renderCell = columnConfig.renderCell
    // hook cell render
    const { fixed, editable } = this.$props
    if (!fixed) {
      columnConfig.renderCell = (h: CreateElement, data: any) => {
        const cell = renderCell(h, data)
        const textChange = table.$listeners.textChange || table.$listeners['text-change']
        return h(CellWrap, {
          props: { editable, data },
          on: {
            textChange,
            currentFocus () {
              const { row } = data
              table.setCurrentRow(row)
            }
          }
        }, [cell])
      }
    }
  }
}
</script>
