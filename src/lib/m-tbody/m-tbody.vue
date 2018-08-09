<!--表格主体内容组件-->
<template>
  <div class="table-body-warp" :style="warpStyle">
    <table v-if="nodes&&nodes.length>0" border="1" cellspacing="0" cellpadding="0">
      <colgroup>
        <col v-for="(column,columnIndex) in columnList.columns" :key="columnIndex" :width="column.width">
      </colgroup>
      <m-render :render="renderTbody"/>
    </table>
    <div v-else class="table-empty" ref="tableEmpty"
         @contextmenu.prevent.stop="onRightMenuClick($event)">
      <span v-if="!fix" v-html="'暂无数据'"></span>
    </div>
  </div>
</template>

<script>
import MTr from '../m-tr/m-tr'
import ColumnList from '../ljs-tree-table/ColumnList'
import MRender from '../m-render/m-render'
import TreeStore from '../ljs-tree-table/TreeStore'
import resize from 'vue-resize-directive'

export default {
  components: {MRender, MTr},
  directives: {resize},
  props: {
    table: {type: Object},
    nodes: {type: Array},
    fix: {type: Boolean},
    header: {type: Object},
    columnList: {type: ColumnList},
    treeStore: {type: TreeStore},
    headerHeight: {type: Number}
  },
  name: 'm-tbody',
  computed: {
    warpStyle () {
      return {
        paddingTop: `${this.headerHeight}px`,
        height: `calc(100%-${this.headerHeight}px)`
      }
    }
  },
  methods: {
    onReSize () {
      console.log('resize')
    },
    renderTbody (h) {
      const trs = []
      this.renderTr(h, this.nodes, trs)
      return h('tbody', trs)
    },
    renderTr (h, nodes, trs) {
      if (nodes) {
        nodes.forEach(it => {
          it.index = trs.length
          this.treeStore.nodes[it.index] = it
          trs.push(h(MTr, {
            props: {
              columnList: this.columnList,
              node: it,
              table: this.table,
              treeStore: this.treeStore
            }
          }))
          if (it.expand) this.renderTr(h, it.childs, trs)
        })
      }
    },
    onRightMenuClick ($event) {
      this.$menu.rightMenu(this.table.emptyMenus, $event)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/vars.scss";

  .table-body-warp {
    @include w100;
    position: relative;
    background-color: white;
    > table {
      table-layout: fixed;
      @include w100;
      border-collapse: collapse;
      border: none;
    }
  }

  .table-empty {
    align-items: center;
    @include wh100;
    display: flex;
    cursor: help;
    align-content: center;
    justify-content: center;
    justify-items: center;
    background-color: white;
  }
</style>
