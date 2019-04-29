<template>
  <el-table highlight-current-row :data="data" max-height="500" style="width:100%;" border row-key="id">
    <el-table-column label="编号" prop="id" fixed="left" width="50">
      <template slot-scope="{row:{id}}">
        {{id}}
      </template>
    </el-table-column>
    <focus-el-table-column label="hi" prop="number" width="150"/>
    <focus-el-table-column label="品牌" prop="logo" width="200"/>
    <focus-el-table-column label="商品名称" prop="name" width="200"/>
    <focus-el-table-column label="规格型号" prop="type" width="200"/>
    <focus-el-table-column label="物料编码" prop="number" width="200"/>
    <focus-el-table-column label="物料编码" prop="number" width="200"/>
    <focus-el-table-column label="物料编码" prop="number" width="200"/>
    <focus-el-table-column label="物料编码" prop="number" width="200"/>
    <focus-el-table-column label="物料编码" prop="number" width="200"/>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FocusElTableColumn from '@/package/element/focusElTableColumn.vue'

@Component({
  components: { FocusElTableColumn }
})
export default class BaseElement extends Vue {
  data: Array<any> = []

  constructor () {
    super()
    for (let index = 0; index < 30; index++) {
      this.data.push({
        id: index,
        name: `name${index}`,
        logo: `logo${index}`,
        type: `type${index}`,
        number: `number${index}`
      })
    }
  }
}
</script>

<style scoped>

</style>
