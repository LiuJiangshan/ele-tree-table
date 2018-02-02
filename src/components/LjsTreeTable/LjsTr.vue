<template>
    <tr v-if="expand" class="tr" tabindex="0"
        @contextmenu.prevent.stop="table.$refs.menu.open($event.x - table.$el.offsetLeft,$event.y - table.$el.offsetTop,table.getContextItems(data),table.getMenuContext(data))">
        <LjsEditTd v-for="(column,columnIndex) in table.columns" :key="columnIndex" :index="columnIndex" :data="data"
                   :column="column"
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
      expand: {
        get () { return this.table.isExpand(this.data) }
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
        outline: 0;
        background-color: white;
        &:hover {
            background-color: #fafafa;
        }
        &:focus {
            background-color: #f5f5f5;
        }
    }
</style>