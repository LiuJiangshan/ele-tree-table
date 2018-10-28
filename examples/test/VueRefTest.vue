<template>
  <div ref="root">
    <Render @click="renderClick" :draw="draw" ref="render"/>
    <input type="button" @click="print"/>
  </div>
</template>
<script>
import Render from '../../packages/m-render/m-render.js'

export default {
  name: 'VueRefTest',
  components: {Render},
  methods: {
    renderClick () {
      console.log('renderClick')
    },
    draw (h, ctx) {
      return h('div', 'hi')
    },
    print () {
      console.log('input:', this.$refs.input)
      console.log('render:', this.$refs.render)
      console.log('root:', this.$refs.root)
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
