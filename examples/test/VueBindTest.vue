<template>
    <div>
        <input type="checkbox" @change="onChange(selectAll)" v-model="selectAll"/>
        <VueItem v-for="(data,dataIndex) in datas" :key="dataIndex">
            <VueCheckBox v-for="(column,columnIndex) in columns" :key="columnIndex" :data="data" :column="column"/>
        </VueItem>
    </div>
</template>

<script>
import VueCheckBox from './VueCheckBox.vue'
import VueItem from './VueItem.vue'

export default {
  name: 'VueBindTest',
  components: {VueCheckBox, VueItem},
  data () {
    return {
      selectAll: false,
      datas: [],
      columns: []
    }
  },
  methods: {
    onChange (check) {
      this.datas.forEach(function (data) {
        data.check = check
        console.log(data.check)
      })
    }
  },
  created () {
    for (let i = 0; i < 100; i++) this.datas.push({check: false})
    for (let i = 0; i < 2; i++) this.columns.push({index: i})
  }
}
</script>

<style scoped>

</style>
