<template>
    <tr v-if="expand&&data.remove!==true" :class="this.table.trBorder?'tr_border':'tr'" :style="trStyle" tabindex="0"
        @contextmenu.prevent="table.$refs.menu.open($event.x - table.$el.offsetLeft,$event.y - table.$el.offsetTop,table.getContextItems(data),table.getMenuContext(data))">
        <LjsEditTd v-for="(column,columnIndex) in table.columns" :key="columnIndex" :index="columnIndex" :data="data"
                   :column="column" :trHeight="height"
                   :ref="'td'+columnIndex" :tr="getThis()"/>
    </tr>
</template>

<script>
  import LjsEditTd from './LjsEditTd.vue'

  export default {
    name: 'LjsTr',
    components: {LjsEditTd},
    props: {
      index: {
        type: Number
      },
      data: {
        type: Object
      },
      table: {
        type: Object
      }
    },
    methods: {
      getThis () {
        return this
      }
    },
    computed: {
      trStyle () {
        let trStyle = {}
        trStyle.borderColor = this.table.trBorderColor
        return trStyle
      },
      expand () { return this.table.isExpand(this.data) },
      height () {
        let maxHeight = 0
        for (let height in this.heights) {
          if (height > maxHeight) maxHeight = height
        }
        if (maxHeight === 0) maxHeight = this.lineHeight
        return maxHeight
      }
    },
    data () {
      return {
        lineHeight: this.table.lineHeight,
        heights: {}
      }
    },
    mounted () {
      this.table.bindTr(this)
    },
    updated () {
      this.table.bindTr(this)
    }
  }
</script>

<style lang="scss" scoped>
    .tr {
        overflow: hidden;
        outline: 0;
        background-color: white;
        &:hover {
            background-color: #fafafa;
        }
        &:focus {
            background-color: #f5f5f5;
        }
    }

    .tr_border {
        @extend .tr;
        border-bottom: 1px solid;
    }
</style>