<template>
    <div class="body_div">
        <div class="resize_div" @mousedown.stop="down" @mouseup.stop="up"></div>
    </div>
</template>
<script>
  export default {
    name: 'ResizeTest',
    methods: {
      down () {
        console.log('down')
      },
      up () {
        console.log('up')
      }
    }
  }
</script>

<style scoped>
    .body_div {
        width: 1000px;
        height: 600px;
        background-color: gray;
    }

    .resize_div {
        cursor: col-resize;
        width: 100px;
        height: 100px;
        background-color: #d3f0e0;
    }
</style>