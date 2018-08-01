<template>
  <th class="m-th" :class="{resizeable:column.resize}">
    <div class="m-th-wrap">
      <m-check-box v-if="column.allowSelection" v-model="checkAll" @check-changed="onCheckChanged"/>
      <template v-else-if="column.allowExpand"/>
      <template v-else>{{column.label}}</template>
    </div>
  </th>
</template>

<script>
import MCheckBox from '../m-check-box/m-check-box'
import Column from '../ljs-tree-table/Column'

export default {
  name: 'm-th',
  components: {MCheckBox},
  props: {
    table: {type: Object},
    column: {type: Column}
  },
  computed: {},
  methods: {
    onCheckChanged (newValue) {
      this.table.selectAll(newValue)
    }
  },
  data () {
    return {checkAll: false}
  }
}
</script>

<style lang="scss" scoped>
  @import "../../utils/mixin.scss";

  .m-th-wrap {
    @include wh100;
    white-space: nowrap;
    @include flex_h;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .m-th {

  }

  .m-th .border {
    box-sizing: border-box;
    border: 1px solid;
  }

  .resizeable {
    cursor: col-resize;
  }
</style>
