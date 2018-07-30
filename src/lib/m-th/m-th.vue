<template>
  <th class="m-th" :class="{resizeable:column.resize!==false}">
    <m-check-box v-if="canSelection" v-model="checkAll" @check-changed="onCheckChanged">{{column.label}}</m-check-box>
    <template v-else>{{column.label}}</template>
    <slot/>
  </th>
</template>

<script>
import MCheckBox from '../m-check-box/m-check-box'

export default {
  name: 'm-th',
  components: {MCheckBox},
  props: {
    table: {type: Object},
    column: {type: Object}
  },
  computed: {
    canExpand () { return this.column.type && this.column.type.indexOf('expand') !== -1 },
    canSelection () { return this.column.type && this.column.type.indexOf('selection') !== -1 }
  },
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

  th {
    text-align: left;
    white-space: nowrap;
  }

  th .border {
    box-sizing: border-box;
    border: 1px solid;
  }

  .resizeable {
    cursor: col-resize;
  }
</style>
