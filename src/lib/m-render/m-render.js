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
    return this.render(h, this.ctx)
  }
}
