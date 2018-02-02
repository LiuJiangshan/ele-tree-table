<!--单元格表头内容-->
<template>
    <div class="td_head_warp" ref="head_warp">
        <div class="td_head">
            <!--深度-->
            <template v-if="column.expand">
                <LjsDeep :data="data" :column="column" :table="table"/>
                <!--可展开图标-->
                <LjsExpand :data="data" :table="table"/>
            </template>
            <!--复选框-->
            <div v-if="column.check" class="check_warp">
                <input type="checkbox" @click.stop="1+1" @change="table.onCheck" v-model="data.check"/>
            </div>
        </div>
    </div>
</template>

<script>
  import LjsExpand from './LjsExpand.vue'
  import LjsDeep from './LjsDeep.vue'

  export default {
    name: 'LjsTdHead',
    components: {
      LjsExpand, LjsDeep
    },
    props: {
      td: {
        type: Object
      }
    },
    computed: {
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
      table: {
        get () {
          return this.td.tr.table
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
    data () {
      return {isMounted: false}
    },
    mounted () {
      this.isMounted = true
    }
  }
</script>

<style scoped>
    .td_head_warp {
        height: 100%;
        display: inline-block;
    }

    .td_head {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: left;
    }

    .check_warp {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
    }
</style>