<template>
  <el-table :indent="5" size="mini" highlight-current-row lazy :load='load' :data="data" max-height="500"
            style="width:100%;" border row-key="id" @text-change="handTextChange">
    <focus-el-table-column width="250" fixed="left"/>
    <focus-el-table-column type="selection" width="50"/>
    <focus-el-table-column label="编号" prop="id" width="200"/>
    <focus-el-table-column label="品牌" prop="logo" width="200" editable/>
    <focus-el-table-column label="商品名称" prop="name" width="200" editable/>
    <focus-el-table-column label="规格型号" prop="type" width="200" editable/>
    <focus-el-table-column label="物料编码" prop="number1" width="200" editable/>
    <focus-el-table-column label="物料编码" prop="number2" width="200" editable/>
    <focus-el-table-column label="物料编码" prop="number3" width="200" editable/>
    <focus-el-table-column label="物料编码" prop="number4" width="200" editable/>
    <focus-el-table-column label="物料编码" prop="number5" width="200" editable/>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FocusElTableColumn from '@/package/element/focusElTableColumn'

@Component({
  components: { FocusElTableColumn }
})
export default class BaseElement extends Vue {
  data: Array<any> = []

  constructor () {
    super()
    for (let index = 0; index < 30; index++) {
      this.data.push({
        id: `${index}`,
        name: `name${index}`,
        logo: index === 0 ? '床前明月光，疑似地上霜。举头望明月，低头思故乡。' : `logo${index}`,
        type: `type${index}`,
        number1: `number1${index}`,
        number2: `number2${index}`,
        number3: `number3${index}`,
        number4: `number4${index}`,
        number5: `number5${index}`,
        hasChildren: true
      })
    }
  }

  handTextChange ({ row, column: { property } }: any, newText: string) {
    row[property] = newText
  }

  load (tree: any, treeNode: any, resolve: any) {
    const index = this.data.length
    resolve([{
      id: `${tree.id}-0`,
      name: `name${index}`,
      logo: `logo${index}`,
      type: `type${index}`,
      number1: `number1${index}`,
      number2: `number2${index}`,
      number3: `number3${index}`,
      number4: `number4${index}`,
      number5: `number5${index}`,
      hasChildren: true
    }])
  }
}
</script>

<style scoped>

</style>
