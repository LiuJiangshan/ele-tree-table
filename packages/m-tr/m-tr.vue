<template>
  <tr class="tr" tabindex="0">
    <m-edit-td v-for="(column,columnIndex) in columnList.columns"
               :key="columnIndex" :index="columnIndex" :node="node"
               :column="column" :table="table"
               :tree-store="treeStore" :ref="'td'+columnIndex" :tr="getThis()"/>
  </tr>
</template>

<script>
import TreeNode from '../ljs-tree-table/TreeNode.js'
import MEditTd from '../m-edit-td/m-edit-td'
import ColumnList from '../ljs-tree-table/ColumnList'
import TreeStore from '../ljs-tree-table/TreeStore'

export default {
  name: 'm-tr',
  components: { MEditTd },
  props: {
    index: { type: Number },
    node: { type: TreeNode },
    columnList: { type: ColumnList },
    table: { type: Object },
    treeStore: { type: TreeStore }
  },
  methods: {
    getThis () {
      return this
    }
  },
  computed: {
    height () {
      let maxHeight = 0
      for (let height in this.heights) {
        if (height > maxHeight) maxHeight = height
      }
      if (maxHeight === 0) maxHeight = this.lineHeight
      return maxHeight
    }
  },
  data () {
    return {
      lineHeight: this.table.lineHeight,
      heights: {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .tr {
    overflow: hidden;
    outline: 0;
    background-color: white;
    &:hover {
      background-color: #fafafa;
    }
    &:focus {
      background-color: #f5f5f5;
    }
  }

  .tr_border {
    @extend .tr;
    border-bottom: 1px solid;
  }
</style>
