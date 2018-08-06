<template>
  <div class="m-expand">
    <font-awesome-icon v-if="showLoading" class="rotate-animation" :icon="['fas', 'spinner']"/>
    <font-awesome-icon v-else :icon="icon" @click.stop="handClick"/>
  </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusSquare, faPlusSquare, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinusSquare, faPlusSquare, faSpinner)
export default {
  name: 'm-check-expand',
  components: {FontAwesomeIcon},
  props: {
    loading: {type: Boolean, default: false},
    value: {type: Boolean}
  },
  data () {
    return {check: this.value, showLoading: this.loading}
  },
  watch: {
    value (newVal) {
      if (newVal !== this.check) this.check = newVal
    },
    loading (newVal) {
      if (newVal !== this.showLoading) this.showLoading = newVal
    }
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
    }
  }
}
</script>
