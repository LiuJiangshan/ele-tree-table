<!--表格主体内容组件-->
<template>
    <div v-if="table.datas&&table.datas.length>0" :class="{fix_table_body_warp:fix,table_body_warp:!fix}"
         :style="bodyStyle" @contextmenu.prevent.stop="1+1"
         @scroll="onScroll">
        <table class="body_table" :style="tableStyle" :width="fix?'auto':fullWidth" border="1" cellspacing="0"
               cellpadding="0">
            <colgroup>
                <col v-for="(column,columnIndex) in columns" :key="columnIndex" :width="column.width">
            </colgroup>
            <tbody>
            <slot/>
            </tbody>
        </table>
    </div>
    <div v-else class="table_empty" :style="bodyStyle"
         @contextmenu.prevent.stop="table.$refs.menu.open($event.x - table.$el.offsetLeft,$event.y - table.$el.offsetTop,table.rightMenu.empty,table)">
        <span v-if="!fix" v-html="'暂无数据'"></span>
    </div>
</template>

<script>
  export default {
    props: {
      table: {
        type: Object
      },
      fix: {
        type: Boolean,
        default: false
      },
      header: {
        type: Object,
        default: null
      },
      columns: {
        type: Array
      },
      // 表格包裹层宽度
      width: {
        type: Number
      },
      // 表格宽度
      fullWidth: {
        type: Number
      }
    },
    name: 'LjsTbody',
    computed: {
      // 表体高度
      height: {get () { return this.table.height - this.table.headHeight }},
      tableStyle: {get () { return {'border-color': this.table.border ? '#E4E4E4' : 'transparent'} }},
      bodyStyle: {
        get () {
          let bodyStyle = {width: this.width + 'px'}
          if (this.height) { bodyStyle.height = this.height + 'px' }
          return bodyStyle
        }
      }
    },
    methods: {
      onScroll (event) {
        if (this.header) this.table.handleBodyScroll(event, this.header, this)
      }
    }
  }
</script>

<style scoped>
    .fix_table_body_warp {
        overflow-x: scroll;
        overflow-y: hidden;
        background-color: white;
    }

    .table_body_warp {
        overflow: scroll;
        background-color: white;
    }

    .table_empty {
        align-items: center;
        display: flex;
        align-content: center;
        justify-content: center;
        justify-items: center;
        background-color: white;
    }

    .body_table {
        table-layout: fixed;
        border-collapse: collapse;
        border: none;
    }
</style>