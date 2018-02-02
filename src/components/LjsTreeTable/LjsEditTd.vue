<!--可编辑组件-->
<template>
    <td :class="tdClass" :width="column.width"
        @keyup.enter="onEnter"
        @click.stop="onClick" @dblclick.stop="onDbClick">
        <div class="td_warp" tabindex="0" @focus="onTdFocus" ref="tdWarp" @blut="onBlur">
            <div v-if="debug" v-html="getState()"
                 style="position: absolute;color: red;font-size: xx-small;right: 0;"></div>
            <div v-if="false" v-html="'h_w:'+headWidth+',b_w:'+bodyWidth"
                 style="position: absolute;color: red;font-size: xx-small;right: 0;"></div>
            <LjsTdHead ref="tdHead" :td="getThis()"></LjsTdHead>
            <!--自定义组件渲染-->
            <Render :style="{width:bodyWidth+'px'}" v-if="this.column.render&&match" ref="input" :driver="driver"
                    :draw="column.render" :data="data"
                    :column="column">
            </Render>
            <input v-else type="text" :style="{width:bodyWidth+'px'}" ref="input" @blur="onBlur"
                   @focus="onFocus" v-model="value"
                   @input="input=true"
                   class="ljs_edit_td_input"/>
        </div>
    </td>
</template>
<script>
  import Render from './Render.js'
  import LjsTdHead from './LjsTdHead.vue'

  // 单元格状态
  var States = {normal: 0, select: 1, lock: 2}
  export default {
    name: 'LjsEditTd',
    components: {
      Render, LjsTdHead
    },
    props: {
      index: {
        type: Number
      },
      tr: {
        type: Object
      },
      height: {
        type: Number
      },
      data: {
        type: Object,
        default () {
          return {}
        }
      },
      column: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    watch: {
      state () {
        switch (this.state) {
          case States.normal:
            break
          case States.select:
            this.tr.table.onTdFocus(this, States)
            break
          case States.lock:
            this.tr.table.canMove = false
            break
        }
      }
    },
    computed: {
      debug: {get () { return this.table.debug }},
      driver: {get () { return this.table.driver }},
      table: {get () { return this.tr.table }},
      // 单元格x坐标
      x: {get () { return this.index }},
      // 单元格y坐标
      y: {get () { return this.tr.index }},
      // 内容宽度
      bodyWidth: {
        get () {
          let bodyWidth = this.column.width - this.headWidth
          return bodyWidth
        }
      },
      headWidth: {
        get () {
          let headWidth = 0
          let tdHead = this.$refs.tdHead
          if (this.isMounted && tdHead) headWidth = tdHead.width
          else headWidth = 0
          return headWidth
        }
      },
      // 单元格边框样式
      tdClass: {
        get () {
          let tdClass = {}
          switch (this.state) {
            case States.normal:
              tdClass.td_mormal = true
              break
            case States.select:
              tdClass.td_select = true
              break
            case States.lock:
              tdClass.td_lock = true
              break
          }
          return tdClass
        }
      },
      // 当前焦点单元格
      focusTd: {get () { return this.table.focusTd }},
      // 当前单元格所在列是否与该行数据类型匹配
      match: {get () { return this.table.matchType(this.column, this.data) }},
      // 当前单元格显示内容
      value: {
        get () {
          let value = ''
          if (this.match) {
            switch (this.state) {
              // 单元格未选中
              case States.normal: {
                let text = this.column.text
                // 通过列定义的显示格式显示文本
                if (text instanceof Function) value = text(this.data, this.column)
                else {
                  if (this.data[this.column.key] !== undefined) value = this.data[this.column.key]
                  else value = this.table.nullString
                }
                break
              }
              case States.select: {
                if (this.data[this.column.key] !== undefined) value = this.data[this.column.key]
                break
              }
              case States.lock:
                if (this.data[this.column.key] !== undefined) value = this.data[this.column.key]
                break
            }
          }
          return value
        },
        set (value) { if (this.column.edit !== false && this.match) this.data[this.column.key] = value }
      }
    },
    methods: {
      getState () {
        switch (this.state) {
          case States.normal:
            return 'normal'
          case States.lock:
            return 'lock'
          case States.select:
            return 'select'
        }
      },
      selectAll () { if (!this.column.render) this.$refs.input.select() },
      getThis () { return this },
      onCheck () {
        this.data.check = true
        this.table.onCheck()
      },
      onTdFocus () {
        this.table.onTdFocus(this, States)
        this.state = States.select
      },
      onFocus () {
        this.table.onTdFocus(this, States)
        this.input = false
        this.state = States.select
        if (this.column.edit && !this.column.render) setTimeout(this.selectAll, 100)
      },
      onEnter () {
        this.table.canMove = true
        this.table.down()
      },
      onDbClick () { this.state = States.lock },
      onClick () {
        this.state = States.select
        // 手动触发事件回调
        if (this.column.render) this.onFocus()
      },
      blur () {
        this.state = States.normal
        if (!this.column.render) this.$refs.input.blur()
        // 手动触发事件回调
        else this.onBlur()
      },
      focus () {
        this.state = States.select
        if (this.column.render) this.$refs.tdWarp.focus()
        else this.$refs.input.focus()
      },
      onBlur () {
        this.table.onTdBlur(this, States)
        if (!this.input) {
          if (this.debug) console.log('未输入,不需要更新')
        } else if (this.column.render) {
          if (this.debug) console.log('自定义组件,更新操作需自定义')
        } else if (this.column.edit === false) {
          if (this.debug) console.log(this.column.label + '不允许编辑,未更新')
        } else if (!this.match) {
          if (this.debug) console.log(this.data.pojo + '没有' + this.column.key + '(' + this.column.label + ')字段,未更新')
        } else if (!this.driver || !this.driver.updater || !this.driver.updater.hasOwnProperty(this.data.pojo)) {
          if (this.debug) console.log('未提供更新方法')
        } else {
          let update = this.driver.updater[this.data.pojo]
          update(this.data, this.column)
        }
        this.inputChange = false
      }
    },
    data () {
      return {
        isMounted: false,
        state: States.normal,
        // 是否输入了内容
        input: false
      }
    },
    mounted () {
      this.isMounted = true
      this.table.bindTd(this)
    },
    updated () { this.table.bindTd(this) }
  }
</script>
<style lang="scss" scoped>
    .td_normal {
        box-sizing: border-box;
        font-family: Arial, 微软雅黑, serif;
        font-size: 11px;
    }

    .td_select {
        @extend .td_normal;
        border: 1px #66CC66 solid;
    }

    .td_lock {
        @extend .td_normal;
        border: 1px #3fcc2c solid;
    }

    .td_warp {
        outline: none;
        border: none;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: left;
        align-content: left;
        overflow: hidden;
        width: 100%;
        height: 28px;
        line-height: 28px;
    }

    .ljs_edit_td_input {
        font-family: Arial, 微软雅黑, serif;
        font-size: 11px;
        line-height: 28px;
        height: 28px;
        vertical-align: middle;
        display: inline-block;
        border: none;
        background: none;
        color: #333333;
        outline: none;
    }
</style>
