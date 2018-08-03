export default {
  name: 'm-render',
  props: {
    ctx: {type: Object},
    render: {
      type: Function,
      default: undefined
    }
  },
  render (h) {
    return this.$props.render(h, this.ctx)
  }
}
