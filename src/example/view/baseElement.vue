<template>
  <div style="overflow-y: auto;overflow-x: hidden;width:100%;height: 100%">
    <el-table lazy :load='load' :data="data.filter(it=>it.id<5)" max-height="287" style="width:900px;margin: 40px auto;"
              row-key="id" @text-change="handTextChange" v-bind="tableFinalProp">
      <focus-el-table-column type="selection" width="50"/>
      <focus-el-table-column label="编号" prop="id" width="200"/>
      <focus-el-table-column label="品牌" prop="logo" width="200" editable/>
      <focus-el-table-column label="商品名称" prop="name" width="200" editable/>
      <focus-el-table-column label="规格型号" prop="type" editable/>
    </el-table>
    <el-table lazy :load='load' :data="data" max-height="300" style="width:100%;" row-key="id"
              @text-change="handTextChange" v-bind="tableFinalProp">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FocusElTableColumn from '@/package/element/focusElTableColumn'
import TableFinalProp from '@/package/element/tableFinalProp'

@Component({
  components: { FocusElTableColumn }
})
export default class BaseElement extends Vue {
  data: Array<any> = []
  tableFinalProp = TableFinalProp

  constructor () {
    super()
    for (let index = 0; index < 30; index++) {
      this.data.push({
        id: `${index}`,
        name: `name${index}`,
        logo: index === 0 ? '床前明月光，疑似地上霜。举头望明月，低头思故乡。' : `logo${index}`,
        type: index === 1 ? '云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。' : `type${index}`,
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

<style lang="scss">
  @import "~@/package/element/default-theme.scss";
</style>
