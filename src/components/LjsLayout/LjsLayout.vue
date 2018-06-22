<template>
    <div class="ljs_layout_body" ref="ljs_layout_body">
        <transition>
            <div v-show="topShow" class="top_warp" :style="topStyle">
                <slot name="top"/>
            </div>
        </transition>
        <transition>
            <div v-show="bottomShow" class="bottom_warp" :style="bottomStyle">
                <slot name="bottom"/>
            </div>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'LjsLayout',
    props: {
      topWeight: {
        type: Number,
        default: 1
      },
      bottomWeight: {
        type: Number,
        default: 1
      },
      topShow: {
        type: Boolean,
        default: true
      },
      bottomShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        height: 0
      }
    },
    computed: {
      topStyle () {
        let style = {}
        if (this.bottomShow)
          style.height = this.height * this.topWeight / (this.topWeight + this.bottomWeight) + 'px'
        return style
      },
      bottomStyle () {
        let style = {}
        if (this.topShow)
          style.height = this.height * this.bottomWeight / (this.topWeight + this.bottomWeight) + 'px'
        return style
      }
    },
    methods: {
      refreshHeight () {
        this.height = this.$refs.ljs_layout_body.clientHeight
      }
    },
    mounted () {
      this.refreshHeight()
      window.onresize = this.refreshHeight
    }
  }
</script>
<style lang="scss" scoped>
    .ljs_layout_body {
        width: 100%;
        height: 100%;
        > * {
            overflow: auto;
        }
        > .top_warp {
            height: 100%;
        }
        > .bottom_warp {
            height: 100%;
        }
    }
</style>