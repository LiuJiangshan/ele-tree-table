<template>
  <LjsTreeTable :datas="datas" :columns="columns" :loader="loader"></LjsTreeTable>
</template>
<script>
  import LjsTreeTable from '../components/LjsTreeTable/LjsTreeTable.vue'
  import axios from 'axios'
  import Message from 'iview/src/components/message/index.js'

  export default {
    components: {
      LjsTreeTable,
      'Message': Message
    },
    data() {
      return {
        //子节点加载器
        loader: {
          ProductLine(node, cb) {
            axios.put('/api/productline/search.do',
              {superId: node.id})
              .then(cb)
              .catch(function (error) {
                console.log(error);
              });
          },
          Product(node, cb) {
            axios.put('/api/product/search.do',
              {superId: node.id})
              .then(cb)
              .catch(function (error) {
                console.log(error);
              });
          }
        },
        //列定义
        columns: [
          {
            label: '编号',
            key: 'id',
            expand: true
          },
          {
            label: '名称',
            key: 'name',
            style: {'min-width': '50px', 'max-width': '200px'}
          },
          {
            label: '日期',
            key: 'date',
            style: {'min-width': '300px'},
            render(h, ctx) {
              return h('DatePicker')
            }
          }
        ],
        //数据
        datas: [
          {
            id: 1,
            name: '曹操',
            nodes: [
              {
                id: 1.1,
                name: '曹植',
                nodes: [
                  {
                    id: '1.1.1',
                    name: '曹小小',
                    nodes: [
                      {
                        id: '1.1.1.1',
                        name: '小曹曹'
                      }
                    ]
                  }
                ]
              },
              {
                id: 1.2,
                name: '曹丕'
              }
            ]
          },
          {
            id: 2,
            name: '张飞',
            nodes: [
              {
                id: 2.1,
                name: '张大飞',
                nodes: [
                  {
                    id: '2.1.1',
                    name: '张小小'
                  }
                ]
              },
              {
                id: 2.2,
                name: '张小飞',
              }
            ]
          }
        ]
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
      }
    },
    created() {
      this.login(this.loginCB)
    }
  }
</script>
