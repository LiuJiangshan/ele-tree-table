<template>
  <div class="app">
    <ljs-tree-table class="m-tree-table" :columns="columns" :data="data"/>
    <el-table :data="data">
      <el-table-column v-for="(column,key) in columns" :key="key" v-bind="column"/>
    </el-table>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import LjsTreeTable from '@/package/ljsTreeTable.vue'
import { Column } from '@/package/treeNode'

@Component({
  components: { LjsTreeTable }
})
export default class App extends Vue {
  columns = [
    {
      prop: 'id',
      label: '编号',
      width: 200
    },
    {
      prop: 'name',
      label: '姓名',
      width: 200
    },
    {
      prop: 'job',
      label: '职位',
      width: 200,
      render: (h, ctx) => {
        return <div>hello</div>
      }
    }] as Array<Column>
  data = [1, 2, 3, 4, 5].map(index => {
    return { id: index, name: `name${index}`, job: `job${index}` }
  }) as Array<any>
}
</script>
<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  .app {
    @include wh100;
    overflow-y: scroll;

    .m-tree-table {
      overflow: auto;
    }
  }
</style>
<style lang="scss">
  @import "~ljs-sass/src/mixin";

  html, body {
    @include wh100_margin(0);
    @include wh100_padding(0)
  }
</style>
