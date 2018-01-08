<template>
  <div style="display: flex;flex-direction: row;align-items: center;cursor: pointer;">
    <img
      :style="{visibility:(visibility?'visible':'hidden'),width:'23px',height:'23px'}"
      v-on:click="onClick"
      v-on:dblclick.stop.prevent="function() {}"
      :src="expand?openIcon:closeIcon"/>
  </div>
</template>

<script>
  import openIcon from './image/expand_open.gif'
  import closeIcon from './image/expand_close.gif'

  export default {
    name: "LjsExpand",
    props: {
      visibility: {
        type: Boolean,
        default: true
      },
      expand: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {openIcon: openIcon, closeIcon: closeIcon}
    },
    methods: {
      onClick() {
        this.$emit('expandChange', !this.expand)
      }
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
