<template>
    <div class="deep"
         :style="deepStyle"></div>
</template>

<script>
export default {
  name: 'ljs-deep',
  props: {
    data: {
      type: Object
    },
    column: {
      type: Object
    },
    table: {
      type: Object
    }
  },
  computed: {
    deepWidth: {
      get () {
        return this.data.deep * this.table.deepWidth
      }
    },
    deepStyle: {
      get () {
        return {
          width: this.deepWidth + 'px',
          visibility: (this.data.deep > 0 ? 'visible' : 'hidden')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .deep {
        height: 20px;
        display: block;
    }
</style>
