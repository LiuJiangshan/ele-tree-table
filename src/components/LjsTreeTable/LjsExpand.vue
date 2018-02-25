<template>
    <div class="expand_warp">
        <img class="image" @click.stop="table.onExpandIconClick(data)" :style="imageStyle"
             :src="expand?openIcon:closeIcon"/>
    </div>
</template>

<script>
  import closeIcon from './image/expand_close.png'
  import openIcon from './image/expand_open.png'

  export default {
    name: 'LjsExpand',
    props: {
      data: {type: Object},
      table: {type: Object}
    },
    computed: {
      expand: {
        get () { return this.data.expand === true }
      },
      imageStyle: {
        get () { return {visibility: (this.show ? 'visible' : 'hidden')} }
      },
      show: {
        get () { return (typeof this.data.kids) === 'number' && this.data.kids > 0 }
      }
    },
    data () {
      return {openIcon, closeIcon}
    }
  }
</script>

<style lang="scss" scoped>
    .expand_warp {
        width: 11px;
        height: 23px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 4px;
        justify-content: center;
        justify-items: center;
        align-content: center;
    }

    .image {
        width: 11px;
        height: 11px;
        cursor: pointer;
    }
</style>
