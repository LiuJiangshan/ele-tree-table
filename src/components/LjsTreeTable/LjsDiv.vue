<template>
    <div class="ljs_div" v-html="body"></div>
</template>

<script>
  export default {
    name: 'LjsDiv',
    props: {
      body: {
        default: ''
      }
    }
  }
</script>

<style scoped>
    .ljs_div {
        width: 100%;
        height: 100%;
        overflow: hidden;
        word-break: keep-all;
    }
</style>