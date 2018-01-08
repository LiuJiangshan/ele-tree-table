<template>
  <LjsTreeTable :datas="nodes" :columns="columns" :driver="driver" :rightMenu="rightMenu"
                :onExpand="onExpand"
                :onClose="onClose" :isRoot="isRoot" :bus="bus" :debug="true"></LjsTreeTable>
</template>
<script>
  import LjsEditTd from '../components/LjsTreeTable/LjsEditTd.vue'
  import LjsTreeTable from '../components/LjsTreeTable/LjsTreeTable.vue'
  import axios from 'axios'
  import Vue from 'vue'

  export default {
    components: {
      LjsTreeTable
    },
    data() {
      const bus = new Vue()
      return {
        //事件总线(一个Vue实例)
        bus: bus,
        //数据驱动
        driver: {
          //子节点加载器
          loader: {
            ProductLine(node, refresh) {
              node['nodes'] = []
              //加载子产品组
              axios({
                method: 'put',
                url: '/api/productline/search.do',
                data: {superId: node.id}
              })
                .then(function (response) {
                  var datas = response.data.page.data
                  if (datas instanceof Array)
                    datas.map(function (val) {
                      node.nodes.push(val)
                    })
                  refresh()
                })
                .catch(function (error) {
                  console.log(error);
                });
              //加载子产品
              axios({
                method: 'put',
                url: '/api/product/search.do',
                data: {productLineId: node.id}
              }).then(function (response) {
                var datas = response.data.page.data
                if (datas instanceof Array)
                  datas.map(function (val) {
                    node.nodes.push(val)
                  })
                refresh()
              })
                .catch(function (error) {
                  console.log(error);
                })
            },
            Product(node, refresh) {
              node['nodes'] = []
              axios({
                method: 'put',
                url: '/api/product/search.do',
                data: {superId: node.id}
              })
                .then(function (response) {
                  var datas = response.data.page.data
                  if (datas instanceof Array)
                    datas.map(function (val) {
                      node.nodes.push(val)
                    })
                  refresh()
                })
                .catch(function (error) {
                  console.log(error);
                })
            }
          },
          //更新器
          updater: {
            ProductLine(data, column) {
              var params = {id: data.id}
              params[column.key] = data[column.key]
              axios({
                method: 'put',
                url: '/api/productline/update.do',
                data: params
              })
                .then(function (response) {
                  var msg = response.data.msg
                  console.log(msg)
                })
                .catch(function (error) {
                  console.log(error);
                })
            },
            Product(data, column) {
              var params = {id: data.id}
              params[column.key] = data[column.key]
              axios({
                method: 'put',
                url: '/api/product/update.do',
                data: params
              })
                .then(function (response) {
                  var msg = response.data.msg
                  console.log(msg)
                })
                .catch(function (error) {
                  console.log(error);
                })
            }
          },
          //添加器
          adder: {
            Product(data, cb) {
              axios({
                method: 'put',
                url: '/api/product/add.do',
                data: data
              })
                .then(cb)
                .catch(function (error) {
                  console.log(error)
                })
            },
            ProductLine(data, cb) {
              axios({
                method: 'put',
                url: '/api/productline/add.do',
                data: data
              })
                .then(cb)
                .catch(function (error) {
                  console.log(error)
                })
            }
          },
          //删除器
          deleter: {
            Product(data, cb) {
              axios({
                method: 'delete',
                url: '/api/product/delete.do',
                data: [data.id]
              })
                .then(cb)
                .catch(function (error) {
                  console.log(error);
                })
            },
            ProductLine(data, cb) {
              axios({
                method: 'delete',
                url: '/api/productline/delete.do',
                data: [data.id]
              })
                .then(cb)
                .catch(function (error) {
                  console.log(error);
                })
            },

          }
        },
        //右键菜单定义
        rightMenu: {
          ProductLine: [
            {
              label: '删除产品线',
              click(context) {
                var driver = context.driver
                var data = context.data
                var _delete = driver.deleter['ProductLine']
                _delete(data, function (response) {
                  if (response.data.ok)
                    context.remove(data)
                })
              }
            },
            {
              label: '添加同级产品线',
              click(context) {
                var data = context.data
                var adder = context.driver.adder
                var add = adder['ProductLine']
                var addData = {
                  name: '请输入产品线名称',
                  pojo: 'ProductLine',
                  nodes: false,
                  superId: data.superId
                }
                add(addData, function (response) {
                  if (response.data.ok)
                    addData.id = response.data.id
                  context.brother(data, addData)
                })
              }
            },
            {
              label: '添加子级产品线',
              click(context) {
                var adder = context.driver.adder
                var data = context.data
                var add = adder['ProductLine']
                var addData = {
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
              click(context) {
                var data = context.data
                var adder = context.driver.adder
                var add = adder['Product']
                var addData = {
                  name: '请输入产品名称',
                  pojo: 'Product',
                  productLineId: data.id,
                  nodes: false
                }
                add(addData, function (response) {
                  if (response.data.ok)
                    addData.id = response.data.id
                  context.son(data, addData)
                })
              }
            }
          ],
          Product: [
            {
              label: '删除产品',
              click(context) {
                var driver = context.driver
                var data = context.data
                var _delete = driver.deleter['Product']
                _delete(data, function (response) {
                  if (response.data.ok)
                    context.remove(data)
                })
              }
            },
            {
              label: '添加同级产品',
              click(context) {
                var data = context.data
                var adder = context.driver.adder
                var add = adder['Product']
                var addData = {
                  name: '请输入产品名称',
                  pojo: 'Product',
                  productLineId: data.productLineId,
                  nodes: false
                }
                add(addData, function (response) {
                  if (response.data.ok)
                    addData.id = response.data.id
                  context.brother(data, addData)
                })
              }
            }
          ]
        },
        //列定义
        columns: [
          {
            expand: true,
            check: true,
            label: '名称',
            key: 'name',
            style: {
              width: '150px'
            },
            render(h, ctx) {
              var data = ctx.props.data
              var column = ctx.props.column
              var text = function () {
                return data.kids > 0 ? data[column.key] + '(' + data.kids + ')' : data[column.key]
              }
              return h(LjsEditTd, {props: {data: data, column: column, text: text, bus: bus}})
            }
          },
          {
            edit: false,
            label: '编号',
            key: 'id',
            style: {width: '100px'}
          },
          {
            type: 'ProductLine',
            label: '经理',
            key: 'managerId',
            style: {width: '100px'}
          },
          {
            label: '详情',
            key: 'info',
            style: {width: '150px'}
          },
          {
            label: '生产厂家',
            key: 'factory',
            type: 'Product',
            style: {width: '150px'}
          },
          {
            label: '计划发布日期',
            key: 'planPublish',
            type: 'Product',
            style: {width: '100px'},
            render(h, ctx) {
              var date = ctx.props.data[ctx.props.column.key]
              console.log('date is:', date)
              return h('DatePicker', {props: {value: date}})
            }
          },
          {
            label: '实际发布日期',
            key: 'publish',
            type: 'Product',
            style: {width: '100px'},
            render(h, ctx) {
              var date = ctx.props.data[ctx.props.column.key]
              console.log('date is:', date)
              return h('DatePicker', {
                props: {
                  value: date
                },
                on: {
                  change(newVal) {
                    console.log('changed:', newVal)
                  }
                }
              })
            }
          }
        ],
        //数据
        nodes: [],
        onExpand(data, go) {
          go()
        },
        onClose(data, go) {
          go()
        },
        isRoot(data) {
          return data && data.superId === -1
        }
      }
    },
    methods: {
      loginCB(response) {
        if (response.data.ok)
          console.log('登录成功')
      },
      login(cb) {
        axios.put('/api/user/login.do',
          {
            userName: 'user',
            passWord: 1234
          })
          .then(cb)
          .catch(function (error) {
            console.log(error);
          });
      },
      loadRootCB(response) {
        if (response.data.ok) {
          this.nodes = response.data.page.data
          console.log('数据获取成功')
        }
      },
      loadRoot(cb) {
        axios.put('/api/productline/search.do',
          {
            superId: -1
          })
          .then(cb)
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    created() {
      this.login(this.loginCB)
      this.loadRoot(this.loadRootCB)
    }
  }
</script>
