<template>
  <div component="LjsTreeTable" author="LiuJiangshan"
       github="https://github.com/LiuJiangshan/LjsTreeTable"
       class="ljs-treetable" @keyup.up="up"
       @keyup.down="down" :style="{width:width===0?600:width+'px'}"
       @keyup.left="left" @keyup.right="right" ref="treetable">
    <div v-if="debug"
         style="position: absolute;border:1px red solid;font-size: xx-small;color: red;right: 0;bottom: 50px;">
      <div v-html="'width:'+width"></div>
      <div v-html="'fullWidth:'+fullWidth"></div>
      <div v-html="'canMove:'+canMove"></div>
      <div v-html="focusTd?('x:'+this.focusTd.x+',y:'+this.focusTd.y):'no focus'"></div>
    </div>
    <m-context-menu ref="menu" :context="this"/>
    <m-thead @select-all="selectAll" :table="thisTable" :columns="columns" ref="header" :width="width"
             :fullWidth="fullWidth"/>
    <m-tbody :table="thisTable" :header="$refs.header" :width="width" :fullWidth="fullWidth"
             :columns="columns">
      <m-tr v-for="(data,dataIndex) in expandDatas" :key="dataIndex" :index="dataIndex" :data="data"
            :table="thisTable">
      </m-tr>
    </m-tbody>

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
import MTr from '../m-tr/m-tr'
import MTableFix from '../m-table-fix/m-table-fix'
import MEditTd from '../m-edit-td/m-edit-td'

