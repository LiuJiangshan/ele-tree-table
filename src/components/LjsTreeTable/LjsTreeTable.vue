<template>
    <div class="body" :style="{width:width+'px',height:height+'px'}" @keyup.up="up" @keyup.down="down"
         @keyup.left="left" @keyup.right="right" ref="treetable">
        <div v-if="debug"
             style="position: absolute;border:1px red solid;font-size: xx-small;color: red;right: 0;bottom: 0;">
            <div v-html="'width:'+width"></div>
            <div v-html="'fullWidth:'+fullWidth"></div>
            <div v-html="'canMove:'+canMove"></div>
            <div v-html="focusTd?('x:'+this.focusTd.x+',y:'+this.focusTd.y):'no focus'"></div>
        </div>
        <LjsContextMenu ref="menu" :context="this"/>
        <!--正常表格-->
        <!--表头-->
        <LjsThead @select-all="selectAll" :table="thisTable" :columns="columns" ref="header" :width="width"
                  :fullWidth="fullWidth"/>
        <!--表内容-->
        <LjsTbody :table="thisTable" :header="$refs.header" :width="width" :fullWidth="fullWidth"
                  :columns="columns">
            <!--表内容-->
            <LjsTr v-for="(data,dataIndex) in expandDatas" :key="dataIndex" :index="dataIndex" :data="data"
                   :table="thisTable">
            </LjsTr>
        </LjsTbody>

        <!--固定左列-->
        <LjsTableFix v-if="fixLeft&&fixLeftShow" :fixType="'left'">
            <LjsThead @select-all="selectAll" :table="thisTable" :columns="leftColumns" ref="leftHeader"
                      :width="leftFixWidth" :fullWidth="fullWidth"/>
            <!--表内容-->
            <LjsTbody :fix="true" ref="fixLeft" :table="thisTable" :columns="leftColumns"
                      :wrapWidth="leftFixWidth"
                      :tableWidth="leftFixWidth"
                      :height="height-headHeight">
                <!--表内容-->
                <LjsTr v-for="(data,dataIndex) in expandDatas" :key="dataIndex" :data="data" :table="thisTable">
                    <LjsEditTd v-for="(column,columnIndex) in leftColumns" :key="columnIndex" :table="thisTable"
                               :data="data"
                               :column="column"
                               :index="columnIndex" @on-check="onCheck"/>
                </LjsTr>
            </LjsTbody>
        </LjsTableFix>

        <!--固定右列-->

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
        </div>
    </div>
</template>
<script>
  import LjsEditTd from './LjsEditTd.vue'
  import LjsThead from './LjsThead.vue'
  import LjsTbody from './LjsTbody.vue'
  import LjsTableFix from './LjsTableFix.vue'
  import LjsTr from './LjsTr.vue'
  import LjsContextMenu from './LjsContextMenu.vue'

  export default {
    name: 'LjsTreeTable',
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
      // 是否显示边框
      border: {
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
        default: 30
      }
    },
    watch: {
      datas () { this.datasChanged() },
      columns () { this.init() }
    },
    computed: {
      thisTable: {
        get () { return this }
      },
      // 获取非固定列定义
      bodyColumns: {
        get () {
          let start = this.fixLeft ? 1 : 0
          let end = this.fixRight ? (this.columns.length - 2) : (this.columns.length - 1)
          return this.columns.slice(start, end)
        }
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
      // 获取组件当前宽度
      width: {
        get () {
          if (this.isMounted) return this.$refs.treetable.clientWidth
          else return 0
        }
      },
      // 获取组件当前高度
      height: {
        get () {
          if (this.isMounted) return this.$refs.treetable.clientHeight
          else return 0
        }
      }
    },
    components: {LjsThead, LjsTbody, LjsTr, LjsTableFix, LjsEditTd, LjsContextMenu},
    data () {
      return {
        // 格式化数据
        expandDatas: [],
        // 当前焦点单元格vue对象
        focusTd: undefined,
        fixLeftShow: true,
        fixRightShow: true,
        canMove: true,
        isMounted: false
      }
    },
    methods: {
      // datas被重新赋值,重新初始化
      datasChanged () {
        this.formatRoot()
        this.formatNode(this.datas)
        this.refresh()
      },
      refresh () {
        this.expandDatas = this.getAllData(this.datas)
      },
      // 同步表头、固定列滚动
      handleBodyScroll ($event, header, body) {
        header.$el.scrollLeft = body.$el.scrollLeft
        if (this.fixLeft) this.$refs.fixLeft.$el.scrollTop = body.$el.scrollTop
        if (this.fixRight) this.$refs.fixRight.$el.scrollTop = body.$el.scrollTop
      },
      // 判断该数据是否在此列有数据
      matchType (column, data) {
        return !column.type || column.type === data.pojo
      },
      // 全选
      selectAll (check) {
        for (let v = 0; v < this.expandDatas.length; v++) this.expandDatas[v].check = check
        this.onCheck()
      },
      // 选择发生变化回调
      onCheck () {
        let checkDatas = []
        for (let v = 0; v < this.expandDatas.length; v++) {
          let data = this.expandDatas[v]
          if (data.check === true) checkDatas.push(data)
        }
        this.$emit('on-check', checkDatas)
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
        else re = data.father.expand === true
        return re
      },
      // 将嵌套型数据转换为简单列表型数据
      getAllData (datas) {
        let array = []
        if (datas instanceof Array) {
          for (let v = 0; v < datas.length; v++) {
            let data = datas[v]
            if (this.isExpand(data)) array.push(data)
            // 递归子节点
            if (data.expand && data.nodes) array = [...array, ...this.getAllData(data.nodes)]
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
            let loadFunction = loader[node.pojo]
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
      nowFocus () { console.log(this.focusTd.data, this.focusTd.column) },
      printDatas () { console.log(this.datas) },
      printColumns () { console.log(this.columns) },
      printFormated () { console.log(this.expandDatas) },
      // 添加根节点
      root (data) {
        this.formatNode(data, undefined)
        this.datas.push(data)
      },
      // 添加兄弟节点
      brother (data, brother) {
        this.formatNode(brother, data.father)
        if (this.isRoot(data)) this.datas.push(brother)
        else data.father.nodes.push(brother)
        this.refresh()
      },
      // 添加子节点
      son (data, son) {
        this.formatNode(son, data)
        data.kids++
        // 节点已经展开
        if (data.expand) {
          data.nodes.push(son)
          this.refresh()
        } else data.nodes = true
      },
      // 删除节点
      remove (data) {
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
      // td获取到焦点事件
      onTdFocus (td, States) {
        if (this.focusTd !== undefined) this.focusTd.state = States.normal
        this.focusTd = td
        this.focusTd.state = States.select
      },
      // td失去焦点
      onTdBlur (td, States) {
        // td.state = States.normal
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
      init () {}
    },
    mounted () {
      this.init()
      this.isMounted = true
      this.datasChanged()
    }
  }
</script>
<style lang="scss" scoped>
    .body {
        position: relative;
    }
</style>
