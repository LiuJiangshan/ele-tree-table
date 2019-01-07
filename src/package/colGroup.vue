<template>
  <colgroup>
    <col v-for="(column,key) in columns"
         :width="getWidth(column)" :key="key"/>
  </colgroup>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Column } from '@/package/treeNode'
import Config from '@/package/config'

@Component({
  components: {},
  props: { columns: { type: Array } }
})
export default class ColGroup extends Vue {
  @Prop()
  private columns!: Array<Column>
  public deafultColumnWidth = Config.deafultColumnWidth

  private getWidth (column: Column) {
    const { deafultColumnWidth } = this
    return column.realWidth || column.width || deafultColumnWidth
  }
}

</script>
