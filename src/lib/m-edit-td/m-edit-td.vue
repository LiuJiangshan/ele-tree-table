<!--可编辑组件-->
<template>
  <td :class="tdClass" :width="column.width" :height="trHeight"
      @contextmenu.prevent.stop="onRightMenuClick($event)"
      @keyup.enter="handleEnter"
      @click="handleClick" @dblclick="handleDbClick">
    <div class="td-warp" tabindex="0" @focus="handleFocus"
         ref="tdWarp" @blur="handleBlur">
      <m-td-head class="td-head-style" :column="column" ref="tdHead" :node="node" :td="getThis()"/>
      <template v-if="match&&column.allowEdit">
        <div v-if="debug" v-html="getState()+value"
             style="color: red;font-size: xx-small;"></div>
        <m-render v-if="column.render" class="custom-render-style"
                  ref="input" :driver="driver" :render="column.render" :data="data" :column="column"/>
        <m-text-area v-else :auto-size="this.column.autoLine"
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

let States = {normal: 0, select: 1, lock: 2}
export default {
  name: 'm-edit-td',
  components: {MTextArea, MRender, MTdHead},
  props: {
    trHeight: {type: Number},
    index: {type: Number},
    tr: {type: Object},
    table: {type: Object},
    node: {type: TreeNode},
    column: {type: Column}
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
    inputStyle () {
      let re = {}
      re.width = this.bodyWidth + 'px'
      if (!this.column.autoLine) {
        re.height = this.table.lineHeight + 'px'
        re.overflow = 'hidden'
      }
      return re
    },
    debug: {get () { return this.table.debug }},
    driver: {get () { return this.table.driver }},
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
        let tdClass = {'select': false, 'lock': false}
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
        return tdClass
      }
    },
    // 当前焦点单元格
    focusTd: {get () { return this.table.focusTd }},
    // 当前单元格所在列是否与该行数据类型匹配
    match () {
      return this.table.matchType(this.column, this.data)
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
    onRightMenuClick ($event) {
      const menuItems = this.table.menuGetter(this.column, this.node)
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
      } else if (!this.driver || !this.driver.updater || !this.driver.updater.hasOwnProperty(this.data.pojo)) {
        // console.log('未提供更新方法')
      } else {
        let update = this.driver.updater[this.data.pojo]
        update(this.data, this.column)
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
      if (this.focusTd) this.focusTd.state = States.normal
      this.table.focusTd = this
      this.input = false
      this.state = States.select
      if (this.match && this.column.edit !== false) this.$refs.input.$el.focus()
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
      let tdWarp = this.$refs.tdWarp
      if (!this.match) {
        tdWarp.focus()
        // console.log('空白获取到焦点:', this.column.label)
      } else if (this.column.edit === false) {
        tdWarp.focus()
        // console.log('不能编辑获取到焦点:', this.column.label)
      } else if (this.column.render) {
        if (window.$) {
          let focusable = window.$(tdWarp).find(':focusable')
          if (focusable) {
            tdWarp.focus()
            focusable.focus()
          }
        } else console.error('请添加jQuery、jQuery-Ui,否则不能对自定义组件设置焦点')
        // let focusAbleNode = this.getFocusNode(tdWarp)
        // tdWarp.click()
        // if (focusAbleNode) {
        //   focusAbleNode.focus()
        //   this.state = States.select
        //   // console.log('可焦点元素:', focusAbleNode)
        // }
        // console.log('自定义组件获取到焦点:', this.column.label)
      } else {
        this.$refs.input.$el.focus()
        // console.log('文本框获取到焦点:', this.column.label)
      }
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
  @import "../../style/vars.scss";

  td {
    box-sizing: border-box;
    font-family: Arial, 微软雅黑, serif;
    font-size: 11px;
    &.select {
      border: 1px $theme-color-5 solid;
      box-shadow: 0 1px 6px 0 $theme-color-5;
    }

    &.lock {
      border: 1px $theme-color solid;
      box-shadow: 0 1px 6px 0 $theme-color;
    }

    &.border {
      border-color: $border-color;
    }
  }

  .text-area-style {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
  }

  .custom-render-style {
    flex-grow: 1;
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
    align-items: flex-start;
    align-content: flex-start;
  }
</style>
