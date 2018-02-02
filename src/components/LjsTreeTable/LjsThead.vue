<!--表头组件-->
<template>
    <div class="table_head_warp"
         :style="{width:width+'px',height:table.headHeight+'px'}" ref="header">
        <table @mouseup="mouseUp" @mouseleave="mouseUp" @mousemove="mouseMove($event)" class="head_table"
               :width="fullWidth?fullWidth:'100%'" :border="0"
               cellspacing="0" cellpadding="0">
            <colgroup>
                <col v-for="(column,columnIndex) in columns" :key="columnIndex" :width="column.width"
                     :index="columnIndex">
            </colgroup>
            <thead>
            <tr>
                <th v-for="(column,columnIndex) in columns"
                    :key="columnIndex" class="th" :width="column.width" :height="table.headHeight">
                    <div :class="column.resize?'th_warp_resizeable':'th_warp'" @mousedown="mouseDown($event,column)">
                        <div v-if="table.debug"
                             style="position: absolute;color: red;font-size: xx-small;right: 0;bottom: 0;"
                             v-html="'w:'+column.width"></div>
                        <input v-if="column.check" type="checkbox" style="margin-left: 31px;" @change="onChange"
                               v-model="check"/>
                        <span v-html="column.label" style="-webkit-user-select:none;user-select:none;"></span>
                    </div>
                </th>
            </tr>
            </thead>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'LjsThead',
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
      mouseDown (event, column) {
        if (column.resize === true) {
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
          this.x = x
          let newSize = this.resizeColumn.width + length
          if (newSize < 20) newSize = 20
          this.resizeColumn.width = newSize
        }
      },
      onChange () {
        this.table.selectAll(this.check)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .table_head_warp {
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .head_table {
        border-collapse: collapse;
        border: none transparent;
        table-layout: fixed;
        word-break: break-all;
    }

    .th {
        text-align: left;
        background-color: #F2F2F2;
        font-size: 11px;
    }

    .th_warp {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: Arial, 微软雅黑, serif;
        align-content: left;
        overflow: hidden;
        height: 30px;
        position: relative;
    }

    .th_warp_resizeable {
        @extend .th_warp;
        cursor: col-resize;
    }
</style>