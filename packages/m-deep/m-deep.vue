<template>
  <div class="deep" :style="deepStyle">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'm-deep',
  props: {
    value: {type: Number}
  },
  computed: {
    deepWidth: {
      get () { return this.value * 15 }
    },
    deepStyle: {
      get () {
        return {width: this.deepWidth + 'px'}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .deep {
    min-height: 1px;
    display: block;
  }
</style>
