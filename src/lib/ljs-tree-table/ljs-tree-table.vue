<template>
  <div component="LjsTreeTable" author="LiuJiangshan" v-resize="onReSize"
       github="https://github.com/LiuJiangshan/LjsTreeTable"
       class="ljs-tree-table" @keyup.up="up" @scroll="onScroll"
       @keyup.down="down" @keyup.left="left" @keyup.right="right" ref="treetable">
    <div v-if="debug"
         style="position: absolute;border:1px red solid;font-size: xx-small;color: red;right: 0;bottom: 50px;">
      <div v-html="'width:'+width"></div>
      <div v-html="'canMove:'+canMove"></div>
      <div v-html="focusTd?('x:'+this.focusTd.x+',y:'+this.focusTd.y):'no focus'"></div>
    </div>
    <m-tbody :table="thisTable" :header="$refs.header" :width="width" :column-list="columnList" :nodes="rootNode.childs"
             :tree-store="treeStore"/>
    <m-thead :table="thisTable" ref="tableHeader" :column-list="columnList" :width="width"
             :root-node="rootNode"/>
    <!--debug视图-->
    <div v-if="debug" style="position: absolute;bottom: 0;left: 0;border: 1px red solid;">
      <input type="button" value="原始数据" @click="printDatas"/>
      <input type="button" value="列定义" @click="printColumns"/>
      <input type="button" value="转换后的数据" @click="printFormated"/>
      <input type="button" value="重新格式化数据" @click="formatNode(datas)"/>
      <input type="button" value="刷新" @click="refresh"/>
      <input type="button" value="当前焦点行" @click="nowFocus"/>
      <input type="button" value="全选" @click="selectAll"/>
      <input type="button" value="查看右键菜单定义" @click="showRightMenu"/>
      <input type="button" value="查看列定义" @click="showColunm"/>
      <input type="button" value="查看左边固定列定义" @click="showLeftFixColumn"/>
      <input type="button" value="查看中间列定义" @click="showBodyColumn"/>
      <input type="button" value="查看右边列定义" @click="showRightColumn"/>
      <input type="button" :value="(fixLeftShow?'隐藏':'显示')+'左边固定列'" @click="fixLeftShow=!fixLeftShow"/>
      <input type="button" :value="(fixRightShow?'隐藏':'显示')+'右边边固定列'" @click="fixRightShow=!fixRightShow"/>
      <input type="button" value="show $Refs" @click="showRefs"/>
      <input type="button" value="getSubmitData" @click="showSubmitData"/>
    </div>
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
    dataTypeField: {type: String, default: 'pojo'},
    rootLoader: {type: DataLoader},
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
    // 展开事件
    onExpand: {
      type: Function,
      default (data, goOn) { goOn() }
    },
    // 收起事件
    onClose: {
      type: Function,
      default (data, goOn) { goOn() }
    },
    // 判断是否root节点
    isRoot: {
      type: Function,
      default (data) {
        return data && data.father === false
      }
    },
    // 是否显示debug视图
    debug: {
      type: Boolean,
      default: false
    },
    // 是否显示表格边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否显示行边框
    trBorder: {
      type: Boolean,
      default: false
    },
    // 固定第一列到最左边
    fixLeft: {
      type: Boolean,
      default: false
    },
    // 固定第一列到最右边
    fixRight: {
      type: Boolean,
      default: false
    },
    // 表头高
    headHeight: {
      type: Number,
      default: 30
    },
    // 表格数据为空时显示的提示
    nullString: {
      default: ''
    },
    // 层级区分宽度
    deepWidth: {
      type: Number,
      default: 19
    },
    lineHeight: {
      type: Number,
      default: 28
    }
  },
  computed: {
    trBorderColor () { return '#E4E4E4' },
    borderColor () {
      return this.border ? '#E4E4E4' : 'transparent'
    },
    thisTable: {get () { return this }},
    // 获取非固定列定义
    bodyColumns () {
      let start = this.fixLeft ? 1 : 0
      let end = this.fixRight ? (this.columns.length - 2) : (this.columns.length - 1)
      return this.columns.slice(start, end)
    },
    // 获取第一列定义
    leftColumns: {
      get () { return [this.columns[0]] }
    },
    // 获取最后一列定义
    rightColumns: {
      get () { return [this.columns[this.columns.length - 1]] }
    },
    // 左边固定列总宽度
    leftFixWidth: {
      get () {
        let width = 0
        this.leftColumns.forEach(function (column) {
          width += column.width
        })
        return width
      }
    },
    // 右边固定列总宽度
    rightFixWidth: {
      get () {
        let width = 0
        this.rightColumns.forEach(function (column) {
          width += column.width
        })
        return width
      }
    }
  },
  data () {
    const store = new TreeStore(this.$props)
    const rootNode = new TreeNode({store, expand: true})
    return {
      width: 0,
      height: 0,
      treeStore: store,
      rootNode: rootNode,
      columnList: new ColumnList(this.columns),
      // 格式化数据
      expandDatas: [],
      // 当前焦点单元格vue对象
      focusTd: undefined,
      fixLeftShow: true,
      fixRightShow: true,
      canMove: true,
      submitTypes: {add: 'add', remove: 'remove', update: 'update'},
      scrollTop: 0
    }
  },
  methods: {
    onScroll () {
      this.$refs.tableHeader.$el.style.transform = `translateY(${this.$el.scrollTop}px)`
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
          onEnd: () => {
            this.rootLoader = this.rootLoader
          }
        }, node)
      }
    },
    showRightMenu () { console.log(this.rightMenu) },
    showColunm () { console.log(this.columns) },
    showLeftFixColumn () { console.log(this.leftColumns) },
    showBodyColumn () { console.log(this.bodyColumns) },
    showRightColumn () { console.log(this.rightColumns) },
    showRefs () { console.log(this.$refs, this.$refs.treetable.clientWidth, this.width) },
    showSubmitData () { console.log(this.getSubmitData()) },
    nowFocus () { console.log(this.focusTd.data, this.focusTd.column) },
    printDatas () { console.log(this.datas) },
    printColumns () { console.log(this.columns) },
    printFormated () { console.log(this.expandDatas) },
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
    },
    loadRoot () {
      this.rootLoader.load({
        onLoad: data => {
          this.rootNode.childs = []
          data.forEach(it => TreeNode.Builder({data: it, parent: this.rootNode, dataType: it[this.dataTypeField]}))
        },
        onError (e) {},
        onEnd () {}
      })
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
  @import "../../style/vars.scss";

  .ljs-tree-table {
    overflow: auto;
    position: relative;
    @include wh100;
  }
</style>
