<!--表头组件-->
<template>
  <div class="m-thead" :style="{width:width+'px',height:table.headHeight+'px'}" ref="header">
    <table @mouseup="mouseUp" @mouseleave="mouseUp" @mousemove="mouseMove($event)" class="head-table"
           :width="fullWidth?fullWidth:'100%'" border="1">
      <colgroup>
        <col v-for="(column,columnIndex) in columns" :key="columnIndex" :width="column.width"
             :index="columnIndex">
      </colgroup>
      <thead>
      <tr>
        <m-th v-for="(column,index) in columns" @mousedown="mouseDown($event,column)"
              :key="index" :width="column.width" :height="table.headHeight" :table="table"
              :column="column"/>
      </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import LjsCheckBox from '../m-check-box/m-check-box.vue'
import MTh from '../m-th/m-th'

export default {
  name: 'm-thead',
  components: {MTh, LjsCheckBox},
  props: {
    table: {
      type: Object
    },
    width: {
      type: Number
    },
    fullWidth: {
      type: Number
    },
    columns: {
      type: Array
    }
  },
  data () {
    return {
      // 是否全选
      check: false,
      x: 0,
      resizeColumn: undefined
    }
  },
  methods: {
    onCheckChange () {
      this.check = !this.check
      this.table.selectAll(this.check)
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
  @import "../../utils/mixin.scss";

  .m-thead {
    overflow: hidden;
    .head-table {
      box-sizing: border-box;
      border-collapse: collapse;
      border: none transparent;
      table-layout: fixed;
      word-break: break-all;
    }
  }
</style>
