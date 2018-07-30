<template>
  <div class="m-check-box">
    <font-awesome-icon class="icon" :icon="icon" @click.stop="handClick"/>
    <div class="label">
      <slot/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'm-check-box',
  props: {
    data: {type: Object},
    table: {type: Object},
    value: {type: Boolean}
  },
  data () {
    return {check: this.value}
  },
  computed: {
    icon () {
      if (this.check) return ['fas', 'check-square']
      else return ['far', 'square']
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
