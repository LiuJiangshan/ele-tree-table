<template>
  <div>
    <LjsTreeTable :border="border" :datas="datas" :columns="columns" :debug="debug"/>
    <div>
      <input type="button" :value="debug?'关闭调试':'打开调试'" @click="debug=!debug"/>
      <input type="button" :value="border?'隐藏边框':'显示边框'" @click="border=!border"/>
    </div>
  </div>
</template>

<script>
import dateformat from 'dateformat'
import LjsTreeTable from '../../packages/ljs-tree-table/ljs-tree-table.vue'

export default {
  name: 'LoadLocalData',
  components: { LjsTreeTable },
  data () {
    return {
      border: true,
      debug: false,
      columns: [
        {
          key: 'id',
          label: '编号',
          expand: true,
          check: true,
          edit: false
        },
        {
          key: 'name',
          label: '名称',
          width: 50
        },
        {
          key: 'sex',
          label: '性别',
          render (h, ctx) {
            let re = h('select', {
              props: {
                transfer: true,
                value: ctx.data[ctx.column.key]
              }
            }, [h('option', { props: { value: '男' } }, '男'), h('Option', { props: { value: '女' } }, '女')])
            return re
          }
        },
        {
          key: 'age',
          label: '年龄'
        },
        {
          key: 'birthday',
          label: '生日',
          render (h, ctx) {
            return h('input', { attrs: { type: 'date', value: ctx.data.birthday } })
          }
        },
        {
          key: 'gard',
          label: '年级'
        }
      ],
      datas: [],
      dateformat: undefined
    }
  },
  methods: {
    getRandName () { return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) },
    getRandGard () { return parseInt((Math.random() * 8 + 1) + '') + '年级' },
    getRandAge () { return parseInt((Math.random() * 50 + 20) + '') + '岁' },
    getRandSex () { return Math.random() > 0.5 ? '男' : '女' },
    getRandBirthday () {
      let rand = Math.random() * new Date().getTime() / 2000
      let date = Math.random() > 0.5 ? new Date(new Date().getTime() + rand) : new Date(new Date().getTime() - rand)
      let da = dateformat(date, 'yyyy-mm-dd')
      return da
    },
    getRandEnable () {
      return Math.random() > 0.5
    },
    initData () {
      let datas = []
      for (let i = 0; i < 1; i++) {
        let data = {
          id: i,
          name: this.getRandName(),
          gard: this.getRandGard(),
          age: this.getRandAge(),
          sex: this.getRandSex(),
          enable: this.getRandEnable(),
          birthday: this.getRandBirthday(),
          nodes: []
        }
        for (let j = 0; j < 1; j++) {
          let data1 = {
            id: i + '-' + j,
            name: this.getRandName(),
            gard: this.getRandGard(),
            age: this.getRandAge(),
            enable: this.getRandEnable(),
            sex: this.getRandSex(),
            birthday: this.getRandBirthday(),
            nodes: []
          }
          for (let k = 0; k < 1; k++) {
            data1.nodes.push({
              id: i + '-' + j,
              name: this.getRandName(),
              gard: this.getRandGard(),
              enable: this.getRandEnable(),
              age: this.getRandAge(),
              sex: this.getRandSex(),
              birthday: this.getRandBirthday()
            })
          }
          data.nodes.push(data1)
        }
        datas.push(data)
      }
      this.datas = datas
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
</style>
