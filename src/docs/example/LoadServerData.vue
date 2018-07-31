<template>
  <div>
    <div class="panel">
      <ljs-tree-table :root-loader="rootLoader" :border="border" :columns="columns" :driver="driver"
                      :rightMenu="rightMenu"
                      :onExpand="onExpand" style="width:100%;height:100%;" :onClose="onClose" :debug="debug"
                      :fixLeft="fixLeft" :fixRight="fixRight"
                      @on-check="onCheck"/>
    </div>
    <input type="button" @click="debug=!debug" :value="debug?'关闭调试':'打开调试'"/>
    <input type="button" :value="border?'隐藏边框':'显示边框'" @click="border=!border"/>
  </div>
</template>
<script>
/* eslint-disable no-proto */

import axios from 'axios'
import LjsTreeTable from '../../lib/ljs-tree-table/ljs-tree-table'
import baseService from '../../utils/baseService.js'

const productLineService = baseService('productline.json')

export default {
  components: {LjsTreeTable},
  data () {
    return {
      debug: false,
      border: true,
      fixLeft: false,
      fixRight: false,
      // 数据驱动
      driver: {
        // 子节点加载器
        loader: {
          ProductLine (node, refresh) {
            node['nodes'] = []
            // 加载子产品组
            axios({
              method: 'GET',
              url: window.apiUrl + '/productline.json',
              params: {superId: node.id, onePageShow: 10000}
            })
              .then(function (response) {
                let datas = response.data.data
                if (datas instanceof Array) datas.map(function (val) { node.nodes.push(val) })
                refresh()
              })
              .catch(function (error) {
                console.log(error)
              })
            // 加载子产品
            axios({
              method: 'GET',
              url: window.apiUrl + '/product.json',
              params: {productLineId: node.id, onePageShow: 10000}
            }).then(function (response) {
              let datas = response.data.data
              if (datas instanceof Array) datas.map(function (val) { node.nodes.push(val) })
              refresh()
            }).catch(function (error) {
              console.log(error)
            })
          },
          Product (node, refresh) {
            node['nodes'] = []
            axios({
              method: 'GET',
              url: window.apiUrl + '/product.json',
              params: {superId: node.id, onePageShow: 10000}
            })
              .then(function (response) {
                let datas = response.data.data
                if (datas instanceof Array) datas.map(function (val) { node.nodes.push(val) })
                refresh()
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        },
        // 更新器
        updater: {
          ProductLine (data, column) {
            let params = {id: data.id}
            params[column.key] = data[column.key]
            axios({
              method: 'put',
              url: window.apiUrl + '/productline.json',
              data: params
            })
              .then(function (response) {
                let msg = response.data.msg
                console.log(msg)
              })
              .catch(function (error) {
                console.log(error)
              })
          },
          Product (data, column) {
            let params = {id: data.id}
            params[column.key] = data[column.key]
            axios({
              method: 'put',
              url: window.apiUrl + '/product.json',
              data: params
            })
              .then(function (response) {
                let msg = response.data.msg
                console.log(msg)
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        },
        // 添加器
        adder: {
          Product (data, cb) {
            axios({
              method: 'POST',
              url: window.apiUrl + '/product.json',
              data: data
            })
              .then(cb)
              .catch(function (error) {
                console.log(error)
              })
          },
          ProductLine (data, cb) {
            axios({
              method: 'POST',
              url: window.apiUrl + '/productline.json',
              data: data
            })
              .then(cb)
              .catch(function (error) {
                console.log(error)
              })
          }
        },
        // 删除器
        deleter: {
          Product (data, cb) {
            axios({
              method: 'delete',
              url: window.apiUrl + '/product.json',
              data: [data.id]
            })
              .then(cb)
              .catch(function (error) {
                console.log(error)
              })
          },
          ProductLine (data, cb) {
            axios({
              method: 'delete',
              url: window.apiUrl + '/productline.json',
              data: [data.id]
            })
              .then(cb)
              .catch(function (error) {
                console.log(error)
              })
          }
        }
      },
      // 右键菜单定义
      rightMenu: {
        empty: [{
          label: '添加产品线',
          click (context) {
            let adder = context.driver.adder
            let add = adder['ProductLine']
            let addData = {
              name: '请输入产品线名称',
              pojo: 'ProductLine',
              nodes: false,
              superId: -1
            }
            add(addData, function (response) {
              if (response.data.ok) addData.id = response.data.id
              context.root(addData)
            })
          }
        }],
        ProductLine: [
          {
            label: '删除产品线',
            click (context) {
              let driver = context.driver
              let data = context.data
              let _delete = driver.deleter['ProductLine']
              _delete(data, function (response) {
                if (response.data.ok) context.remove(data)
              })
            }
          },
          {
            label: '添加同级产品线',
            click (context) {
              let data = context.data
              let adder = context.driver.adder
              let add = adder['ProductLine']
              let addData = {
                name: '请输入产品线名称',
                pojo: 'ProductLine',
                nodes: false,
                superId: data.superId
              }
              add(addData, function (response) {
                if (response.data.ok) addData.id = response.data.id
                context.brother(data, addData)
              })
            }
          },
          {
            label: '添加子级产品线',
            click (context) {
              let adder = context.driver.adder
              let data = context.data
              let add = adder['ProductLine']
              let addData = {
                name: '请输入产品线名称',
                pojo: 'ProductLine',
                superId: data.id,
                nodes: false
              }
              add(addData, function (response) {
                if (response.data.ok) {
                  addData.id = response.data.id
                  context.son(data, addData)
                }
              })
            }
          },
          {
            label: '添加子级产品',
            click (context) {
              let data = context.data
              let adder = context.driver.adder
              let add = adder['Product']
              let addData = {
                name: '请输入产品名称',
                pojo: 'Product',
                productLineId: data.id,
                nodes: false
              }
              add(addData, function (response) {
                if (response.data.ok) addData.id = response.data.id
                context.son(data, addData)
              })
            }
          }
        ],
        Product: [
          {
            label: '删除产品',
            click (context) {
              let driver = context.driver
              let data = context.data
              let _delete = driver.deleter['Product']
              _delete(data, function (response) {
                if (response.data.ok) context.remove(data)
              })
            }
          },
          {
            label: '添加同级产品',
            click (context) {
              let data = context.data
              let adder = context.driver.adder
              let add = adder['Product']
              let addData = {
                name: '请输入产品名称',
                pojo: 'Product',
                productLineId: data.productLineId,
                nodes: false
              }
              add(addData, function (response) {
                if (response.data.ok) addData.id = response.data.id
                context.brother(data, addData)
              })
            }
          }
        ]
      },
      // 列定义
      columns: [
        {
          type: 'expand',
          width: 100
        },
        {
          type: 'selection',
          key: 'id',
          width: 50
        },
        {
          label: '名称',
          key: 'name',
          dataType: 'Product|ProductLine',
          width: 100
        },
        {
          edit: false,
          label: '经理',
          key: 'managerName',
          width: 100
        },
        {
          edit: false,
          dataType: 'Product',
          label: '产品ID',
          key: 'id',
          width: 100
        },
        {
          label: '详情',
          key: 'info',
          width: 100
        },
        {
          label: '计划发布日期',
          key: 'planPublish',
          dataType: 'Product',
          width: 100,
          render (h, ctx) {
            return h('DatePicker', {props: {value: ctx.data[ctx.column.key]}})
          }
        },
        {
          label: '生产厂家',
          key: 'factory',
          dataType: 'Product',
          width: 100
        }
      ],
      onExpand (data, go) {
        go()
      },
      onClose (data, go) {
        go()
      }
    }
  },
  methods: {
    rootLoader (cb) {
      productLineService.search({}).then(response => cb.load(response.data.data)).catch(cb.error).then(this.end)
    },
    onCheck (selectDatas) {
      console.log('选择了' + selectDatas.length + '项', selectDatas)
    },
    loadRootCB (response) {
      if (response.data.ok) {
        this.datas = response.data.data
      }
    }
  }
}
</script>
<style lang="scss">
  @import "../../style/vars.scss";

  .panel {
    @include debug;
    position: absolute;
    top: 100px;
    left: 100px;
    width: 1000px;
    height: 500px;
  }

  .ivu-date-picker {
    .ivu-date-picker-focused input {
      border: none;
    }

    .ivu-input {
      height: auto;
      border: none;
    }
  }
</style>
