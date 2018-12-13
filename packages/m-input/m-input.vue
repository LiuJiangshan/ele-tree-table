<!--自动换行文本框-->
<template>
  <div class="auto_line_edit"
       contenteditable="true"
       @focus="handleFocus"
       @input="handleInput"
       @blur="handleBlur"
       v-html="currentValue">
  </div>
</template>
<script>
export default {
  name: 'm-input',
  props: { value: { default: '' } },
  computed: {
    textareaStyle: {
      get () {
        let textareaStyle = {}
        if (typeof this.height === 'number') textareaStyle.height = this.height + 'px'
        return textareaStyle
      }
    }
  },
  data () {
    return {
      inputed: false,
      height: undefined,
      currentValue: '',
      // 在自身输入时不响应value更新
      focused: false
    }
  },
  methods: {
    // 去掉焦点
    blur () { this.$el.blur() },
    // 获取焦点
    focus () { this.$el.focus() },
    // 选中内容
    select () {
      let range, selection
      selection = window.getSelection()
      range = document.createRange()
      range.selectNodeContents(this.$el)
      selection.removeAllRanges()
      selection.addRange(range)
    },
    handleInput () {
      this.inputed = true
      let value = this.$el.innerHTML
      this.height = this.$el.scrollHeight
      this.$emit('input', value)
    },
    handleBlur () {
      this.inputed = false
      this.focused = false
      this.$emit('blur')
    },
    handleFocus () {
      this.focused = true
      this.$emit('focus')
    },
    setValue (currentValue) {
      if (!this.focused) {
        this.currentValue = currentValue
      } else if (!this.inputed) {
        this.currentValue = currentValue
        setTimeout(this.select, 10)
      }
    }
  },
  watch: {
    value (newValue) {
      this.setValue(newValue)
    }
  },
  mounted () {
    this.height = this.$el.clientHeight
    this.setValue(this.value)
  }
}
</script>

<style lang="scss" scoped>
  .auto_line_edit {
    width: auto;
    text-align: start;
    line-height: 28px;
    vertical-align: middle;
    resize: none;
    -webkit-user-modify: read-write-plaintext-only;
    max-width: 100%;
    border: none;
    outline: none;
  }
</style>
