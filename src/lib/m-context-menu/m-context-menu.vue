<template>
  <div v-click-outside="close" v-if="show" class="m-context-menu" ref="menu" @click.prevent.stop="close"
       :style="{top:y+'px',left:x+'px'}"
       @blur.prevent="onBlur">
    <div v-for="(item,itemIndex) in items" :key="itemIndex" class="item" @click.prevent="item.click()"
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
    open (items, $event) {
      let target = $event.target
      console.log(target)
      let x = $event.x
      let y = $event.y
      x += target.offsetLeft
      y -= target.offsetTop
      target = target.offsetParent
      while (target) {
        x -= target.offsetLeft
        y -= target.offsetTop
        console.log(x, y)
        target = target.offsetParent
      }
      console.log(x, y)
      if (items && items.length > 0) {
        this.items = items
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
    return {items: [], show: false, x: 0, y: 0}
  }
}
</script>
