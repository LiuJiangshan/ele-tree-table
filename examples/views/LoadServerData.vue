<template>
  <div>
    <div class="panel">
      <ljs-tree-table :tree-loader="treeProps.treeLoader" :columns="treeProps.columns"
                      :data-type-field="treeProps.dataTypeField" :child-count-field="treeProps.childCountField"
                      :custom-count-field="treeProps.customCountField" :menu-getter="treeProps.menuGetter"
                      :tree-updater="treeProps.treeUpdater" :is-leaf="treeProps.isLeaf" class="tree-style"
                      :show-head="treeProps.showHead"
                      :debug="treeProps.debug"/>
    </div>
    <el-switch v-model="treeProps.debug" active-text="打开调试" inactive-text="关闭调试"/>
    <el-switch v-model="treeProps.showHead" active-text="显示表头" inactive-text="隐藏表头"/>
  </div>
</template>
<script>
/* eslint-disable no-proto */
import baseService from '../../src/utils/baseService.js'
import DataLoader from '../../packages/ljs-tree-table/DataLoader'
import LjsTreeTable from '../../packages/ljs-tree-table/ljs-tree-table'

const productLineService = baseService('productline.json')
const productLineLoader = new DataLoader((cb, ctx) => productLineService.search().then(response => response.data.ok ? cb.onLoad(response.data.data) : cb.onError(response.data.msg)).catch(cb.onError).then(cb.onEnd))
export default {
  components: {LjsTreeTable},
  data () {
    return {
      treeProps: {
        debug: false,
        showHead: true,
        dataTypeField: 'pojo',
        childCountField: 'kids',
        customCountField: 'kids',
        treeLoader: productLineLoader,
        treeUpdater: productLineLoader,
        isLeaf: node => {
          return node.data.kids === 0
        },
        menuGetter (ctx) {
          if (ctx) {
            const node = ctx.node
            switch (node.data.pojo) {
              case 'ProductLine':
                return [
                  {
                    label: '刷新',
                    click () {
                      node.load()
                    }
                  },
                  {
                    label: '添加产品线',
                    click () {}
                  },
                  {
                    label: '删除产品线',
                    click () {
                      node.remove()
                    }
                  }
                ]
            }
          } else {
            return [{
              label: '添加产品线',
              click (context) {}
            }]
          }
        },
        // 列定义
        columns: [
          {
            type: 'expand',
            key: 'name',
            width: 100
          },
          {
            type: 'selection',
            key: 'id',
            width: 18
          },
          {
            label: '索引',
            width: 50,
            render (h, ctx) {
              return (<div>{ctx.node.index}</div>)
            }
          },
          {
            key: 'id',
            label: '编号',
            width: '10%'
          },
          {
            label: '名称',
            key: 'name',
            dataType: 'Product|ProductLine',
            width: 100
          },
          {
            label: '经理',
            key: 'managerName',
            width: 100
          },
          {
            dataType: 'Product',
            label: '产品ID',
            key: 'id',
            width: 100
          },
          {
            label: '详情',
            key: 'info',
            edit: true,
            width: 100
          },
          {
            label: '计划发布日期',
            key: 'planPublish',
            dataType: 'Product',
            width: 100,
            render (h, ctx) {
              return h('DatePicker')
            }
          },
          {
            label: '生产厂家',
            key: 'factory',
            edit: true,
            dataType: 'Product',
            width: 100
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../packages/default-theme/vars";

  .panel {
    //@include debug;
    position: absolute;
    top: 100px;
    left: 100px;
    width: 1000px;
    height: 500px;
  }

</style>
