<!--表格主体内容组件-->
<template>
  <div v-if="table.datas&&table.datas.length>0" :class="{fix_table_body_warp:fix,table_body_warp:!fix}"
       :style="bodyStyle" @contextmenu.prevent.stop="1+1"
       @scroll="onScroll">
    <table class="body_table" :style="tableStyle" border="1" cellspacing="0"
           cellpadding="0">
      <colgroup>
        <col v-for="(column,columnIndex) in columns" :key="columnIndex" :width="column.width">
      </colgroup>
      <tbody>
      <slot/>
      </tbody>
    </table>
  </div>
  <div v-else class="table_empty" :style="bodyStyle" ref="tableEmpty"
       @contextmenu.prevent.stop="onRightMenuClick($event)">
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
  name: 'm-tbody',
  computed: {
    // 表体高度
    height: {get () { return this.table.height - this.table.headHeight }},
    tableStyle: {
      get () {
        return {
          borderColor: this.table.borderColor,
          width: this.fix ? 'auto' : this.fullWidth + 'px'
        }
      }
    },
    bodyStyle: {
      get () {
        let bodyStyle = {width: this.width + 'px'}
        if (this.height) { bodyStyle.height = this.height + 'px' }
        return bodyStyle
      }
    }
  },
  methods: {
    onRightMenuClick ($event) {
      this.table.$refs.menu.open(this.table.rightMenu.empty, $event)
    },
    onScroll (event) {
      if (this.header) this.table.handleBodyScroll(event, this.header, this)
    }
  }
}
</script>

<style lang="scss" scoped>
  .fix_table_body_warp {
    overflow-x: auto;
    overflow-y: hidden;
    background-color: white;
  }

  .table_body_warp {
    overflow: auto;
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
