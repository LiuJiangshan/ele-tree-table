export default {
  name: 'RenderDiv',
  functional: true,
  props: {
    data: {
      type: Object,
      default: undefined
    },
    column: {
      type: Object,
      default: undefined
    },
    render: {
      type: Function,
      default: undefined
    },
    driver: {
      type: Object,
      default: undefined
    }
  },
  render: function (h, ctx) {
    return ctx.props.render(h, ctx)
  }
};
