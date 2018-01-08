<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      var obj = {}
      obj['nodes'] = false
      console.log(typeof obj.nodes)
      obj['nodes'] = []
      console.log(typeof obj.nodes)
    }
  }
</script>

<style>
  #app {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
</style>
