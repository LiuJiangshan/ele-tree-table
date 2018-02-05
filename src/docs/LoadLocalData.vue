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
  import LjsTreeTable from '../components/LjsTreeTable/LjsTreeTable.vue'

  export default {
    name: 'LoadLocalData',
    components: {LjsTreeTable},
    data () {
      return {
        border: true,
        debug: false,
        columns: [
          {
            key: 'id',
            label: '编号',
            width: 200,
            resize: true,
            expand: true,
            check: true,
            edit: false
          },
          {
            key: 'name',
            label: '名称',
            resize: true
          },
          {
            key: 'sex',
            label: '性别',
            resize: true
          },
          {
            key: 'age',
            label: '年龄',
            resize: true
          },
          {
            key: 'gard',
            label: '年级',
            resize: true
          }
        ],
        datas: []
      }
    },
    methods: {
      getRandName () { return Math.random().toString(36).substr(2) },
      getRandGard () { return parseInt((Math.random() * 8 + 1) + '') + '年级' },
      getRandAge () { return parseInt((Math.random() * 50 + 20) + '') + '岁' },
      getRandSex () { return Math.random() > 0.5 ? '男' : '女' }
    },
    mounted () {
      let datas = []
      for (let i = 0; i < 30; i++) {
        let data = {
          id: i,
          name: this.getRandName(),
          gard: this.getRandGard(),
          age: this.getRandAge(),
          sex: this.getRandSex(),
          nodes: []
        }
        for (let j = 0; j < 2; j++) {
          let data1 = {
            id: i + '-' + j,
            name: this.getRandName(),
            gard: this.getRandGard(),
            age: this.getRandAge(),
            sex: this.getRandSex(),
            nodes: []
          }
          for (let k = 0; k < 2; k++) {
            data1.nodes.push({
              id: i + '-' + j,
              name: this.getRandName(),
              gard: this.getRandGard(),
              age: this.getRandAge(),
              sex: this.getRandSex()
            })
          }
          data.nodes.push(data1)
        }
        datas.push(data)
      }
      this.datas = datas
    }
  }
</script>

<style scoped>

</style>