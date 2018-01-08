<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: 500px;overflow: scroll;">
      <LjsContextMenu ref="menu" :context="this"></LjsContextMenu>
      <div style="display: table;width: 100%;">
        <!--表头-->
        <div class="th">
          <div
            class="thd"
            :style="column.style"
            v-for="column in columns" v-html="column.label">
          </div>
        </div>
        <!--表内容-->
        <template v-for="data in allData">
          <div v-if="isExpand(data)"
               :data="data" class="tr" tabindex="0"
               @contextmenu.prevent="$refs.menu.open($event,getContextItems(data),{data:data,driver:driver,brother:brother,son:son,remove:remove})">
            <div class="td"
                 v-for="(column,index) in columns"
                 :column="column" :data="data" :key="index" @click="onTdClick(data,column)" :style="column.style">
              <template v-if="!column.type||column.type===data.pojo">
                <!--自定义渲染-->
                <RenderDiv v-if="column.render" :driver="driver" :render="column.render" :data="data" :column="column">
                </RenderDiv>
                <LjsEditTd v-if="!column.render" :data="data" :column="column" :bus="bus"
                           v-on:onExpandIconClick="onExpandIconClick"></LjsEditTd>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
    <template v-if="debug">
      <div>
        <input type="button" value="原始数据" @click="printDatas"/>
        <input type="button" value="转换后的数据" @click="printFormated"/>
        <input type="button" value="重新格式化数据" @click="formatNode(datas)"/>
        <input type="button" value="刷新" @click="refresh"/>
        <input type="button" value="当前焦点行" @click="nowFocus"/>
        <input type="button" value="查看右键菜单定义" @click="showRightMenu"/>
      </div>
      <div>
        <h4>v1.0</h4>
        <div></div>
      </div>
    </template>
  </div>
