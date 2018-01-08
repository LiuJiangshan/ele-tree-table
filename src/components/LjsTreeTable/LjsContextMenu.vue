<template>
  <div v-click-outside="close" v-if="show" class="menu" ref="menu" @click.prevent.stop="close"
       :style="{top:y+'px',left:x+'px'}"
       @blur.prevent="onBlur">
    <template v-for="item in items">
      <div class="item" @click.prevent="item.click(context)" v-html="item.label"></div>
    </template>
  </div>
</template>
<script>
  import ClickOutside from './ClickOutSide.js'

  export default {
    name: "LjsContextMenu",
    props: {}, directives: {
      ClickOutside
    },
    methods: {
      onBlur() {
      },
      open(event, items, context) {
        this.items = items
        this.context = context
        this.show = true
        this.x = event.x
        this.y = event.y
      },
      close() {
        this.show = false
      }
    },
    data() {
      return {show: false, x: 0, y: 0, context: undefined}
    },
    created() {
      document.body.oncontextmenu = function () {
        return false
      }
      document.click = this.close
    },
    destroyed() {
      document.body.oncontextmenu = undefined
      document.click = undefined
    }
  }
</script>
<style scoped>
  .menu {
    border-radius: 4pt;
    outline: 0;
    color: #333333;
    font-size: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    background-color: #ebebeb;
    white-space: nowrap;
    min-width: 100px;
  }

  .item {
    font-family: sans-serif;
    padding: 5px 35px 5px 10px;
    cursor: pointer;
    display: block;
    user-select: none;
  }

  .item:hover {
    background-color: #b4b4b4;
    color: white;
  }
</style>
