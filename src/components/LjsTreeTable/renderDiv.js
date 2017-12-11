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
    var column = ctx.props.column
    var data = ctx.props.data
    var value = data[column.key]
    if (column.type === undefined || data.pojo === column.type) {
      if (ctx.props.render)
        return ctx.props.render(h, ctx)
      else
        return h('div', value)
    }
  }
};
