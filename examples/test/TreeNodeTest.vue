<template>
  <div>
    <i-button @click="getExpandNodesTest">getExpandNodesTest</i-button>
  </div>
</template>

<script>
import TreeNode from '../../packages/ljs-tree-table/TreeNode.js'

export default {
  name: 'TreeNodeTest',
  methods: {
    getExpandNodesTest () {
      let root = new TreeNode({name: 'root'})
      root.setExpand(true)
      let child1 = new TreeNode({name: 'child1'})
      child1.setExpand(true)
      let child2 = new TreeNode({name: 'child2'})
      child2.setExpand(true)
      root.childs = [child1, child2]
      console.log(root.getExpandNodes())
    }
  },
  mounted () { }
}
</script>

<style scoped>

</style>
