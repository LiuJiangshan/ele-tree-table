<!--单元格表头内容-->
<template>
  <div class="m-td-head" ref="mTdHead">
    <template v-if="canExpand">
      <m-deep :data="data" :column="column" :table="td.tr.table"/>
      <m-expand v-model="expand" :data="data" :table="table" @expand-changed="onExpandChange"/>
    </template>
    <m-check-box v-else-if="canSelection" v-model="data.selection" @check-changed="column.onCheck?column.onCheck:()=>{}"
                 :table="table"/>
    <slot/>
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
        if (this.isMounted) width = this.$refs.mTdHead.clientWidth
        return width
      }
    }
  },
  methods: {
    onExpandChange (value) {
      this.table.setExpand(this.data, value)
    }
  },
  data () {
    return {isMounted: false, expand: false}
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss" scoped>
  @import "../../utils/mixin.scss";

  .m-td-head {
    display: inline-block;
    @include flex_h;
    @include h100;
    align-items: center;
    justify-content: flex-start;
  }

  .td_head {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: left;
  }
</style>
