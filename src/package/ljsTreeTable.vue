<template>
  <div class="ljs-tree-table" ref="tableWrapRef">
    <table :style="tableHeadStyle" ref="tableHeadRef" border="0" cellpadding="0" cellspacing="0" class="table-header"
           v-bind="tableHeadProp">
      <ColGroup :columns="columns"/>
      <tr>
        <th v-for="(column,tdKey) in columns" :key="tdKey">
          <div class="cell">{{column.label}}</div>
        </th>
      </tr>
    </table>
    <table :style="tableBodyStyle" ref="tableBodyRef" border="0" cellpadding="0" cellspacing="0" class="table-body"
           v-bind="tableBodyProp">
      <ColGroup :columns="columns"/>
      <tr v-for="(itData,trKey) in data" :key="trKey">
        <td v-for="(column,tdKey) in columns" :key="tdKey">
          <div class="cell">{{itData[column.prop]}}</div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Column } from '@/package/treeNode'
import TableStore from '@/package/tableStore'
import Render from '@/package/render'
import ColGroup from '@/package/colGroup.vue'

@Component({
  components: { ColGroup, Render },
  props: {
    columns: { type: Array },
    data: { type: Array },
    tableBodyProp: { type: Object },
    tableHeadProp: { type: Object }
  },
  computed: {
    tableWidthStyle () {
      const style = {} as CSSStyleDeclaration
      style.width = this.tableStore.width ? `${this.tableStore.width}px` : 'inherit'
      return style
    },
    tableHeadStyle () {
      return this.tableWidthStyle
    },
    tableBodyStyle () {
      return this.tableWidthStyle
    }
  }
})

export default class LjsTreeTable extends Vue {
  @Prop()
  private columns!: Array<Column>
  @Prop()
  private data!: Array<any>
  @Prop()
  private tableBodyProp!: any
  @Prop()
  private tableHeadProp!: any
  private tableStore!: TableStore

  created () {
    this.tableStore = new TableStore({
      columns: this.columns,
      data: this.data
    })
  }

  mounted () {
    const { tableStore, $refs } = this
    tableStore.setTableWrapRef($refs.tableWrapRef as HTMLElement)
    tableStore.setTableHeadRef($refs.tableHeadRef as HTMLElement)
    tableStore.setTableBodyRef($refs.tableBodyRef as HTMLElement)
  }
}

</script>
<style lang="scss" scoped>
  .ljs-tree-table {
    font-size: 14px;
    line-height: 23px;
    width: 100%;
    overflow: auto;

    td, th {
      padding: 12px 0;
    }

    .cell {
      padding-left: 10px;
      padding-right: 10px;
      word-wrap: normal;
      white-space: normal;
      word-break: break-all;
    }

    > .table-header {
      width: 100%;
      border-collapse: separate;
      border-spacing: 2px;

      th {
        font-weight: bold;
        color: #909399;
        border: none;
        border-bottom: 1px solid rgb(235, 238, 245);
        text-align: left;
        vertical-align: middle;
      }
    }

    > .table-body {
      width: 100%;
      border-collapse: separate;
      border-spacing: 2px;

      td {
        color: #606266;
        border: none;
        vertical-align: middle;
        border-bottom: 1px solid rgb(235, 238, 245);
        text-align: left;
      }
    }
  }
</style>
