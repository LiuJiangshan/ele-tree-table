<template>
  <LjsTreeTable :datas="datas" :columns="columns" :loader="loader" :onExpand="onExpand"
                :onClose="onClose" :isRoot="isRoot"></LjsTreeTable>
</template>
<script>
  import LjsTreeTable from '../components/LjsTreeTable/LjsTreeTable.vue'
  import axios from 'axios'
  import Message from 'iview/src/components/message/index.js'
  import DatePicker from 'iview/src/components/date-picker'

  export default {
    components: {
      LjsTreeTable,
      'Message': Message,
      'DatePicker': DatePicker
    },
    data() {
      return {
        //子节点加载器
        loader: {
          ProductLine(node, refresh) {
            node['nodes'] = []
            //加载子产品组
            axios.put('/api/productline/search.do',
              {superId: node.id})
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
            axios.put('/api/product/search.do',
              {productLineId: node.id})
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
          },
          Product(node, refresh) {
            node['nodes'] = []
            axios.put('/api/product/search.do',
              {superId: node.id})
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
        //列定义
        columns: [
          {
            label: '名称',
            key: 'name',
            expand: true
          },
          {
            label: '产品组编号',
            key: 'id',
            type: 'ProductLine',
            style: {'min-width': '50px', 'max-width': '200px'}
          },
          {
            label: '产品编号',
            key: 'id',
            type: 'Product',
            style: {'min-width': '50px', 'max-width': '200px'}
          },
          {
            label: '详情',
            key: 'info',
            style: {'min-width': '50px', 'max-width': '200px'}
          },
          {
            label: '产品创建日期',
            key: 'id',
            type: 'Product',
            style: {'min-width': '50px', 'max-width': '200px'},
            render(h, ctx) {
              return h('DatePicker', {props: {value: '2017-12-12'}})
            }
          }
        ],
        //数据
        nodes: [],
        onExpand(data, go) {
          Message.info('允许展开:' + data.name)
          go()
        },
        onClose(data, go) {
          Message.info('允许收起:' + data.name)
          go()
        },
        isRoot(node) {
          return node && node.superId === -1
        }
      }
    },
    computed: {
      datas: {
        get() {
          console.log(this.nodes)
          return this.nodes
        },
        set(datas) {
          this.nodes = datas
        }
      }
    },
    methods: {
      loginCB(response) {
        if (response.data.ok)
          Message.success('登录成功')
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
          this.datas = response.data.page.data
          Message.success('数据获取成功')
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
