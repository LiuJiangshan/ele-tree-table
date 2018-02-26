<!--操作批量提交-->
<template>
    <div>
        <LjsTreeTable ref="treetable" :datas="datas" :columns="columns" style="height:500px;"
                      :right-menu="rightMenu"/>
        <input value="提交更改" @click="showChange" type="button"/>
    </div>
</template>
<script>
  import LjsTreeTable from '../../components/LjsTreeTable/LjsTreeTable.vue'

  export default {
    name: 'submitAllChange',
    components: {LjsTreeTable},
    methods: {
      showChange () {
        let submitDatas = this.$refs.treetable.getSubmitData()
        console.log(submitDatas)
      }
    },
    data () {
      return {
        datas: [],
        columns: [
          {
            label: '编号',
            key: 'id'
          },
          {
            label: '名称',
            key: 'name'
          },
          {
            label: '详情',
            key: 'info'
          }
        ],
        rightMenu: {
          empty: [
            {
              label: '添加产品线',
              click (context) {
                context.root({
                  pojo: 'ProductLine',
                  name: '请输入产品线名称'
                })
              }
            }],
          ProductLine: [
            {
              label: '添加同级产品线',
              click (context) {
                context.brother(context.data,
                  {
                    pojo: 'ProductLine',
                    name: '请输入产品线名称'
                  })
              }
            },
            {
              label: '添加子级产品线',
              click (context) {
                try {
                  context.son(context.data,
                    {
                      pojo: 'ProductLine',
                      name: '请输入产品线名称'
                    })
                } catch (e) {
                  alert(e)
                }
              }
            },
            {
              label: '删除该产品线',
              click (context) {
                context.remove(context.data)
              }
            }
          ]
        }
      }
    }
  }
</script>
<style scoped>
</style>