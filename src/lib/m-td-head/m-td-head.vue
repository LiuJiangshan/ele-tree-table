<!--单元格表头内容-->
<template>
  <div v-resize="onReSize" class="m-td-head" ref="mTdHead">
    <template v-if="column.allowExpand">
      <m-deep :value="node.level"/>
      <m-expand :style="{visibility:node.childCount===0?'hidden':'visible'}" v-model="node.expand"
                :loading="node.loading"/>
      <div class="label">{{node.data[column.key]}}</div>
      <div v-if="customCount!==undefined">
        <template v-if="customCount!==0">
          {{`(${customCount})`}}
        </template>
      </div>
      <div v-else-if="childCount!==undefined">
        <template v-if="childCount!==0">
          {{`(${childCount})`}}
        </template>
      </div>
    </template>
    <m-check-box v-else-if="column.allowSelection" v-model="node.check"/>
    <slot/>
  </div>
</template>

<script>
import MDeep from '../m-deep/m-deep'
import MExpand from '../m-expand/m-expand'
import MCheckBox from '../m-check-box/m-check-box'
import TreeNode from '../ljs-tree-table/TreeNode.js'
import resize from 'vue-resize-directive'
import Column from '../ljs-tree-table/Column'
import TreeStore from '../ljs-tree-table/TreeStore'

export default {
  name: 'm-td-head',
  components: {MCheckBox, MExpand, MDeep},
  directives: {resize},
  props: {
    td: {type: Object},
    node: {type: TreeNode},
    column: {type: Column},
    treeStore: {type: TreeStore}
  },
  computed: {
    customCount () {
      if (this.treeStore.customCountField) return this.node.data[this.treeStore.customCountField]
    },
    canExpand () { return this.column.type && this.column.type.indexOf('expand') !== -1 },
    canSelection () { return this.column.type && this.column.type.indexOf('selection') !== -1 },
    table: {get () { return this.td.tr.table }},
    data () { return this.node.data }
  },
  methods: {
    onReSize () {
      this.width = this.$el.clientWidth
    }
  },
  data () {
    return {width: 0, expand: false}
  },
  mounted () {
    this.onReSize()
  }
}
</script>

<style lang="scss" scoped>
  @import "../../utils/mixin.scss";

  .m-td-head {
    @include flex_h;
    flex-wrap: nowrap;
    @include h100;
    align-items: center;
    justify-content: flex-start;
    > .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .td_head {
    user-select: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: flex-start;
  }
</style>
