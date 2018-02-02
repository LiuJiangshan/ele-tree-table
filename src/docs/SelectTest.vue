<template>
    <div style="width: 100%;padding: 10px;background-color: darkgray;">
        <LjsTreeTable :border="border" :datas="datas" :columns="columns" :driver="driver" :rightMenu="rightMenu"
                      :width="1000" :onExpand="onExpand" :height="600" :onClose="onClose" :debug="true"
                      :fixLeft="fixLeft" :fixRight="fixRight"
                      @on-check="onCheck"/>
    </div>
</template>
<script>
  import LjsTreeTable from '../components/LjsTreeTable/LjsTreeTable.vue'
  import axios from 'axios'

  export default {
    components: {
      LjsTreeTable
    },
    data () {
      return {
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
                method: 'put',
                url: '/api/productline/search.do',
                data: {superId: node.id, onePageShow: 10000}
              })
                .then(function (response) {
                  let datas = response.data.page.data
                  if (datas instanceof Array) datas.map(function (val) { node.nodes.push(val) })
                  refresh()
                })
                .catch(function (error) {
                  console.log(error)
                })
              // 加载子产品
              axios({
                method: 'put',
                url: '/api/product/search.do',
                data: {productLineId: node.id, onePageShow: 10000}
              }).then(function (response) {
                let datas = response.data.page.data
                if (datas instanceof Array) datas.map(function (val) { node.nodes.push(val) })
                refresh()
              }).catch(function (error) {
                console.log(error)
              })
            },
            Product (node, refresh) {
              node['nodes'] = []
              axios({
                method: 'put',
                url: '/api/product/search.do',
                data: {superId: node.id, onePageShow: 10000}
              })
                .then(function (response) {
                  let datas = response.data.page.data
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
                url: '/api/productline/update.do',
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
                url: '/api/product/update.do',
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
                method: 'put',
                url: '/api/product/add.do',
                data: data
              })
                .then(cb)
                .catch(function (error) {
                  console.log(error)
                })
            },
            ProductLine (data, cb) {
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
          // 删除器
          deleter: {
            Product (data, cb) {
              axios({
                method: 'delete',
                url: '/api/product/delete.do',
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
                url: '/api/productline/delete.do',
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
            // 可展开列
            expand: true,
            // 允许调整宽度
            resize: true,
            // 可选择
            check: true,
            label: '名称',
            key: 'name',
            width: 400,
            // 自定义显示文字
            text (data, column) {
              return data.kids > 0 ? data[column.key] + '(' + data.kids + ')' : data[column.key]
            }
          },
          {
            resize: true,
            label: '详情',
            key: 'info',
            width: 100,
            // 最大显示行数
            maxLine: 10,
            render (h, ctx) {
              return h('treetable-select', {
                props: {
                  data: [
                    {
                      id: '1',
                      name: '一'
                    },
                    {
                      id: '2',
                      name: '二'
                    },
                    {
                      id: '3',
                      name: '三'
                    },
                    {
                      id: '4',
                      name: '四'
                    }],
                  value: ctx.data.info,
                  ori: ctx
                }
              })
            }
          }
        ],
        // 数据
        datas: [],
        onExpand (data, go) {
          go()
        },
        onClose (data, go) {
          go()
        }
      }
    },
    methods: {
      onCheck (selectDatas) {
        console.log('选择了' + selectDatas.length + '项', selectDatas)
      },
      loginCB (response) {
        if (response.data.ok) console.log('登录成功')
        this.loadRoot(this.loadRootCB)
      },
      login (cb) {
        axios.put('/api/user/login.do',
          {
            userName: 'user',
            passWord: 1234
          })
          .then(cb)
          .catch(function (error) {
            alert('登陆失败')
            console.log(error)
          })
      },
      loadRootCB (response) {
        if (response.data.ok) {
          this.datas = response.data.page.data
        }
      },
      loadRoot (cb) {
        axios.put('/api/productline/search.do',
          {superId: -1, onePageShow: 10000})
          .then(cb)
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    mounted () {
      this.login(this.loginCB)
    }
  }
</script>
