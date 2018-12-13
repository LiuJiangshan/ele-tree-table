<template>
  <div class="m-expand">
    <font-awesome-icon :icon="icon" @click.stop="handClick" style="margin-right: 5px;"/>
    <font-awesome-icon v-if="loading" style="margin-right: 5px;"
                       class="rotate-animation" :icon="['fas', 'spinner']"/>
  </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faCaretRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCaretDown, faCaretRight, faSpinner)
export default {
  name: 'm-check-expand',
  components: { FontAwesomeIcon },
  props: {
    loading: { type: Boolean, default: false },
    value: { type: Boolean }
  },
  data () {
    return { check: this.value }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.check) this.check = newVal
    }
  },
  computed: {
    icon () {
      if (this.check) return ['fas', 'caret-down']
      else return ['fas', 'caret-right']
    },
    imageStyle: { get () { return { visibility: (this.show ? 'visible' : 'hidden') } } }
  },
  methods: {
    handClick () {
      this.check = !this.check
      this.$emit('input', this.check)
    }
  }
}
</script>
