<!--单元格表头内容-->
<template>
  <div v-resize="onReSize" class="m-td-head" ref="mTdHead">
    <template v-if="column.allowExpand">
      <m-deep :value="node.level"/>
      <m-expand v-model="node.expand" @expand-changed="onExpandChange"/>
    </template>
    <m-check-box v-else-if="column.allowSelection" v-model="node.check"
                 @check-changed="onCheckChanged"/>
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

export default {
  name: 'm-td-head',
  components: {MCheckBox, MExpand, MDeep},
  directives: {resize},
  props: {
    td: {type: Object},
    node: {type: TreeNode},
    column: {type: Column}
  },
  computed: {
    canExpand () { return this.column.type && this.column.type.indexOf('expand') !== -1 },
    canSelection () { return this.column.type && this.column.type.indexOf('selection') !== -1 },
    table: {get () { return this.td.tr.table }},
    data () { return this.node.data }
  },
  methods: {
    onExpandChange (value) {
      this.table.setExpand(this.node, value)
    },
    onCheckChanged (newVal) {
      this.node.onCheckChanged(newVal)
    },
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
    display: inline-block;
    @include flex_h;
    @include h100;
    align-items: center;
    justify-content: flex-start;
  }

  .td_head {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: left;
  }
</style>
