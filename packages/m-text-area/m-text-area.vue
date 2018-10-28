<!--自动换行的textarea-->
<template>
    <textarea v-if="autoSize" class="ljs_text_area" rows="1"
              @input="handleInput"
              @focus="handleFocus"
              :style="inputStyle"
              @click="handleClick"
              @blur="handleBlur"
              :value="currentValue"></textarea>
  <input v-else class="ljs_input"
         @input="handleInput"
         @focus="handleFocus"
         :style="inputStyle"
         @blur="handleBlur"
         @click="handleClick"
         :value="currentValue"/>
</template>
<script>
export default {
  name: 'm-text-area',
  props: {
    // 单行模式行高
    oneLineHeight: {
      type: Number,
      default: 28
    },
    // 多行模式行高
    manyLineHeight: {
      typr: Number,
      default: 15
    },
    // 是否根据内容自适应宽高
    autoSize: {
      type: Boolean,
      default: false
    },
    // 编辑时自动选中文本内容
    autoSelect: {
      type: Boolean,
      default: false
    },
    // 文本框内容
    value: {
      default: ''
    }
  },
  computed: {
    column () { return this.$parent.column },
    inputStyle: {
      get () {
        let inputStyle = {}
        if (this.lineHeight) inputStyle.lineHeight = this.lineHeight + 'px'
        return inputStyle
      }
    },
    trHeight () {
      return this.$parent.tr.height
    },
    trHeights () {
      return this.$parent.tr.heights
    }
  },
  watch: {
    trHeights (oldVal, newVal) {
      console.log('检查到tr变化')
      this.resize()
    },
    value (newValue, oldValue) {
      if (!this.focused) this.currentValue = newValue
    }
  },
  methods: {
    select () {
      this.$el.select()
    },
    handleClick () {
    },
    handleInput (event) {
      this.resize()
      this.$emit('input', event.target.value)
    },
    handleFocus () {
      this.focus = true
      if (this.autoSelect) setTimeout(this.select, 1)
      this.$emit('focus')
    },
    handleBlur () {
      this.focus = false
      this.$emit('blur')
    },
    resize () {
      if (this.autoSize) {
        let textarea = this.$el
        textarea.style.height = 'auto'
        let scrollHeight = textarea.scrollHeight
        let height
        if (this.trHeight > scrollHeight) {
          height = this.trHeight
          this.lineHeight = this.oneLineHeight
          console.log('填满父容器完成:', height, ',lineHeight:', this.lineHeight)
        } else {
          this.$parent.tr.heights[this.column.index] = scrollHeight
          height = scrollHeight
          // 防止布局抖动
          if (scrollHeight * 2 / 3 > this.trHeight) {
            this.lineHeight = this.manyLineHeight
            console.log('scrollHeight:', scrollHeight, ',trHeight:', this.trHeight)
          }
          console.log('撑大父容器完成:', height, ',lineHeight:', this.lineHeight)
        }
        textarea.style.height = height + 'px'
      } else this.lineHeight = this.oneLineHeight
    }
  },
  data () {
    return {
      focused: false,
      currentValue: this.value,
      lineHeight: this.manyLineHeight
    }
  },
  mounted () {
    this.resize()
  },
  updated () {
    this.resize()
  }
}
</script>

<style lang="scss" scoped>
  .ljs_text {
    width: 100%;
    border: none;
    outline: none;
    background: none;
    overflow: hidden;
    font-family: Arial, 微软雅黑, serif;
    font-size: 11px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #333333;
    padding: 0;
    margin: 0;
  }

  .ljs_input {
    @extend .ljs_text;
  }

  .ljs_text_area {
    line-height: 1;
    @extend .ljs_text;
    resize: none;
  }
</style>
