<template>
  <div class="m-expand">
    <font-awesome-icon :icon="icon" @click.stop="handClick"/>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinusSquare, faPlusSquare)
export default {
  name: 'm-check-expand',
  components: {FontAwesomeIcon},
  props: {
    value: {type: Boolean}
  },
  data () {
    return {check: this.value}
  },
  computed: {
    icon () {
      if (this.check) return ['fas', 'minus-square']
      else return ['fas', 'plus-square']
    },
    imageStyle: {get () { return {visibility: (this.show ? 'visible' : 'hidden')} }}
  },
  methods: {
    handClick () {
      this.check = !this.check
      this.$emit('input', this.check)
      this.$emit('expand-changed', this.check)
    }
  }
}
</script>
