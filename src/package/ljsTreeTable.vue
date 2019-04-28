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
          <div class="cell">
            <Render v-if="column.render" :tsx="column.render" :context="{ column,data:itData }"/>
            <template v-else>{{itData[column.prop]}}</template>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableStore from '@/package/tableStore'
import Render from '@/package/render'
import ColGroup from '@/package/colGroup.vue'
import { Column } from '@/package/treeNode'

@Component({
  components: { ColGroup, Render },
  props: {
    columns: { type: Array },
    data: { type: Array },
    tableBodyProp: { type: Object },
    tableHeadProp: { type: Object }
  }
})
export default class LjsTreeTable extends Vue {
  private tableStore!: TableStore
  @Prop({ default: () => [] })
  columns!: Array<Column>
  @Prop({ default: () => [] })
  data!: Array<any>
  @Prop({ default: () => {} })
  tableBodyProp!: object
  @Prop({ default: () => {} })
  tableHeadProp!: object

  get tableWidthStyle () {
    const style = {} as CSSStyleDeclaration
    style.width = this.tableStore.width ? `${this.tableStore.width}px` : 'inherit'
    return style
  }

  get tableHeadStyle () {
    return this.tableWidthStyle
  }

  get tableBodyStyle () {
    return this.tableWidthStyle
  }

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
    width: 100%;
    overflow: auto;

    table {
      border-collapse: collapse;
    }

    td, th {
      border: 1px solid rgb(212, 212, 212);
      line-height: 30px;
      vertical-align: middle;
      text-align: left;
    }

    .cell {
      word-wrap: normal;
      white-space: normal;
      word-break: keep-all;
    }

    > .table-header {
      width: 100%;

      th {
        color: #3e3e3e;
        background: #f2f2f2;
      }
    }

    > .table-body {
      width: 100%;

      td {
        color: #686868;
      }
    }
  }
</style>
