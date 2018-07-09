<!--单元格表头内容-->
<template>
    <div class="td_head_warp" ref="head_warp">
        <div class="td_head" :style="tdHeadStyle">
            <!--深度-->
            <template v-if="column.expand">
                <LjsDeep :data="data" :column="column" :table="td.tr.table"/>
                <!--可展开图标-->
                <LjsExpand :data="data" :table="table"/>
            </template>
            <!--复选框-->
            <LjsCheckBox v-if="column.check" :check="data.check" :table="table"
                         @change="onCheckChange"/>
        </div>
    </div>
</template>

<script>
import LjsExpand from './LjsExpand.vue'
import LjsDeep from './LjsDeep.vue'
import LjsCheckBox from './LjsCheckBox.vue'

export default {
  name: 'ljs-td-head',
  components: {
    LjsExpand, LjsDeep, LjsCheckBox
  },
  props: {
    td: {
      type: Object
    }
  },
  computed: {
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
  methods: {
    onCheckChange () {
      this.data.check = !this.data.check
      this.table.onCheck()
    }
  },
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
