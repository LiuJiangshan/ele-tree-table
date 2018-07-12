<template>
    <div v-click-outside="close" v-if="show" class="menu" ref="menu" @click.prevent.stop="close"
         :style="{top:y+'px',left:x+'px'}"
         @blur.prevent="onBlur">
        <div v-for="(item,itemIndex) in items" :key="itemIndex" class="item" @click.prevent="item.click(context)"
             v-html="item.label"></div>
    </div>
</template>
<script>
import ClickOutside from './ClickOutSide.js'

export default {
  name: 'ljs-context-menu',
  props: {},
  directives: {
    ClickOutside
  },
  methods: {
    onBlur () {
    },
    open (x, y, items, context) {
      if (items && items.length > 0) {
        this.items = items
        this.context = context
        this.show = true
        this.x = x
        this.y = y
      }
    },
    close () {
      this.show = false
    }
  },
  data () {
    return {items: [], show: false, x: 0, y: 0, context: undefined}
  }
}
</script>
<style lang="scss" scoped>
    .menu {
        outline: 0;
        font-size: 12px;
        position: absolute;
        z-index: 1;
        border: 1px #E4E4E4 solid;
        background-color: #ebebeb;
        white-space: nowrap;
        min-width: 100px;
    }

    .item {
        cursor: pointer;
        display: block;
        color: #444;
        padding: 5px 7px;
        font-family: "Segoe UI", Calibri, Thonburi, Arial, Verdana, sans-serif, "Mongolian Baiti", "Microsoft Yi Baiti", "Javanese Text";
        font-size: 9pt;
        user-select: none;
    }

    .item:hover {
        background-color: #d3f0e0;
    }
</style>
