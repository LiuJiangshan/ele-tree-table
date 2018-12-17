<template>
  <ljs-tree-table :columns="columns" :datas="datas"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LjsTreeTable from '@/package/ljsTreeTable'
import { Column } from '@/package/treeNode'

@Component({
  components: { LjsTreeTable }
})
export default class App extends Vue {
  columns = [{ prop: 'id' }, { prop: 'name' }] as Array<Column>
  datas = [{ id: 1, name: 'name1' }, { id: 2, name: 'name2' }] as Array<any>
}
</script>
