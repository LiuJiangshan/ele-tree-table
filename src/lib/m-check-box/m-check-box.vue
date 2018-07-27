<template>
  <div class="m-check-box">
    <font-awesome-icon :icon="value?['check-square']:['square']" size="lg" @click.stop="handClick"/>
  </div>
</template>

<script>
import checkedIcon from '../image/checked.png'
import noCheckedIcon from '../image/no_checked.png'

export default {
  name: 'm-check-box',
  props: {
    data: {type: Object},
    table: {type: Object},
    value: {type: Boolean},
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
      this.value = !this.value
      this.$emit('input', this.value)
      this.$emit('check-changed', this.value)
    }
  },
  data () {
    return {checkedIcon, noCheckedIcon}
  }
}
</script>
