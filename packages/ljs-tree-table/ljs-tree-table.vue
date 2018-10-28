<template>
  <div component="LjsTreeTable" author="LiuJiangshan" v-resize="onReSize"
       github="https://github.com/LiuJiangshan/LjsTreeTable"
       class="ljs-tree-table" @scroll="onScroll" ref="treetable">
    <div v-if="debug"
         style="position: absolute;border:1px red solid;font-size: xx-small;color: red;right: 0;bottom: 50px;">
      <div v-html="'width:'+width"></div>
      <div v-html="'canMove:'+canMove"></div>
      <div v-html="focusTd?('x:'+this.focusTd.x+',y:'+this.focusTd.y):'no focus'"></div>
    </div>
    <m-tbody :table="thisTable" :header="$refs.header" :width="width" :column-list="columnList" :nodes="rootNode.childs"
             :header-height="headerHeight" :tree-store="treeStore"/>
    <m-thead :table="thisTable" ref="tableHeader" :column-list="columnList" :root-node="rootNode" v-if="showHead"/>
  </div>
</template>
<script>
import MContextMenu from '../m-context-menu/m-context-menu'
import MThead from '../m-thead/m-thead'
import MTbody from '../m-tbody/m-tbody'
import MTableFix from '../m-table-fix/m-table-fix'
import MEditTd from '../m-edit-td/m-edit-td'
import TreeNode from './TreeNode.js'
import DataLoader from './DataLoader.js'
import resize from 'vue-resize-directive'
import scroll from 'vue-scroll'
import ColumnList from './ColumnList'
import TreeStore from './TreeStore.js'

export default {
  name: 'ljs-tree-table',
  directives: {resize, scroll},
  components: {MEditTd, MTableFix, MTbody, MThead, MContextMenu},
  props: {
    showHead: {type: Boolean, default: true},
    noBorder: {type: Boolean, default: false},
    dataTypeField: {type: String},
    treeLoader: {type: DataLoader},
    treeUpdater: {type: DataLoader},
    menuGetter: {type: Function},
    isLeaf: {type: Function},
    childCountField: {type: String},
    customCountField: {type: String},
    // 子节点数据驱动
    driver: {
      type: Object,
      default () {
        return {}
      }
    },
    // 右键菜单定义
    rightMenu: {
      type: Object,
      default () {
        return {}
      }
    },
    // 列定义
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否显示debug视图
    debug: {
      type: Boolean,
      default: false
    },
    // 表格数据为空时显示的提示
    nullString: {
      default: ''
    }
  },
  computed: {
    thisTable () { return this }
  },
  data () {
    const store = new TreeStore(this.$props)
    const rootNode = new TreeNode({store, expand: true})
    return {
      width: 0,
      height: 0,
      headerHeight: 0,
      treeStore: store,
      rootNode: rootNode,
      columnList: new ColumnList(this.columns),
      // 格式化数据
      expandDatas: [],
      // 当前焦点单元格vue对象
      focusTd: undefined,
      canMove: true,
      submitTypes: {add: 'add', remove: 'remove', update: 'update'},
      scrollTop: 0
    }
  },
  methods: {
    onScroll () {
      if (this.showHead) this.$refs.tableHeader.$el.style.transform = `translateY(${this.$el.scrollTop}px)`
    },
    // 获取提交数据
    getSubmitData () {
      return this.getAllData(this.datas, false, true)
    },
    // 判断该数据是否在此列有数据
    matchType (column, data) {
      return !column.dataType ||
        (column.dataType.search(`^${data.pojo}$`) >= 0 ||
          column.dataType.search(`!^|${data.pojo}|!$`) >= 0 ||
          column.dataType.search(`^${data.pojo}|!$`) >= 0 ||
          column.dataType.search(`!^|${data.pojo}$`) >= 0)
    },
    setExpand (node, expand) {
      node.setExpand(expand)
      if (!node.childs) {
        this.treeLoader.load({
          onLoad (data) {
            data.forEach(it => TreeNode.Builder({data: it, parent: node, dataType: it[this.dataTypeField]}))
          },
          onError () {},
          onEnd: () => { }
        }, node)
      }
    },
    // 将tr组件vue实例与数据绑定
    bindTr (tr) { tr.node.tr = tr },
    // 将td组件vue实例与数据绑定
    bindTd (td) {
      if (!td.tr.tds) td.tr.tds = []
      let tds = td.tr.tds
      tds[td.index] = td
    },
    // 移动
    move (x, y) {
      if (!this.canMove) {
        console.log('can not move')
        return
      }
      if (this.focusTd) {
        let lastX = this.focusTd.x
        let lastY = this.focusTd.y
        let nextX = lastX + x
        let nextY = lastY + y
        // 判断是否超出边界
        if (nextY >= 0 && nextY < this.expandDatas.length && nextX >= 0 && nextX < this.columns.length) {
          let focusTd = this.expandDatas[nextY].tr.tds[nextX]
          if (this.focusTd) this.focusTd.blur()
          if (focusTd) focusTd.focus()
        } else {
          console.log('超出边界', nextX, nextY)
          return false
        }
      } else {
        console.log('未获取焦点')
        return false
      }
    },
    up () { this.move(0, -1) },
    down () { this.move(0, 1) },
    left () { this.move(-1, 0) },
    right () { this.move(1, 0) },
    onReSize () {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
      if (this.showHead) this.headerHeight = this.$refs.tableHeader.$el.clientHeight
    },
    loadRoot () {
      this.treeLoader.load({
        onLoad: data => {
          this.rootNode.childs = []
          data.forEach(it => TreeNode.Builder({data: it, parent: this.rootNode, dataType: it[this.dataTypeField]}))
        },
        onError (e) {},
        onEnd () {}
      }, this.rootNode)
    }
  },
  created () {
  },
  mounted () {
    window.ljsTreeTable = this
    this.onReSize()
    this.onScroll()
  }
}
</script>
<style lang="scss" scoped>
  @import "../default-theme/vars";

  .ljs-tree-table {
    overflow: auto;
    position: relative;
    @include wh100;
  }
</style>
