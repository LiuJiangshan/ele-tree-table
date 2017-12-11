<template>
  <div>
    <div style="width: 100%;height: 500px;overflow: scroll;">
      <div style="display: table;width: 100%;">
        <!--表头-->
        <div style="display: table-header-group;">
          <div
            style="display: table-cell;padding-left:10px;border-bottom:1px solid #ddd;height:34px;vertical-align:middle;line-height:34px;"
            :style="column.style"
            v-for="column in columns">{{column.label}}
          </div>
        </div>
        <!--表内容-->
        <template v-for="data in allData">
          <div style="display: table-row;" v-if="isExpand(data)">
            <div :style="column.style"
                 style="padding-left:10px;display: table-cell;border-bottom: 1px solid #ebebeb;height: 34px;vertical-align:middle;line-height: 34px;"
                 v-for="(column,index) in columns"
                 :column="column" :data="data" :key="index">
              <div @click="onTdClick(data,column)"
                   style="display:flex;flex-direction: row;align-items:center;justify-content:left;width:100%;height:100%;">
                <div v-if="column.expand"
                     style="height: 2px;display: block;border-bottom:1px dotted #BA0FFF;border-top: 1px dotted #BA0FFF;border-radius: 5px;"
                     :style="{width: data.deep*deepWidth+'px'}"></div>
                <img v-if="column.expand&&data.nodes!==false" @click="onExpandIconClick(data)"
                     :src="data.expand?image.expand_open:image.expand_close"/>
                <div style="display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  <RenderDiv :render="column.render" :data="data" :column="column" style="display: block;">
                  </RenderDiv>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <input type="button" value="原始" @click="printDatas"/>
    <input type="button" value="转换后" @click="printFormated"/>
    <input type="button" value="重新格式化" @click="formatNode(datas)"/>
    <input type="button" value="刷新" @click="refresh"/>
  </div>
</template>
<script>
  import axios from 'axios'
  import DatePicker from 'iview/src/components/date-picker/index.js'
  import Icon from 'iview/src/components/icon/index.js'
  import Message from 'iview/src/components/message/index.js'
  import 'iview/dist/styles/iview.css'
  import RenderDiv from './renderDiv.js'
  import expand_open from './image/expand_open.gif'
  import expand_close from './image/expand_close.gif'

  export default {
    name: "LjsTreeTable",
    props: {
      //子节点加载器
      loader: {
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
      }
    },
    watch: {
      datas(newVal, oldVal) {
        this.formatNode(this.datas)
        this.refresh()
      }
    },
    components: {'Icon': Icon, RenderDiv, 'DatePicker': DatePicker},
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
        deepWidth: 30,
        image: {
          expand_open: expand_open,
          expand_close: expand_close
        },
        //格式化数据
        expandData: [],
      }
    },
    methods: {
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
        var open = expand === true
        var loader = this.loader
        if (node) {
          node.expand = open
          if (node.nodes instanceof Array)
            node.nodes.map(function (v) {
              formatNode(v, node)
            })
          //异步加载子节点
          else if (open === true && node.nodes === true && typeof node.pojo === 'string') {
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
        if (node.expand)
          Message.success('展开:' + node.name)
        else
          Message.success('收起:' + node.name)
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
      refresh() {
        this.allData = this.getAllData(this.datas)
      },
      printDatas() {
        console.log(this.datas)
      },
      printFormated() {
        console.log(this.allData)
      },
      addData(fatherNode) {
        if (fatherNode) {
          if (fatherNode.nodes === undefined)
            fatherNode.nodes = []
          var addObj = {id: '1', name: ''}
          for (var v = 0; v < fatherNode.deep; v++) {
            addObj.id += '.1'
            addObj.name += (v + '_')
          }
          this.formatChild(addObj, fatherNode, fatherNode.deep + 1)
          fatherNode.nodes.push(addObj)
          Message.success('添加成功:' + addObj.name)
        }
      }
    },
    created() {
      this.formatNode(this.datas)
      this.refresh()
    }
  }
</script>
