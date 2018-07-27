<template>
  <div v-click-outside="close" v-if="show" class="m-context-menu" ref="menu" @click.prevent.stop="close"
       :style="{top:y+'px',left:x+'px'}"
       @blur.prevent="onBlur">
    <div v-for="(item,itemIndex) in items" :key="itemIndex" class="item" @click.prevent="item.click(context)"
         v-html="item.label"></div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'm-context-menu',
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
