<template>
    <div class="ljs_layout_body">
        <transition>
            <div v-if="topShow" class="ljs_layout_top" :style="{flexGrow:topWeight}">
                <slot name="top"/>
            </div>
        </transition>
        <transition>
            <div v-if="bottomShow" class="ljs_layout_bottom" :style="{flexGrow:bottomWeight}">
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
  }
</script>
<style>
    .v-leave {
        /* 定义 出场动画的 起始状态 */
        /* 只停留一帧 */
        transform: translateY(500px);
    }

    .v-leave-active {
        /* 定义 出场动画 过程 */
        transition: all 0.1s ease;
    }

    .v-leave-to {
        /* 定义 出场动画 结束状态（即：该动画要达到的目标状态） */
        transform: translateY(500px);
        opacity: 0;
    }

    /* 定义  入场动画 */

    .v-enter {
        /* 定义 入场动画 的起始状态 */
        transform: translateY(500px);
        opacity: 0;
    }

    .v-enter-active {
        /* 定义 入场动画 过程 */
        transition: all 0.1s ease;
    }

    .v-enter-to {
        /* 定义 入场动画 过程 */
        /* 只停留一帧 */
        transform: translateY(0px);
    }
</style>
<style lang="scss" scoped>
    .ljs_layout_body {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .ljs_layout_top {
        overflow: hidden;
        height: 0;
    }

    .ljs_layout_bottom {
        overflow: hidden;
        height: 0;
    }
</style>