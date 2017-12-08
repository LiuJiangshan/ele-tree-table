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
    }
  },
  render: function (h, ctx) {
    if (ctx.props.render)
      return ctx.props.render(h, ctx)
    else
      return h('div', ctx.props.data[ctx.props.column.key])
  }
};
