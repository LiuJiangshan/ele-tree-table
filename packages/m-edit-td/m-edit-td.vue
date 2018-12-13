<!--可编辑组件-->
<template>
  <td :class="tdClass" class="m-edit-td"
      @contextmenu.prevent.stop="onRightMenuClick($event)"
      @keyup.up="move(0,-1)" @keyup.down="move(0,1)" @keyup.left="move(-1,0)" @keyup.right="move(1,0)"
      @keyup.enter="handleEnter" @click="handleClick" @dblclick="handleDbClick">
    <div class="td-warp" tabindex="0" @focus="handleFocus"
         ref="tdWarp" @blur="handleBlur">
      <m-td-head class="td-head-style" :column="column" ref="tdHead"
                 :node="node" :tree-store="treeStore" :td="getThis()"/>
      <div v-if="debug" v-html="getState()+value"
           style="color: red;font-size: xx-small;"></div>
      <m-render v-if="column.render" class="custom-render-style"
                ref="input" :render="column.render" :ctx="{node:node,column:column}"/>
      <template v-else-if="column.haveContent">
        <m-text-area v-if="match" :auto-size="this.column.autoLine"
                     :auto-select="true"
                     :one-line-height="tr.table.lineHeight"
                     :disabled="!column.allowEdit"
                     class="text-area-style"
                     ref="input"
                     @blur="handleBlur"
                     @focus="handleFocus"
                     v-model="value"
                     @input="handleInput"/>
      </template>
    </div>
  </td>
</template>
<script>
// 单元格状态
import MTdHead from '../m-td-head/m-td-head'
import MRender from '../m-render/m-render'
import MTextArea from '../m-text-area/m-text-area'
import TreeNode from '../ljs-tree-table/TreeNode.js'
import Column from '../ljs-tree-table/Column'
import TreeStore from '../ljs-tree-table/TreeStore'

let States = { normal: 0, select: 1, lock: 2 }
export default {
  name: 'm-edit-td',
  components: { MTextArea, MRender, MTdHead },
  props: {
    index: { type: Number },
    tr: { type: Object },
    table: { type: Object },
    node: { type: TreeNode },
    column: { type: Column },
    treeStore: { type: TreeStore }
  },
  watch: {
    state () {
      switch (this.state) {
        case States.normal:
          break
        case States.select:
          break
        case States.lock:
          this.table.canMove = false
          break
      }
    }
  },
  computed: {
    treeUpdater () {
      return this.table.treeUpdater
    },
    data () { return this.node.data },
    canSelection () { return this.column.type && this.column.type.indexOf('selection') !== -1 },
    debug: { get () { return this.table.debug } },
    driver: { get () { return this.table.driver } },
    // 单元格x坐标
    x: { get () { return this.index } },
    // 单元格y坐标
    y: { get () { return this.tr.index } },
    // 单元格边框样式
    tdClass: {
      get () {
        let tdClass = { 'select': false, 'lock': false }
        switch (this.state) {
          case States.normal:
            break
          case States.select:
            tdClass['select'] = true
            break
          case States.lock:
            tdClass['lock'] = true
            break
        }
        if (this.table.noBorder) tdClass['no-border'] = true
        else tdClass['border'] = true
        return tdClass
      }
    },
    // 当前焦点单元格
    focusTd: { get () { return this.table.focusTd } },
    // 当前单元格所在列是否与该行数据类型匹配
    match () {
      return this.column.matchNode(this.node)
    },
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
    move (x, y) {
      if (this.state === States.lock) return
      const node = this.node.yNode(y)
      if (node) {
        const td = node.xTd(this.column.index + x)
        td && td.focus()
      }
    },
    onRightMenuClick ($event) {
      const menuItems = this.table.menuGetter({ node: this.node, column: this.column })
      if (menuItems) this.$menu.rightMenu(menuItems, $event)
    },
    handleInput () {
      if (!this.column.render) this.input = true
    },
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
    getThis () { return this },
    handleFocus () {
      // console.log(this.value, '获取到了焦点')
      if (this.focusTd) this.focusTd.state = States.normal
      this.table.focusTd = this
      this.input = false
      this.state = States.select
    },
    handleBlur () {
      this.state = States.normal
      if (this.data.submitType !== this.table.submitTypes.add) this.data.submitType = this.table.submitTypes.update
      if (!this.input) {
        // console.log('未输入,不需要更新')
      } else if (this.column.render) {
        // console.log('自定义组件,更新操作需自定义')
      } else if (this.column.edit === false) {
        // console.log(this.column.label + '不允许编辑,未更新')
      } else if (!this.match) {
        // console.log(this.data.pojo + '没有' + this.column.key + '(' + this.column.label + ')字段,未更新')
      } else if (this.treeUpdater) {
        this.treeUpdater.load({ onLoad (data) {}, onError (e) {}, onEnd () {} }, { node: this.node, column: this.column })
      }
      this.input = false
    },
    handleEnter ($event) {
      if ($event.ctrlKey) {
        this.table.canMove = true
        this.table.down()
      }
    },
    handleDbClick () { this.state = States.lock },
    handleClick () {
      if (this.column.allowExpand && this.node.childCount > 0) this.node.expand = !this.node.expand
      else this.focus()
    },
    blur () {
      this.state = States.normal
      if (this.column.render) this.state = States.normal
    },
    isFocusNode (node) {
      let re = false
      if (node) {
        let nodeName = node.nodeName
        re = nodeName === 'A' || (nodeName === 'INPUT' && node.attributes.getNamedItem('type') !== 'hidden')
      }
      return re
    },
    getFocusNode (node) {
      if (node && node.childElementCount > 0) {
        let childs = node.childNodes
        for (let child of childs) {
          if (this.isFocusNode(child)) return child
          else {
            let childFocus = this.getFocusNode(child)
            if (childFocus) return childFocus
          }
        }
      }
    },
    focus () {
      if (this.state === States.normal) window.$(this.$el).find(':focusable').focus()
    }
  },
  data () {
    return {
      state: States.normal,
      // 是否输入了内容
      input: false
    }
  },
  mounted () {
    this.node.bindTd(this)
  },
  updated () { this.node.bindTd(this) }
}
</script>
<style lang="scss">
  @import "../default-theme/vars";

  .m-edit-td {
    .ivu-date-picker {
      .ivu-date-picker-focused input {
        border: 1px $theme-color-5 solid;
        box-shadow: 0 1px 6px 0 $theme-color-5;
      }
      .ivu-input {
        border-radius: 0;
        height: auto;
        border: none;
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import "../default-theme/vars";

  td {
    @include w100;
    height: $tr-height;
    font-family: Arial, 微软雅黑, serif;
    font-size: 11px;
  }

  .border {
    box-sizing: border-box;
    border: 1px $border-color solid;
    &.select {
      border: 1px $theme-color-5 solid;
      box-shadow: 0 1px 6px 0 $theme-color-5;
    }

    &.lock {
      border: 1px $theme-color solid;
      box-shadow: 0 1px 6px 0 $theme-color;
    }

    :focus {
      border-color: $border-color;
    }
  }

  .no-border {
    box-shadow: none;
    border: none;
    &.select {
    }

    &.lock {
    }

    :focus {
    }
  }

  .text-area-style {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
  }

  .custom-render-style {
    flex-grow: 1;
    @include flex_h;
    justify-content: center;
    align-items: center;
  }

  .td-head-style {
    flex-grow: 0;
  }

  .td-warp {
    @include h100;
    outline: none;
    border: none;
    overflow: hidden;
    @include flex_h;
    align-items: center;
    align-content: center;
  }
</style>
