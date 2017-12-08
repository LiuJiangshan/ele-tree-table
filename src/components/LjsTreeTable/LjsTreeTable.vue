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
                <div v-if="column.expand" style="height: 2px;display: block;background: #a9ffde;border-radius: 5px;"
                     :style="{width: data.deep*deepWidth+'px'}"></div>
                <Icon :type="data.expand?'minus-round':'plus-round'" v-if="column.expand"
                      @click="onExpand(data)"></Icon>
                <div style="display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  <RenderDiv :render="column.render" :data="data" :column="column" style="display: block;">
                    {{data[column.key]}}
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
  </div>
</template>
<script>
  import axios from 'axios'
  import DatePicker from 'iview/src/components/date-picker/index.js'
  import Icon from 'iview/src/components/icon/index.js'
  import Message from 'iview/src/components/message/index.js'
  import 'iview/dist/styles/iview.css'
  import RenderDiv from './renderDiv.js'

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
      }
    },
    components: {'Icon': Icon, RenderDiv, 'DatePicker': DatePicker},
    methods: {},
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
        //格式化数据
        expandData: [],
      }
    },
    methods: {
      isExpand(data) {
        var re
        if (data.root === true)
          re = true
        else if (data.father.expand === true)
          re = true
        else
          re = false
        return re
      },
      getAllData(datas) {
        var isExpand = this.isExpand
        var getAllData = this.getAllData
        var array = []
        if (datas)
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
          if (column.expand)
            this.setExpand(node, !node.expand)
          else if (column.key === 'name') {
            this.addData(node)
          }
          this.refresh()
        }
      },
      //设置某个节点是否展开
      setExpand(node, expand) {
        var formatChild = this.formatChild
        var open = expand === true
        if (node) {
          node.expand = open
          if (node.nodes)
            node.nodes.map(function (v) {
              formatChild(v, node, node.deep + 1)
            })
        }
        if (node.expand)
          Message.success('展开:' + node.name)
        else
          Message.success('收起:' + node.name)
      },
      //格式化根节点数据格式
      formatRootData() {
        for (var rootItem of this.datas) {
          if (rootItem) {
            //深度
            rootItem['deep'] = 0
            //未展开
            rootItem['expand'] = false
            //未展开
            rootItem['root'] = true
          }
        }
      },
      //递归格式化子节点数据格式
      formatChild(node, father, deep) {
        var formatChild = this.formatChild
        if (node.deep === undefined)
          node['deep'] = deep
        if (node.expand === undefined)
          node['expand'] = false
        node['father'] = father
        if (node.expand && node.nodes) {
          node.nodes.map(function (v) {
            formatChild(v, node, deep + 1)
          })
        }
      },
      //格式化非根节点数据
      formatChildData() {
        var formatChild = this.formatChild
        this.datas.map(function (value) {
          if (value.nodes)
            value.nodes.map(function (v) {
              formatChild(value, v, 1)
            })
        })
      },
      formatData() {
        this.formatRootData()
        this.formatChildData()
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
      this.formatData()
      this.refresh()
    }
  }
</script>
