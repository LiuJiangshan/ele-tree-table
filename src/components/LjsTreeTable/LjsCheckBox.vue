<template>
    <div class="check_warp">
        <img class="image" @click.stop="handClick" :style="imageStyle"
             :src="check?checkedIcon:noCheckedIcon"/>
    </div>
</template>

<script>
  import checkedIcon from './image/checked.png'
  import noCheckedIcon from './image/no_checked.png'

  export default {
    name: 'LjsCheckBox',
    props: {
      data: {type: Object},
      table: {type: Object},
      check: {type: Boolean},
      show: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      imageStyle: {get () { return {visibility: (this.show ? 'visible' : 'hidden')} }}
    },
    methods: {
      handClick () {
        this.$emit('change', this.checked)
      }
    },
    data () {
      return {checkedIcon, noCheckedIcon}
    }
  }
</script>

<style lang="scss" scoped>
    .check_warp {
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
