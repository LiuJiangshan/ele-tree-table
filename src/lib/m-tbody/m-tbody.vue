<!--表格主体内容组件-->
<template>
  <div v-if="nodes&&nodes.length>0" class="table-body-warp" :style="bodyStyle" @scroll="onScroll">
    <table class="body_table" :style="tableStyle" border="1" cellspacing="0"
           cellpadding="0">
      <colgroup>
        <col v-for="(column,columnIndex) in columnList.columns" :key="columnIndex" :width="column.width">
      </colgroup>
      <tbody>
      <m-tr v-for="(node,trIndex) in nodes" :key="trIndex" :index="trIndex" :column-list="columnList" :node="node"
            :table="table"/>
      </tbody>
    </table>
  </div>
  <div v-else class="table-empty" :style="bodyStyle" ref="tableEmpty"
       @contextmenu.prevent.stop="onRightMenuClick($event)">
    <span v-if="!fix" v-html="'暂无数据'"></span>
  </div>
</template>

<script>
import MTr from '../m-tr/m-tr'
import ColumnList from '../ljs-tree-table/ColumnList'

export default {
  components: {MTr},
  props: {
    table: {type: Object},
    nodes: {type: Array},
    fix: {type: Boolean},
    header: {type: Object},
    columnList: {type: ColumnList},
    // 表格包裹层宽度
    width: {type: Number},
    // 表格宽度
    fullWidth: {type: Number}
  },
  name: 'm-tbody',
  computed: {
    // 表体高度
    height: {get () { return this.table.height - this.table.headHeight }},
    tableStyle: {
      get () {
        return {
          borderColor: this.table.borderColor,
          width: this.fix ? 'auto' : this.fullWidth + 'px'
        }
      }
    },
    bodyStyle: {
      get () {
        let bodyStyle = {width: this.width + 'px'}
        if (this.height) { bodyStyle.height = this.height + 'px' }
        return bodyStyle
      }
    }
  },
  methods: {
    onRightMenuClick ($event) {
      this.$menu.rightMenu(this.table.emptyMenus, $event)
    },
    onScroll (event) {
      if (this.header) this.table.handleBodyScroll(event, this.header, this)
    }
  }
}
</script>

<style lang="scss" scoped>

  .table-body-warp {
    overflow: auto;
    background-color: white;
  }

  .table-empty {
    align-items: center;
    display: flex;
    cursor: help;
    align-content: center;
    justify-content: center;
    justify-items: center;
    background-color: white;
  }

  .body_table {
    table-layout: fixed;
    border-collapse: collapse;
    border: none;
  }
</style>
