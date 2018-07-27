export default {
  name: 'm-render',
  props: {
    data: {
      type: Object,
      default: undefined
    },
    column: {
      type: Object,
      default: undefined
    },
    draw: {
      type: Function,
      default: undefined
    },
    driver: {
      type: Object,
      default: undefined
    }
  },
  render (h) {
    return this.draw(h, this)
  }
}