</template>
<script>
  import RenderDiv from './renderDiv.js'
  import LjsEditTd from './LjsEditTd.vue'
  import LjsContextMenu from './LjsContextMenu.vue'

  export default {
    name: "LjsTreeTable",
    props: {
      //子节点加载器
      driver: {
        type: Object,
        default() {
          return {}
        }
      },
      //右键菜单定义
      rightMenu: {
        type: Object,
        default() {
          return {}
        }
      },
      //列定义
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      //数据
      datas: {
        type: Array,
        default() {
          return []
        }
      },
      //展开事件
      onExpand: {
        type: Function,
        default: undefined
      },
      //收起事件
      onClose: {
        type: Function,
        default: undefined
      },
      //判断是否root节点
      isRoot: {
        type: Function,
        default: undefined
      },
      //事件总线
      bus: {
        type: Object
      },
      //是否显示debug视图
      debug: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      datas(newVal, oldVal) {
        this.formatNode(this.datas)
        this.refresh()
      }
    },
    components: {RenderDiv, LjsEditTd, LjsContextMenu},
    computed: {
      allData: {
        get() {
          return this.expandData
        },
        set(val) {
          this.expandData = val
        }
      }
    },
    data() {
      return {
        //格式化数据
        expandData: [],
        focusStatus: {
          data: {},
          column: {},
        }
      }
    },
    methods: {
      getContextItems(data) {
        return this.rightMenu[data.pojo]
      },
      onExpandIconClick(data) {
        var setExpand = this.setExpand
        var goOn = function () {
          setExpand(data, !data.expand)
        }
        //收起
        if (data.expand) {
          if (this.onClose) {
            this.onClose(data, goOn)
            return
          }
        }
        //展开
        else {
          if (this.onExpand) {
            this.onExpand(data, goOn)
            return
          }
        }
        goOn()
      },
      isExpand(data) {
        try {
          var re
          if (this.isRoot(data))
            re = true
          else if (data.father.expand === true)
            re = true
          else
            re = false
          return re
        }
        catch (e) {
          console.log('error:', data.name)
        }
      },
      getAllData(datas) {
        var isExpand = this.isExpand
        var getAllData = this.getAllData
        var array = []
        if (datas instanceof Array)
          datas.map(function (data) {
            if (isExpand(data))
              array.push(data)
            if (data.expand && data.nodes)
              array = [...array, ...getAllData(data.nodes)]
          })
        return array
      },
      onTdClick(node, column) {
        if (node) {
          this.refresh()
        }
      },
      //设置某个节点是否展开
      setExpand(node, expand) {
        var formatNode = this.formatNode
        var refresh = this.refresh
        var loader = this.driver.loader
        if (node) {
          node.expand = expand
          if (node.nodes instanceof Array)
            node.nodes.map(function (v) {
              formatNode(v, node)
            })
          //异步加载子节点
          else if (expand && node.nodes === true && typeof node.pojo === 'string') {
            var loadFunction = loader[node.pojo]
            if (loadFunction instanceof Function) {
              var okDo = function () {
                formatNode(node.nodes, node)
                refresh()
              }
              loadFunction(node, okDo)
            }
          }
        }
      },
      //递归格式化节点
      formatNode(node, father) {
        var formatNode = this.formatNode
        father = (father === undefined) ? false : father
        if (node instanceof Array) {
          node.map(function (v) {
            formatNode(v, father)
          })
        } else if (node instanceof Object) {
          //格式化root节点
          if (this.isRoot(node)) {
            node['father'] = false
            node['deep'] = 0
            if (node.expand === undefined)
              node['expand'] = false
          }
          //格式化子节点
          else {
            node['father'] = father
            node['deep'] = father.deep + 1
            if (node.expand === undefined)
              node['expand'] = false
            else if (node.expand === true) {
              if (node.nodes instanceof Array) {
                node.nodes.map(function (value) {
                  formatNode(value, node)
                })
              }
            }
          }
        }
      },
      showRightMenu() {
        console.log(this.rightMenu)
      },
      nowFocus() {
        console.log(this.focusStatus)
      },
      refresh() {
        this.allData = this.getAllData(this.datas)
      },
      printDatas() {
        console.log(this.datas)
      },
      printFormated() {
        console.log(this.allData)
      },
      //添加兄弟节点
      brother(data, brother) {
        this.formatNode(brother, data.father)
        if (this.isRoot(data))
          this.datas.push(brother)
        else
          data.father.nodes.push(brother)
        this.refresh()
      },
      //添加子节点
      son(data, son) {
        this.formatNode(son, data)
        data.kids++
        //节点已经展开
        if (data.expand) {
          data.nodes.push(son)
          this.refresh()
        }
        else
          data.nodes = true
      },
      //删除节点
      remove(data) {
        var nodes;
        var father
        if (this.isRoot(data))
          nodes = this.datas
        else if (data.father) {
          father = data.father
          nodes = data.father.nodes
        }
        if (nodes instanceof Array) {
          for (var v = 0; v < nodes.length; v++) {
            if (nodes[v] === data) {
              console.log('delete')
              nodes.splice(v, v + 1)
              if (father)
                father.kids--
              this.refresh()
              break
            }
          }
        }
      }
    },
    created() {
      this.formatNode(this.datas)
      this.refresh()
      this.bus.$on('onExpandIconClick', this.onExpandIconClick)
    }
  }
</script>
<style scoped>
  .th {
    display: table-header-group;
    background-color: #F2F2F2;
    height: 30px;
  }

  .tr {
    display: table-row;
    outline: 0;
    height: 28px;
    background-color: white;
  }

  .tr:hover {
    background-color: #fafafa;
  }

  .tr:focus {
    background-color: #f5f5f5;
  }

  .thd {
    display: table-cell;
    border-bottom: 1px solid #E4E4E4;
    height: 30px;
    vertical-align: middle;
    line-height: 30px;
  }

  .td {
    display: table-cell;
    border-bottom: 1px solid #E4E4E4;
    height: 28px;
    vertical-align: middle;
    line-height: 28px;
  }

</style>
