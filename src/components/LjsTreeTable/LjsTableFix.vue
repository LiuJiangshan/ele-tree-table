<!--固定列组件-->
<template>
    <div :class="fixType+'Fix'">
        <slot/>
    </div>
</template>

<script>
  export default {
    name: 'LjsTableFix',
    props: {
      // 对齐方式分别为:left、right
      fixType: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
    .fix {
        overflow: hidden;
        position: absolute;
        top: 0;
    }

    .leftFix {
        @extend .fix;
        left: 0;
        right: auto;
    }

    .rightFix {
        @extend .fix;
        right: 0;
    }
</style>