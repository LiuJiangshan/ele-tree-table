<template>
  <div class="simple">
    <ljs-tree-table class="m-tree-table" :columns="columns" :data="data"/>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import LjsTreeTable from '@/package/ljsTreeTable.vue'
import { Column } from '@/package/treeNode'

@Component({
  components: { LjsTreeTable }
})
export default class Simple extends Vue {
  columns = [
    {
      prop: 'id',
      label: '编号',
      width: 50
    },
    {
      prop: 'name',
      label: '名牌',
      width: 200
    },
    {
      prop: 'job',
      label: '商品名称',
      width: 200,
      render: (h, ctx) => {
        return <div>hello</div>
      }
    },
    {
      prop: 'type',
      label: '规格型号',
      width: 200
    },
    {
      prop: 'proDate',
      label: '生产日期',
      width: 200
    },
    {
      prop: 'aDate',
      label: '保质期',
      width: 200
    },
    {
      prop: 'do',
      label: '操作',
      width: 200
    }
  ] as Array<Column>
  data: Array<any> = []

  constructor () {
    super()
    for (let index = 0; index < 50; index++) {
      this.data.push({
        id: index,
        name: `name${index}`,
        job: `job${index}`,
        type: `type${index}`,
        proDate: `proDate${index}`,
        aDate: `aDate${index}`,
        do: `do${index}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  .simple {
    @include wh100;
    overflow-y: scroll;
    margin: 3px;

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
