<!--表头组件-->
<template>
  <div class="m-thead" ref="header">
    <table @mouseup="mouseUp" @mouseleave="mouseUp" @mousemove="mouseMove($event)" border="1">
      <colgroup>
        <col v-for="(column,columnIndex) in columnList.columns" :key="columnIndex" :width="column.width"
             :index="columnIndex">
      </colgroup>
      <thead>
      <tr>
        <m-th v-for="(column,index) in columnList.columns" @mousedown="mouseDown($event,column)"
              :key="index" :height="table.headHeight" :table="table" :root-node="rootNode"
              :column="column"/>
      </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import LjsCheckBox from '../m-check-box/m-check-box.vue'
import MTh from '../m-th/m-th'
import ColumnList from '../ljs-tree-table/ColumnList'
import TreeNode from '../ljs-tree-table/TreeNode'

export default {
  name: 'm-thead',
  components: {MTh, LjsCheckBox},
  props: {
    rootNode: {type: TreeNode},
    table: {type: Object},
    columnList: {type: ColumnList}
  },
  data () {
    return {
      x: 0,
      resizeColumn: undefined
    }
  },
  methods: {
    onCheckChange (newVal) {
      this.table.checkAll(newVal)
    },
    mouseDown (event, column) {
      if (column.resize !== false) {
        this.resizeColumn = column
        this.x = event.x
      }
    },
    mouseUp () {
      this.resizeColumn = undefined
    },
    mouseMove (event) {
      if (this.resizeColumn) {
        let x = event.x
        let length = x - this.x
        length = Math.trunc(length)
        this.x = x
        let newSize = this.resizeColumn.width + length
        if (newSize < 20) newSize = 20
        if (length < 0 && this.fullWidth - this.width + 1 < Math.abs(length)) console.log('不能缩小')
        else this.resizeColumn.width = newSize
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../default-theme/vars";

  .m-thead {
    position: absolute;
    left: 0;
    @include w100;
    min-height: 15px;
    top: 0;
    overflow: hidden;
    table {
      @include w100;
      background-color: $table-head-bg-color;
      box-sizing: border-box;
      border-collapse: collapse;
      border: 1px $border-color solid;
      table-layout: fixed;
      word-break: break-all;
    }
    th {
      height: 30px;
    }
  }
</style>
