<template>
  <div v-click-outside="close" class="m-context-menu" @click.prevent.stop="close" :style="menuStyle">
    <div v-for="(item,index) in items" :key="index" class="item" @click.prevent="item.click?item.click():()=>{}"
         v-html="item.label"></div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { removeMenu } from './menu.js'

const defaultItems = [{label: '选项为空', click: () => {}}]
export default {
  name: 'm-context-menu',
  props: {
    x: {type: Number, default: 0},
    y: {type: Number, default: 0},
    items: {type: Array, default: defaultItems}
  },
  directives: {
    ClickOutside
  },
  computed: {
    menuStyle () {
      return {
        top: this.y + 'px',
        left: this.x + 'px'
      }
    }
  },
  methods: {
    close () {
      removeMenu()
    }
  }
}
</script>