export default {
  name: 'ljs-tree-table',
  components: {MEditTd, MTableFix, MTr, MTbody, MThead, MContextMenu},
  props: {
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
    // 数据
    datas: {
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
  watch: {
    datas () {
      this.formatRoot()
      this.formatNode(this.datas)
      this.refresh()
    },
    columns () {
      this.formatColumns()
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
    },
    // 自动计算表格宽度
    fullWidth: {
      get () {
        let fullWidth = 0
        for (let v = 0; v < this.columns.length; v++) {
          let column = this.columns[v]
          // 注册响应式布局
          if (!column.width) this.$set(column, 'width', 100)
          fullWidth += column.width
        }
        return fullWidth
      }
    },
    // 获取组件当前高度
    height: {
      get () {
        if (this.isMounted) return this.$refs.treetable.clientHeight
        else return this.treeTableWidth
      },
      set (val) { this.treeTableWidth = val }
    }
  },
  data () {
    return {
      treeTableWidth: 600,
      width: 0,
      // 格式化数据
      expandDatas: [],
      // 当前焦点单元格vue对象
      focusTd: undefined,
      fixLeftShow: true,
      fixRightShow: true,
      canMove: true,
      isMounted: false,
      submitTypes: {add: 'add', remove: 'remove', update: 'update'}
    }
  },
  methods: {
    // 获取提交数据
    getSubmitData () {
      return this.getAllData(this.datas, false, true)
    },
    formatColumns () {
      if (this.fullWidth < this.width) {
        let heapWidth = 0
        for (let i = 0; i < this.columns.length; i++) {
          let r
          let column = this.columns[i]
          if (i === this.columns.length - 1) {
            r = undefined
            // 最后一个单元格占满剩余宽度(减去边框宽度)
            column.width = this.width - heapWidth - 1
          } else {
            r = column.width / this.fullWidth
            column.width = r * this.width
            column.width = Math.trunc(column.width)
          }
          heapWidth += column.width
        }
      }
    },
    refresh () { this.expandDatas = this.getAllData(this.datas) },
    // 同步表头、固定列滚动
    handleBodyScroll ($event, header, body) {
      header.$el.scrollLeft = body.$el.scrollLeft
      if (this.fixLeft) this.$refs.fixLeft.$el.scrollTop = body.$el.scrollTop
      if (this.fixRight) this.$refs.fixRight.$el.scrollTop = body.$el.scrollTop
    },
    // 判断该数据是否在此列有数据
    matchType (column, data) {
      return !column.dataType ||
        (column.dataType.search(`^${data.pojo}$`) >= 0 ||
          column.dataType.search(`!^|${data.pojo}|!$`) >= 0 ||
          column.dataType.search(`^${data.pojo}|!$`) >= 0 ||
          column.dataType.search(`!^|${data.pojo}$`) >= 0)
    },
    // 全选
    selectAll (check) {
      this.expandDatas.forEach(item => { this.$set(item, 'selection', check) })
    },
    // 获取右键菜单上下文
    getMenuContext (data) {
      return {
        // 当前行数据
        data: data,
        driver: this.driver,
        brother: this.brother,
        son: this.son,
        remove: this.remove,
        root: this.root
      }
    },
    // 通过节点数据获取菜单数据
    getContextItems (data) { return this.rightMenu[data.pojo] },
    // 展开图标点击事件
    onExpandIconClick (data) {
      let setExpand = this.setExpand
      let goOn = function () {
        setExpand(data, !data.expand)
      }
      // 收起
      if (data.expand) this.onClose(data, goOn)
      // 展开
      else this.onExpand(data, goOn)
    },
    // 判断某个节点的父节点是否被展开
    isExpand (data) {
      let re = false
      if (this.isRoot(data)) re = true
      else if (data.father && data.father.expand === true) re = true
      return re
    },
    // 将嵌套型数据转换为简单列表型数据
    getAllData (datas, checkExpand = true, checkSubmit = false) {
      let array = []
      if (datas instanceof Array) {
        for (let v = 0; v < datas.length; v++) {
          let data = datas[v]
          if (this.isExpand(data) || checkExpand) {
            if (!checkSubmit || data.submitType) array.push(data)
          }
          // 递归子节点
          if (!checkExpand || (data.expand && data.nodes)) array = [...array, ...this.getAllData(data.nodes, checkExpand, checkSubmit)]
        }
      }
      return array
    },
    // 设置某个节点是否展开
    setExpand (node, expand) {
      let formatNode = this.formatNode
      let refresh = this.refresh
      let loader = this.driver.loader

      node.expand = expand
      // 格式化待展开节点
      if (node.nodes instanceof Array) for (let v = 0; v < node.nodes.length; v++) formatNode(node.nodes[v], node)

      // 展开
      if (expand) {
        // 加载子节点
        if (node.nodes === true) {
          let loadFunction
          loadFunction = loader[node.pojo]
          if (loadFunction instanceof Function) {
            let okDo = function () {
              formatNode(node.nodes, node)
              refresh()
            }
            loadFunction(node, okDo)
          }
        } else refresh()
      } else refresh()
    },
    // 递归格式化节点
    formatNode (node, father) {
      let formatNode = this.formatNode
      father = (father === undefined) ? false : father
      if (node instanceof Array) {
        node.map(function (v) {
          formatNode(v, father)
        })
      } else if (node instanceof Object) {
        if (node.check === undefined) this.$set(node, 'check', false)
        if (node.kids === undefined) this.$set(node, 'kids', node.nodes instanceof Array ? node.nodes.length : false)
        // 格式化root节点
        if (this.isRoot(node)) {
          this.$set(node, 'father', false)
          this.$set(node, 'deep', 0)
          if (node.expand === undefined) this.$set(node, 'expand', false)
        } else {
          // 格式化子节点
          this.$set(node, 'father', father)
          this.$set(node, 'deep', father.deep + 1)
          if (node.expand === undefined) this.$set(node, 'expand', false)
          else if (node.expand === true) {
            if (node.nodes instanceof Array) {
              node.nodes.forEach(function (value) {
                formatNode(value, node)
              })
            }
          }
        }
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
    // 添加根节点
    root (data) {
      this.formatNode(data, undefined)
      data.submitType = this.submitTypes.add
      this.datas.push(data)
    },
    // 添加兄弟节点
    brother (data, brother) {
      brother.submitType = this.submitTypes.add
      this.formatNode(brother, data.father)
      if (this.isRoot(data)) this.datas.push(brother)
      else data.father.nodes.push(brother)
      this.refresh()
    },
    // 添加子节点
    son (data, son) {
      if (this.submitTypes.add !== data.submitType) son.submitType = this.submitTypes.add
      this.formatNode(son, data)
      data.kids++
      // 节点已经展开
      if (data.expand || !this.driver || !this.driver.adder) {
        if (!(data.nodes instanceof Array)) data.nodes = []
        data.nodes.push(son)
        this.refresh()
      } else data.nodes = true
    },
    // 删除节点
    remove (data) {
      if (data.submitType) {
        let nodes
        let father
        if (this.isRoot(data)) nodes = this.datas
        else if (data.father) {
          father = data.father
          nodes = data.father.nodes
        }
        if (nodes instanceof Array) {
          for (let v = 0; v < nodes.length; v++) {
            if (nodes[v] === data) {
              nodes.splice(v, 1)
              if (father) father.kids--
              this.refresh()
              break
            }
          }
        }
      } else {
        this.$set(data, 'remove', true)
        data.submitType = this.submitTypes.remove
      }
      this.refresh()
      // let nodes
      // let father
      // if (this.isRoot(data)) nodes = this.datas
      // else if (data.father) {
      //   father = data.father
      //   nodes = data.father.nodes
      // }
      // if (nodes instanceof Array) {
      //   for (let v = 0; v < nodes.length; v++) {
      //     if (nodes[v] === data) {
      //       nodes.splice(v, 1)
      //       if (father) father.kids--
      //       this.refresh()
      //       break
      //     }
      //   }
      // }
    },
    formatRoot () {
      for (let v; v < this.datas.length; v++) {
        let data = this.datas[v]
        this.$set(data, 'supperId', -1)
      }
    },
    // 将tr组件vue实例与数据绑定
    bindTr (tr) { tr.data.tr = tr },
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
    right () { this.move(1, 0) }
  },
  created () {
    this.formatRoot()
    this.formatNode(this.datas)
    this.refresh()
  },
  mounted () {
    this.isMounted = true
    this.width = this.$refs.treetable.clientWidth
    this.formatColumns()
    let _this = this
    window.addEventListener('resize', function () {
      _this.width = _this.$refs.treetable.clientWidth
      _this.formatColumns()
    })
  }
}
</script>
<style lang="scss" scoped>
  .ljs-treetable {
  }
</style>
