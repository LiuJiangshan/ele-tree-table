<template>
    <input class="ljs_input" ref="input" v-model="value"/>
</template>

<script>
  export default {
    name: 'LjsInput',
    props: {
      value: {}
    },
    methods: {}
  }
</script>

<style scoped>
    .ljs_input {
        outline: none;
        border: none;
    }
</style>