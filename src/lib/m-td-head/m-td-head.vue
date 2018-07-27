<!--单元格表头内容-->
<template>
  <div class="td_head_warp" ref="head_warp">
    <div class="td_head" :style="tdHeadStyle">
      <template v-if="canExpand">
        <m-deep :data="data" :column="column" :table="td.tr.table"/>
        <m-expand :data="data" :table="table"/>
      </template>
      <m-check-box v-else-if="canSelection" v-model="data.checked" @check-changed="column.onCheck" :table="table"/>
    </div>
  </div>
</template>

<script>
import MDeep from '../m-deep/m-deep'
import MExpand from '../m-expand/m-expand'
import MCheckBox from '../m-check-box/m-check-box'

export default {
  name: 'm-td-head',
  components: {MCheckBox, MExpand, MDeep},
  props: {
    td: {type: Object}
  },
  computed: {
    canExpand () { return this.column.type && this.column.type.indexOf('expand') !== -1 },
    canSelection () { return this.column.type && this.column.type.indexOf('selection') !== -1 },
    tdHeadStyle () {
      let tdHeadStyle = {}
      tdHeadStyle.height = this.td.tr.height + 'px'
      return tdHeadStyle
    },
    table: {get () { return this.td.tr.table }},
    data: {
      get () {
        return this.td.data
      }
    },
    column: {
      get () {
        return this.td.column
      }
    },
    width: {
      get () {
        let width = 0
        if (this.isMounted) width = this.$refs.head_warp.clientWidth
        return width
      }
    }
  },
  methods: {},
  data () {
    return {isMounted: false}
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss" scoped>
  .td_head_warp {
    display: inline-block;
  }

  .td_head {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: left;
  }
</style>
