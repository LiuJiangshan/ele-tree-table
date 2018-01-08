<template>
  <LjsExpand :expand="expand" v-on:expandChange="onExpandChange"></LjsExpand>
</template>

<script>
  import LjsExpand from '../components/LjsTreeTable/LjsExpand.vue'

  export default {
    name: "LjsExpandTest",
    components: {LjsExpand},
    methods: {
      onExpandChange(newStatus) {
        this.expand = newStatus
        console.log(newStatus)
      }
    },
    data() {
      return {expand: false}
    }
  }
</script>

<style scoped>

</style>
