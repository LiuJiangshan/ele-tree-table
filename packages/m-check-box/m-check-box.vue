<template>
  <div class="m-check-box">
    <font-awesome-icon class="icon" :icon="icon" @click.stop="handClick"/>
  </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckSquare, faSquare, faMinusSquare)
export default {
  name: 'm-check-box',
  components: {FontAwesomeIcon},
  props: {
    value: {type: Boolean}
  },
  data () {
    return {check: this.value}
  },
  watch: {
    value (newVal) {
      if (newVal !== this.check) this.check = newVal
    }
  },
  computed: {
    icon () {
      if (this.check === true) return ['fas', 'check-square']
      else if (this.check === false) return ['far', 'square']
      else return ['fas', 'minus-square']
    },
    imageStyle: {get () { return {visibility: (this.show ? 'visible' : 'hidden')} }}
  },
  methods: {
    handClick () {
      this.check = !this.check
      this.$emit('input', this.check)
      this.$emit('check-changed', this.check)
    }
  }
}
</script>
