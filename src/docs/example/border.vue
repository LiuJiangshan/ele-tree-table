<!--边框测试-->
<template>
    <div style="width: 100%;height: 100%;overflow: auto;">
        <h2>默认有边框</h2>
        <LjsTreeTable :datas="datas1" :columns="columns1" :driver="driver1"
                      :rightMenu="rightMenu1"
                      style="width:100%;height: 500px;" :debug="debug"
                      @on-check="onCheck"/>
        <h2>仅有上下边框</h2>
        <LjsTreeTable :datas="datas2" :columns="columns2" :driver="driver2"
                      :rightMenu="rightMenu2" :border="false" :tr-border="true"
                      style="width:100%;height: 500px;" :debug="debug"
                      @on-check="onCheck"/>
        <h2>无边框</h2>
        <LjsTreeTable :datas="datas3" :columns="columns3" :driver="driver3"
                      :rightMenu="rightMenu3" :border="false"
                      style="width:100%;height: 500px;" :debug="debug"
                      @on-check="onCheck"/>
        <input type="button" @click="debug=!debug" :value="debug?'关闭调试':'打开调试'"/>
    </div>
</template>
<script>
import LjsTreeTable from '../../lib/ljs-tree-table/LjsTreeTable.vue'
import axios from 'axios'

export default {
  components: {LjsTreeTable},
  data () {
    return {
      debug: false,
      // 数据驱动
      driver1: {
        // 子节点加载器
        loader: {
          ProductLine (node, refresh) {
            node['nodes'] = []
            // 加载子产品组
            axios({
              method: 'GET',
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
              data: [data.id]
            })
              .then(cb)
              .catch(function (error) {
                console.log(error)
              })
          }
        }
      },
      driver2: {
        // 子节点加载器
        loader: {
          ProductLine (node, refresh) {
            node['nodes'] = []
            // 加载子产品组
            axios({
              method: 'GET',
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
              data: [data.id]
            })
              .then(cb)
              .catch(function (error) {
                console.log(error)
              })
          }
        }
      },
      driver3: {
        // 子节点加载器
        loader: {
          ProductLine (node, refresh) {
            node['nodes'] = []
            // 加载子产品组
            axios({
              method: 'GET',
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
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
              url: window.apiUrl + '/product',
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
              url: window.apiUrl + '/productline',
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
      rightMenu1: {
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
      rightMenu2: {
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
      rightMenu3: {
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
      columns1: [
        {
          // 可展开列
          expand: true,
          // 允许调整宽度
          // 可选择
          check: true,
          label: '名称',
          key: 'name',
          width: 200,
          // 自定义显示文字
          text (data, column) {
            return data.kids > 0 ? data[column.key] + '(' + data.kids + ')' : data[column.key]
          }
        },
        {
          edit: false,
          label: '经理',
          key: 'managerName',
          width: 100
        },
        {
          edit: false,
          type: 'Product',
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
          type: 'Product',
          width: 100,
          render (h, ctx) {
            return h('DatePicker', {props: {value: ctx.data[ctx.column.key]}})
          }
        },
        {
          label: '生产厂家',
          key: 'factory',
          type: 'Product',
          width: 100
        }
      ],
      columns2: [
        {
          // 可展开列
          expand: true,
          // 允许调整宽度
          // 可选择
          check: true,
          label: '名称',
          key: 'name',
          width: 200,
          // 自定义显示文字
          text (data, column) {
            return data.kids > 0 ? data[column.key] + '(' + data.kids + ')' : data[column.key]
          }
        },
        {
          edit: false,
          label: '经理',
          key: 'managerName',
          width: 100
        },
        {
          edit: false,
          type: 'Product',
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
          type: 'Product',
          width: 100,
          render (h, ctx) {
            return h('DatePicker', {props: {value: ctx.data[ctx.column.key]}})
          }
        },
        {
          label: '生产厂家',
          key: 'factory',
          type: 'Product',
          width: 100
        }
      ],
      columns3: [
        {
          // 可展开列
          expand: true,
          // 允许调整宽度
          // 可选择
          check: true,
          label: '名称',
          key: 'name',
          width: 200,
          // 自定义显示文字
          text (data, column) {
            return data.kids > 0 ? data[column.key] + '(' + data.kids + ')' : data[column.key]
          }
        },
        {
          edit: false,
          label: '经理',
          key: 'managerName',
          width: 100
        },
        {
          edit: false,
          type: 'Product',
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
          type: 'Product',
          width: 100,
          render (h, ctx) {
            return h('DatePicker', {props: {value: ctx.data[ctx.column.key]}})
          }
        },
        {
          label: '生产厂家',
          key: 'factory',
          type: 'Product',
          width: 100
        }
      ],
      // 数据
      datas1: [],
      datas2: [],
      datas3: []
    }
  },
  methods: {
    onCheck (selectDatas) {
      console.log('选择了' + selectDatas.length + '项', selectDatas)
    },
    loadRootCB (response) {
      if (response.data.ok) {
        this.datas1 = JSON.parse(JSON.stringify(response.data.data))
        this.datas2 = JSON.parse(JSON.stringify(response.data.data))
        this.datas3 = JSON.parse(JSON.stringify(response.data.data))
      }
    },
    loadRoot (cb) {
      axios({
        method: 'GET',
        url: window.apiUrl + '/productline',
        params: {superId: -1, onePageShow: 10000}
      }).then(cb)
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.loadRoot(this.loadRootCB)
  }
}
</script>
<style lang="scss" scoped>
</style>
